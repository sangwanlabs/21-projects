const rosterUrl = "https://jsonplaceholder.typicode.com/users?_limit=10";

const clockUrl = "https://worldtimeapi.org/api/timezone/Asia/Kolkata";

const providerSelect = document.getElementById("providerSelect");
const dateInput = document.getElementById("dateInput");
const loadSlotsBtn = document.getElementById("loadSlotsBtn");
const refreshBtn = document.getElementById("refreshBtn");
const slotsGrid = document.getElementById("slotsGrid");
const slotsHeadline = document.getElementById("slotsHeadline");
const slotMeta = document.getElementById("slotMeta");
const bookingsList = document.getElementById("bookingsList");
const clearBookingsBtn = document.getElementById("clearBookingsBtn");
const statProviders = document.getElementById("statProviders");
const statBookings = document.getElementById("statBookings");
const statClock = document.getElementById("statClock");
const lastSync = document.getElementById("lastSync");

const confirmModal = new bootstrap.Modal(
  document.getElementById("confirmModal"),
);
const confirmTitle = document.getElementById("confirmTitle");
const confirmMeta = document.getElementById("confirmMeta");
const confirmBtn = document.getElementById("confirmBtn");
const notesInput = document.getElementById("notesInput");

const state = {
  providers: [],
  nowUtc: null,
  target: null,
  bookings: [],
  pendingSlot: null,
};

function readBookings() {
  state.bookings = JSON.parse(
    localStorage.getItem("quickslot-bookings") || "[]",
  );
}

function saveBookings() {
  localStorage.setItem("quickslot-bookings", JSON.stringify(state.bookings));
  statBookings.textContent = state.bookings.length;
}

async function fetchProviders() {
  providerSelect.disabled = true;
  providerSelect.innerHTML = `<option>Loading roster…</option>`;

  try {
    const res = await fetch(rosterUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();

    state.providers = data.map((person) => ({
      id: person.id,
      name: person.name,
      specialty: person.company?.bs || "Generalist",
      city: person.address?.city || "Remote",
    }));

    statProviders.textContent = state.providers.length;
    renderProviderSelect();
  } catch (err) {
    console.error("Error fetching providers:", err);
    providerSelect.innerHTML = `<option>Error loading providers</option>`;
    providerSelect.disabled = true;
  }
}

function renderProviderSelect() {
  providerSelect.disabled = false;
  providerSelect.innerHTML = `<option value="">Select provider</option>`;

  state.providers.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${p.name} — ${p.specialty}`;
    providerSelect.appendChild(opt);
  });
}

async function syncClock() {
  try {
    const res = await fetch(clockUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();

    state.nowUtc = new Date(data.datetime);

    const formattedTime = state.nowUtc.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    statClock.textContent = formattedTime;
    lastSync.textContent = `Synced ${new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}`;
  } catch (err) {
    console.warn("Clock sync failed, falling back to client time:", err);

    state.nowUtc = new Date();
    
    const fallbackTime = state.nowUtc.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    statClock.textContent = fallbackTime;
    lastSync.textContent = `Offline (${fallbackTime})`;
  }
}

function setMinDate() {
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;
  dateInput.value = today;
}

function buildSlots(date) {
  const slots = [];

  for (let hour = 9; hour <= 17; hour++) {
    ["00", "30"].forEach((minute) => {
      const label = `${String(hour).padStart(2, "0")}:${minute}`;
      slots.push(label);
    });
  }

  return slots.map((label) => ({
    label,
    disabled: isSlotDisabled(date, label),
  }));
}

function isSlotDisabled(date, slotLabel) {
  if (!state.nowUtc || !date) return false;

  const targetDate = new Date(`${date}T${slotLabel}:00+05:30`);
  const now = state.nowUtc;

  if (targetDate <= now) return true;

  const alreadyBooked = state.bookings.some(
    (item) =>
      item.date === date &&
      item.slot === slotLabel &&
      item.providerId === state.target?.providerId,
  );

  return alreadyBooked;
}

function renderSlots(providerId, date) {
  const provider = state.providers.find((p) => p.id === Number(providerId));

  if (!provider || !date) {
    slotsGrid.innerHTML = `<div class="col-12 text-center text-secondary">Select a provider and date to view availability.</div>`;
    slotsHeadline.textContent = "Select provider + date";
    slotMeta.textContent = "";
    return;
  }

  state.target = { 
    providerId: provider.id, 
    providerName: provider.name, 
    date,
  };

  const dateObj = new Date(date + "T00:00:00");
  const formattedDate = dateObj.toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  slotsHeadline.textContent = `Availability • ${provider.name}`;
  slotMeta.textContent = `${formattedDate} at ${new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const slots = buildSlots(date);

  slotsGrid.innerHTML = "";

  slots.forEach((slot) => {
    const col = document.createElement("div");
    col.className = "col-6 col-xl-4";

    const card = document.createElement("div");
    card.className = `slot-card h-100 ${slot.disabled ? "disabled" : ""}`;
    card.innerHTML = `
      <div class="fw-semibold">${slot.label}</div>
      <div class="small text-secondary">${
        slot.disabled ? "Unavailable" : "Available"
      }</div>
    `;

    if (!slot.disabled) {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => 
        openModal(provider, date, slot.label)
      );
    }

    col.appendChild(card);
    slotsGrid.appendChild(col);
  });
}

function openModal(provider, date, slotLabel) {
  if (!provider || !date || !slotLabel) {
    console.warn("Invalid slot data for modal");
    return;
  }

  state.pendingSlot = { provider, date, slotLabel };

  confirmTitle.textContent = provider.name;
  confirmMeta.textContent = `${date} • ${slotLabel} IST`;
  notesInput.value = "";

  confirmModal.show();
}

confirmBtn.addEventListener("click", () => {
  if (!state.pendingSlot) {
    console.warn("No pending slot to confirm");
    return;
  }

  const { provider, date, slotLabel } = state.pendingSlot;

  const payload = {
    id: crypto.randomUUID(),
    providerId: provider.id,
    provider: provider.name,
    specialty: provider.specialty,
    city: provider.city,
    date,
    slot: slotLabel,
    notes: notesInput.value.trim(),
    bookedAt: new Date().toISOString(),
  };

  state.bookings.push(payload);
  saveBookings();
  
  renderSlots(provider.id, date);
  renderBookings();
  sendConfirmationEmail(payload);
  
  confirmModal.hide();
});

function renderBookings() {
  bookingsList.innerHTML = "";

  if (!state.bookings.length) {
    bookingsList.innerHTML = `<div class="text-secondary small">No bookings yet.</div>`;
    return;
  }

  const sortedBookings = state.bookings
    .slice()
    .sort((a, b) => {
      const aTime = `${a.date}T${a.slot}`;
      const bTime = `${b.date}T${b.slot}`;
      return aTime.localeCompare(bTime);
    });

  sortedBookings.forEach((booking) => {
    const card = document.createElement("div");
    card.className = "booking-card";

    const dateObj = new Date(booking.date + "T00:00:00");
    const formattedDate = dateObj.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });

    card.innerHTML = `
      <div class="d-flex justify-content-between align-items-start gap-3">
        <div class="flex-grow-1">
          <div class="fw-semibold">${booking.provider}</div>
          <div class="small text-secondary">${formattedDate} at ${booking.slot}</div>
          <div class="small text-muted">${
            booking.notes || "No notes added"
          }</div>
        </div>

        <button 
          class="btn btn-sm btn-outline-danger flex-shrink-0" 
          data-id="${booking.id}"
          title="Cancel booking"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    const deleteBtn = card.querySelector("button");
    deleteBtn.addEventListener("click", () => cancelBooking(booking.id));

    bookingsList.appendChild(card);
  });
}

function cancelBooking(id) {
  if (!confirm("Cancel this booking?")) return;

  state.bookings = state.bookings.filter((booking) => booking.id !== id);
  saveBookings();
  renderBookings();

  // Refresh slots if currently viewing them
  if (state.target) {
    renderSlots(state.target.providerId, state.target.date);
  }
}

clearBookingsBtn.addEventListener("click", () => {
  if (!state.bookings.length) {
    alert("No bookings to clear.");
    return;
  }

  if (confirm("Clear all bookings? This cannot be undone.")) {
    state.bookings = [];
    saveBookings();
    renderBookings();

    if (state.target) {
      renderSlots(state.target.providerId, state.target.date);
    }
  }
});

loadSlotsBtn.addEventListener("click", async () => {
  const providerId = providerSelect.value;
  const date = dateInput.value;

  if (!providerId || !date) {
    alert("Please select both a provider and date.");
    return;
  }

  loadSlotsBtn.disabled = true;
  loadSlotsBtn.innerHTML = `<i class="bi bi-hourglass-split"></i> Loading…`;

  try {
    await syncClock();
    renderSlots(providerId, date);
  } catch (err) {
    console.error("Error loading slots:", err);
    alert("Failed to load slots. Please try again.");
  } finally {
    loadSlotsBtn.disabled = false;
    loadSlotsBtn.innerHTML = `<i class="bi bi-search"></i> Fetch Slots`;
  }
});

refreshBtn.addEventListener("click", async () => {
  refreshBtn.disabled = true;
  refreshBtn.innerHTML = `<i class="bi bi-arrow-repeat"></i>`;

  try {
    await syncClock();
    if (state.target) {
      renderSlots(state.target.providerId, state.target.date);
    }
  } catch (err) {
    console.error("Error refreshing:", err);
  } finally {
    refreshBtn.disabled = false;
  }
});

async function sendConfirmationEmail(booking) {
  console.log("📧 Confirmation email would be sent:", booking);
}

async function init() {
  try {
    readBookings();
    statBookings.textContent = state.bookings.length;
    setMinDate();

    await Promise.all([fetchProviders(), syncClock()]);
    renderBookings();
  } catch (err) {
    console.error("Initialization error:", err);
    alert("Failed to initialize app. Please refresh the page.");
  }
}

document.addEventListener("DOMContentLoaded", init);
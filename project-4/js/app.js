function toggleModal(openBtnId, modalId, closeSelectors) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closes = document.querySelectorAll(closeSelectors);

    if (!modal || !openBtn) return;

    openBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });

    closes.forEach((btn) =>
        btn.addEventListener("click", () => {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }),
    );
}

// Apply Now button functionality
document.querySelectorAll(".applyBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = document.getElementById("applyModal");
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });
});

// Close Apply Modal
const applyModal = document.getElementById("applyModal");
document.getElementById("closeApply").addEventListener("click", () => {
    applyModal.classList.add("hidden");
    applyModal.classList.remove("flex");
});

document.getElementById("cancelApply").addEventListener("click", () => {
    applyModal.classList.add("hidden");
    applyModal.classList.remove("flex");
});

// Post Job Modal
toggleModal("openPostJob", "postJobModal", "#closePostJob, #cancelPostJob");

// Recruiter Login Modal
toggleModal(
    "loginRecruiterBtn",
    "recruiterModal",
    ".closeRecruiter, #loginRecruiterBtn",
);
toggleModal(
    "mLoginRecruiter",
    "recruiterModal",
    ".closeRecruiter, #mLoginRecruiter",
);

// Job Seeker Login Modal
toggleModal(
    "loginSeekerBtn",
    "seekerModal",
    ".closeSeeker, #loginSeekerBtn",
);
toggleModal("mLoginSeeker", "seekerModal", ".closeSeeker, #mLoginSeeker");

// Mobile Menu Toggle
const mobileBtn = document.getElementById("mobileBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
    const modals = [
        "applyModal",
        "postJobModal",
        "recruiterModal",
        "seekerModal",
    ];

    modals.forEach((modalId) => {
        const modal = document.getElementById(modalId);
        if (
            e.target === modal &&
            modal.classList.contains("flex")
        ) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }
    });
});
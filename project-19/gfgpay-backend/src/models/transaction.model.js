const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["ADD_MONEY", "TRANSFER_IN", "TRANSFER_OUT"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    balanceAfter: {
      type: Number,
      required: true,
      min: 0,
    },
    counterparty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Transaction", transactionSchema)


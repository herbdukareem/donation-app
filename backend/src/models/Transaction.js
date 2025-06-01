import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    email: { type: String, required: true },
    fullName: { type: String },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);

import express from "express";
import axios from "axios";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/verify/:reference", async (req, res) => {
  const { reference } = req.params;

  const endPoint = `https://api.paystack.co/transaction/verify/${reference}`;

  try {
    const response = await axios.get(endPoint, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const tx = response.data.data;

    const customFields = tx.metadata?.custom_fields || [];
    const fullNameField = customFields.find((field) => field.variable_name === "full_name");
    const fullName = fullNameField?.value || "";

    const transaction = new Transaction({
      reference: tx.reference,
      amount: tx.amount,
      status: tx.status,
      email: tx.customer.email,
      fullName: fullName.trim(),
      paidAt: tx.paid_at,
    });

    await transaction.save();

    res.status(200).json({
      message: "Transaction verified and saved.",
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment verification failed",
      error: error.response?.data || error.message,
    });
  }
});

router.get("/donations/paid", async (req, res) => {
  try {
    const paidTransactions = await Transaction.find({ status: "success" }).sort({ paidAt: -1 });
    res.status(200).json(paidTransactions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch paid transactions",
      error: error.message,
    });
  }
});

export default router;

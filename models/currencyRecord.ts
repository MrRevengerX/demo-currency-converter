import { CurrencyRecordType } from "@/types";
import { Schema, model, models } from "mongoose";

export const ALLOWED_CURRENCIES: Record<
  string,
  { currency: string; symbol: string }
> = {
  USA: { currency: "USD", symbol: "$" },
  "Sri Lanka": { currency: "LKR", symbol: "Rs." },
  Australia: { currency: "AUD", symbol: "A$" },
  India: { currency: "INR", symbol: "₹" },
};

const CurrencyRecordSchema = new Schema<CurrencyRecordType>(
  {
    fromCountry: {
      type: String,
      required: true,
      enum: Object.keys(ALLOWED_CURRENCIES),
    },
    toCountry: {
      type: String,
      required: true,
      enum: Object.keys(ALLOWED_CURRENCIES),
    },
    amount: { type: Number, required: true },
    convertedAmount: { type: Number, required: true },
    amountSymbol: {
      type: String,
      required: true,
    },
    convertedAmountSymbol: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CurrencyRecord =
  models.CurrencyTransfer ||
  model<CurrencyRecordType>("CurrencyTransfer", CurrencyRecordSchema);

export default CurrencyRecord;

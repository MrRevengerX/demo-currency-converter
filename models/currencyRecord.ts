import { ALLOWED_CURRENCIES } from "@/lib/data";
import { CurrencyRecordType } from "@/types";
import { Schema, model, models } from "mongoose";

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

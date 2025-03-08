import { Schema, Document, model, models } from "mongoose";

interface ICurrencyTransfer extends Document {
  fromCountry: string;
  toCountry: string;
  amount: number;
  convertedAmount: number;
}

const CurrencyRecordSchema = new Schema<ICurrencyTransfer>(
  {
    fromCountry: { type: String, required: true },
    toCountry: { type: String, required: true },
    amount: { type: Number, required: true },
    convertedAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default models.CurrencyRecordSchema ||
  model<ICurrencyTransfer>("CurrencyTransfer", CurrencyRecordSchema);

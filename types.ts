export type CurrencyRecordType = {
  _id: string;
  fromCountry: string;
  toCountry: string;
  amount: number;
  convertedAmount: number;
  amountSymbol: string;
  convertedAmountSymbol: string;
};

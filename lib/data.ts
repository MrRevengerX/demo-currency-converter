export const ALLOWED_CURRENCIES: Record<
  string,
  { currency: string; symbol: string }
> = {
  USA: { currency: "USD", symbol: "$" },
  "Sri Lanka": { currency: "LKR", symbol: "Rs." },
  Australia: { currency: "AUD", symbol: "A$" },
  India: { currency: "INR", symbol: "₹" },
};

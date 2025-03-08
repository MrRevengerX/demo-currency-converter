// import { createTheme } from "@mui/material";
import CurrencyConverter from "./components/CurrencyConverter";
import CurrencyRecords from "./components/CurrencyRecords";

export default function Home() {
  return (
    <div className="h-full max-w-2xl mx-auto p-4">
      <CurrencyConverter />
      <h2 className="text-lg font-semibold mt-4 mb-1">Recent Conversions</h2>
      <CurrencyRecords />
    </div>
  );
}

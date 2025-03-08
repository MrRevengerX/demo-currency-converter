"use client";
import { numberWithCommas } from "@/utils/numberWithCommas";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ALLOWED_CURRENCIES } from "@/lib/data";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { ArrowRight, LoaderIcon } from "lucide-react";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: "#ffffff", // White text
    },
  },
});

function CurrencyConverter() {
  const queryClient = useQueryClient();

  const countries = Object.keys(ALLOWED_CURRENCIES);

  const [formattedAmount, setFormattedAmount] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove existing commas
    setFormattedAmount(numberWithCommas(rawValue));
  };

  const handleFromCounty = (event: SelectChangeEvent) => {
    setFromCountry(event.target.value);
  };

  const handleToCounty = (event: SelectChangeEvent) => {
    setToCountry(event.target.value);
  };

  const fromCountyCurrency = fromCountry
    ? ALLOWED_CURRENCIES[fromCountry].currency
    : null;
  const toCountryCurrency = toCountry
    ? ALLOWED_CURRENCIES[toCountry].currency
    : null;

  const { data } = useQuery({
    queryKey: ["fromCurrency", fromCountyCurrency],
    queryFn: async () => {
      if (!fromCountyCurrency) return null;
      const res = await fetch(
        `https://open.er-api.com/v6/latest/${fromCountyCurrency}`
      );
      return await res.json();
    },
    enabled: !!fromCountyCurrency,
  });

  useEffect(() => {
    const convertCurrency = async () => {
      if (!fromCountry || !toCountry || !data) {
        return;
      }

      const rate = toCountryCurrency ? data.rates[toCountryCurrency] : null;

      const rawAmount = Number(formattedAmount.replace(/,/g, ""));
      const convertedAmount = Number(rawAmount) * rate; // Replace with actual conversion logic
      setConvertedAmount(convertedAmount.toString());
    };

    convertCurrency();
  }, [data, formattedAmount, fromCountry, toCountry, toCountryCurrency]);

  const { mutate: handleTransfer, isPending } = useMutation({
    mutationFn: async () => {
      const rawAmount = Number(formattedAmount.replace(/,/g, ""));

      const res = await fetch("/api/currency-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromCountry,
          toCountry,
          amount: rawAmount,
          convertedAmount,
        }),
      });

      if (!res.ok) throw new Error("Failed to transfer money");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currencyRecords"] }); // Refetch data
      setConvertedAmount("");
      setFormattedAmount("");
      setFromCountry("");
      setToCountry("");
    },
  });

  const handleTransferClick = () => {
    if (!fromCountry || !toCountry || !formattedAmount || !convertedAmount) {
      alert("Please fill in all fields");
      return;
    }
    handleTransfer();
  };

  return (
    <div className="flex flex-col gap-8">
      <ThemeProvider theme={darkTheme}>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel>From</InputLabel>
              <Select
                value={fromCountry}
                label="From"
                onChange={handleFromCounty}
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className="text-4xl flex gap-2 items-center">
              <p>{ALLOWED_CURRENCIES[fromCountry]?.symbol}</p>
              <input
                type="text"
                className="w-full border-b text-5xl outline-0"
                value={formattedAmount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel>To</InputLabel>
              <Select value={toCountry} label="To" onChange={handleToCounty}>
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="text-4xl flex gap-2 items-center">
              <p>{ALLOWED_CURRENCIES[toCountry]?.symbol}</p>
              <div className="text-5xl">
                {numberWithCommas(convertedAmount)}
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
      <Button
        variant="contained"
        endIcon={
          isPending ? <LoaderIcon className="animate-spin" /> : <ArrowRight />
        }
        color="success"
        className="my-6"
        onClick={handleTransferClick}
      >
        Transfer
      </Button>
    </div>
  );
}

export default CurrencyConverter;

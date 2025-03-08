"use client";
import React from "react";
import CurrencyRecord from "./CurrencyRecord";
import { useQuery } from "@tanstack/react-query";
import { CurrencyRecordType } from "@/types";

function CurrencyRecords() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      console.log("Fetching models");
      const res = await fetch("/api/currency-records");
      return await res.json();
    },
  });
  return (
    <div className="flex flex-col gap-4">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetching data</div>}
      {isSuccess &&
        data.data.map((record: CurrencyRecordType) => (
          <CurrencyRecord key={record._id} {...record} />
        ))}
    </div>
  );
}

export default CurrencyRecords;

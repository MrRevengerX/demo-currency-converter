import { CurrencyRecordType } from "@/types";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { Button } from "@mui/material";
import clsx from "clsx";
import { ArrowRight, Trash2 } from "lucide-react";
import React from "react";

function CurrencyRecord(props: CurrencyRecordType) {
  const {
    amount,
    amountSymbol,
    convertedAmount,
    convertedAmountSymbol,
    fromCountry,
    toCountry,
    createdAt,
  } = props;
  const date = new Date(createdAt);
  const createdTime = date.toLocaleString();
  return (
    <div className="p-3 border border-neutral-700 rounded-2xl">
      <div className="flex justify-between pb-3">
        <p className="">{createdTime}</p>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Trash2 size={14} />}
          color="error"
        >
          Delete
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        <CurrencyBox
          amount={amount}
          amountSymbol={amountSymbol}
          country={fromCountry}
          className="col-span-3"
        />
        <ArrowRight className="place-self-center" />
        <CurrencyBox
          amount={convertedAmount}
          amountSymbol={convertedAmountSymbol}
          country={toCountry}
          className="col-span-3"
        />
      </div>
    </div>
  );
}

function CurrencyBox({
  amount,
  amountSymbol,
  country,
  className,
}: {
  amount: number;
  amountSymbol: string;
  country: string;
  className?: string;
}) {
  return (
    <div
      className={clsx("p-3 border border-neutral-800 rounded-lg", className)}
    >
      <div className="flex gap-0.5 text-3xl">
        <p className="opacity-80 font-light">{amountSymbol}</p>
        <p className="font-semibold overflow-y-auto">
          {numberWithCommas(amount)}
        </p>
      </div>
      <p>{country}</p>
    </div>
  );
}

export default CurrencyRecord;

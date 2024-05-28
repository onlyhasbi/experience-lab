/* eslint-disable no-useless-escape */
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

export const Route = createLazyFileRoute("/currency")({
  component: () => <Currency />,
});

const currencyFormat = {
  SG: {
    decimalSeparator: ".",
    thousandSeparator: ",",
    decimalScale: 2,
  },
  ID: {
    decimalSeparator: ",",
    thousandSeparator: ".",
    decimalScale: 0,
  },
};

type CurrencyFormatKey = keyof typeof currencyFormat;

function Currency() {
  const [currency, setCurrency] = useState("");
  const [region, setRegion] = useState<CurrencyFormatKey>("SG");

  const handleSelectedRegion = (value: string) => {
    setRegion(value as CurrencyFormatKey);
  };

  return (
    <div className="flex flex-col gap-2 p-8">
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <label
            className="text-xs text-slate-400 cursor-pointer"
            htmlFor="country"
          >
            Country code
          </label>
          <Select onValueChange={handleSelectedRegion}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Country Code" />
            </SelectTrigger>
            <SelectContent>
              {[
                { label: "Singapore", value: "SG" },
                { label: "Indonesia", value: "ID" },
              ].map((country) => (
                <SelectItem value={country.value}>{country.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="price"
            className="text-xs text-slate-400 cursor-pointer"
          >
            Price
          </label>
          <NumericFormat
            id="price"
            className="text-sm"
            value={currency}
            onValueChange={(e) => setCurrency(e.value)}
            customInput={Input}
            thousandSeparator={currencyFormat[region].thousandSeparator}
            decimalSeparator={currencyFormat[region].decimalSeparator}
            allowedDecimalSeparators={[",", "."]}
            decimalScale={currencyFormat[region].decimalScale}
            placeholder="Product price"
          />
        </div>
      </div>
    </div>
  );
}

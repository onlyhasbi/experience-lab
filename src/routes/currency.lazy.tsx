/* eslint-disable no-useless-escape */
import { currencyFormatValue, handleCurrencyValue } from '@/utils/currencyFormatter';
import { createLazyFileRoute } from '@tanstack/react-router';
import { ChangeEvent, useState } from 'react';

export const Route = createLazyFileRoute('/currency')({
  component: () => <Currency />
});

function Currency() {
  const [value, setValue] = useState('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(handleCurrencyValue(value, e));
  };

  return (
    <div className="flex flex-col gap-2 p-8">
      {/* <div className="flex gap-2">
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
      </div> */}
      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="text-slate-500 text-xs tracking-wide">
          Product price
        </label>
        <input
          id="price"
          type="text"
          className="border border-slate-500 rounded px-4 py-2 outline-none focus:ring-0"
          placeholder="Product Price"
          value={currencyFormatValue(value)}
          onChange={handleOnChange}
          autoComplete="off"
        />
        <br />
        <pre>{value}</pre>
      </div>
    </div>
  );
}

import { ChangeEvent } from "react";

export const countryConfig = {
  id: {
    code: "id-ID",
    currency: "IDR",
    prefix: "Rp",
    decimal: 0,
    separator: ".",
  },
  sg: {
    code: "en-SG",
    currency: "SGD",
    prefix: "S$",
    decimal: 2,
    separator: ",",
  },
};

const rules = {
  sg: /,/g,
  id: /\./g,
};

type Region = "sg" | "id";
const region: Region = "sg";

const currencyFormatter = (value: string) =>
  value.replace(/\B(?=(\d{3})+(?!\d))/g, countryConfig[region].separator);

export const parseToInt = (value: string) =>
  value == "0" ? "0" : parseInt(value, 10);

export function currencyFormatValue(value: string) {
  if (!value) {
    return "";
  }
  const baseValue = typeof value === "number" ? `${value}` : value;
  const hasDecimalSeparator = baseValue.includes?.(".");
  const [currency, fraction] = baseValue.split(".");
  const formattedCurrency =
    currency.length > 3 ? currencyFormatter(currency) : currency;
  return `${formattedCurrency}${hasDecimalSeparator ? "." : ""}${fraction ?? ""}`;
}

const valueIsAllowed = (value: string, region: Region): boolean => {
  if (region === "id") {
    return /^[0-9.]*$/.test(value);
  }
  return /^(?:[0-9]*,?\.?[0-9]{0,2})$/.test(value);
};

export const clearFormat = (value: string) => value.replace(rules[region], "");

export const handleCurrencyValue = (
  value: string,
  e: ChangeEvent<HTMLInputElement>
) => {
  const element = e.target as HTMLInputElement;
  // eslint-disable-next-line prefer-const
  let { selectionStart: caret, value: currentValue } = element;
  currentValue = clearFormat(currentValue);
  const allowed = valueIsAllowed(currentValue, region);
  let hasCurrencySeparator = 0;

  if (allowed) {
    if (currentValue.length > value.length && caret! != 1) {
      hasCurrencySeparator = value.length % 3 == 0 ? 1 : 0;
    }

    if (currentValue.length < value.length && caret! != 1) {
      hasCurrencySeparator =
        value.length % (3 * Math.ceil(currentValue.length / 3) + 1) == 0
          ? caret != 0
            ? -1
            : 0
          : 0;
    }
  } else {
    if (caret! != 1) {
      hasCurrencySeparator = -1;
    } else {
      hasCurrencySeparator = 0;
    }
  }

  window.requestAnimationFrame(() => {
    if (caret != null) {
      element.selectionStart = caret + hasCurrencySeparator;
      element.selectionEnd = caret + hasCurrencySeparator;
    }
  });

  return !allowed ? value : currentValue;
};

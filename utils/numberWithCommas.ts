import { numericFormatter } from "react-number-format";

// Regex to add commas to numbers
export function numberWithCommas(x: string) {
  return numericFormatter(x, {
    thousandSeparator: true,
    decimalScale: 3,
    allowNegative: false,
  });
}

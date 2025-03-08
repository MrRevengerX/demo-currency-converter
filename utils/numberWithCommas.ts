import { numericFormatter } from "react-number-format";

export function numberWithCommas(x: string) {
  const cleaned = x.replace(/[^\d.]/g, ""); //Regex to remove all non-numeric characters
  return numericFormatter(cleaned, {
    thousandSeparator: true,
    decimalScale: 3,
    allowNegative: false,
  });
}

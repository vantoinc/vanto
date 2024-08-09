import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "$") {
  const formattedNumber = amount.toFixed(2);
  const [integerPart, decimalPart] = formattedNumber.split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ".",
  );
  const result = `${formattedIntegerPart},${decimalPart}`;
  return `${result}${currency}`;
}

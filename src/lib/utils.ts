import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "$"): string {
  const formattedNumber = amount.toFixed(2);
  const [integerPart, decimalPart] = formattedNumber.split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ".",
  );
  const result = `${formattedIntegerPart},${decimalPart}`;
  return `${result}${currency}`;
}

export function generateToken(length: number = 9): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}

export function generateSlug(text: string): string {
  const slug = text.toLowerCase().replace(/\s+/g, "-");
  const cleanSlug = slug.replace(/[^a-z0-9-]/g, "");

  return cleanSlug;
}

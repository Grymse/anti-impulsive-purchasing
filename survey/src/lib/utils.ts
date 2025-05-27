import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function NaNToZero(value: number): number {
  return NaNOrDefault(value, 0);
}

export function NaNOrDefault<T>(value: number, defaultValue: T): number | T {
  return isNaN(value) ? defaultValue : value;
}

export function displayHourMinutes(seconds: number) {
  return `${Math.floor(seconds / 3600)}h${Math.floor((seconds / 60) % 60)}m`;
}

export function lightenColor(hex: string, amount: number) {
  // Ensure hex is properly formatted
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  // If the hex is a shorthand form (#abc), expand it to full form (#aabbcc)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Convert the hex values to RGB
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  // Adjust each color channel by the given amount (can be negative for darkening)
  r = Math.min(255, Math.max(0, r + amount));
  g = Math.min(255, Math.max(0, g + amount));
  b = Math.min(255, Math.max(0, b + amount));

  // Convert back to hex, ensuring 2 characters for each color
  const newHex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;

  return newHex;
}

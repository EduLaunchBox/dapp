"use client";
import { type ClassValue, clsx } from "clsx";
import { ethers } from "ethers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const currencyFormatter = (value: number, fractionDigits = 0, currency = "") => {
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: fractionDigits,
    }).format(value);
    return formatted.replace(currency, "");
};

export function shortenAddress(address: string) {
    if (address.length < 10) {
        // If the address is too short to be shortened, return it as is
        return address;
    }

    const start = address.slice(0, 4);
    const end = address.slice(-4);
    return `${start}.....${end}`;
}

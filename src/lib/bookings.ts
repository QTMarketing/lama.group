import { randomUUID } from "crypto";

export type ServiceType =
  | "Store Leasing & Management"
  | "Fuel Branding & Supply"
  | "Wholesale Distribution"
  | "Construction & Renovation";

export interface BookingInput {
  service: ServiceType;
  designatedEmail: string;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:mm
  name: string;
  userEmail: string;
}

export interface StoredBooking extends BookingInput {
  token: string;
  createdAt: number; // epoch ms
}

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h

// Simple in-memory store for demo purposes
const tokenToBooking = new Map<string, StoredBooking>();

export function createBooking(input: BookingInput): StoredBooking {
  const token = randomUUID();
  const stored: StoredBooking = { ...input, token, createdAt: Date.now() };
  tokenToBooking.set(token, stored);
  return stored;
}

export function getBooking(token: string): StoredBooking | null {
  const b = tokenToBooking.get(token);
  if (!b) return null;
  if (Date.now() - b.createdAt > TOKEN_TTL_MS) {
    tokenToBooking.delete(token);
    return null;
  }
  return b;
}

export function deleteBooking(token: string): void {
  tokenToBooking.delete(token);
}




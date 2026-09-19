"use client";

import { useState } from "react";
import { listing } from "@/data/listing";

export default function BookingCard() {
  const [nights] = useState(3);
  const subtotal = listing.pricePerNight * nights;
  const serviceFee = Math.round(subtotal * 0.14);
  const total = subtotal + serviceFee;

  return (
    <div className="sticky top-24 w-full max-w-sm rounded-2xl border border-gray-200 p-6 shadow-card">
      <div className="mb-4 flex items-baseline justify-between">
        <p>
          <span className="text-lg font-semibold">
            {listing.currency}
            {listing.pricePerNight.toLocaleString("en-IN")}
          </span>{" "}
          <span className="text-hof">night</span>
        </p>
        <p className="flex items-center gap-1 text-sm">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
            <path d="M12 2 9.2 8.6 2 9.2l5.5 4.7L5.8 21 12 17.3 18.2 21l-1.7-7.1L22 9.2l-7.2-.6z" />
          </svg>
          <span className="font-medium">{listing.rating}</span>
          <span className="text-foggy">({listing.reviewCount})</span>
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 overflow-hidden rounded-xl border border-gray-300">
        <div className="border-r border-gray-300 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide">
            Check-in
          </p>
          <p className="text-sm">11/10/2026</p>
        </div>
        <div className="px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide">
            Checkout
          </p>
          <p className="text-sm">11/13/2026</p>
        </div>
        <div className="col-span-2 border-t border-gray-300 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide">
            Guests
          </p>
          <p className="text-sm">2 guests</p>
        </div>
      </div>

      <button className="mb-4 w-full rounded-lg bg-rausch py-3 font-semibold text-white transition-transform duration-150 hover:brightness-95 active:scale-[0.99]">
        Reserve
      </button>

      <p className="mb-4 text-center text-sm text-foggy">
        You won&apos;t be charged yet
      </p>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="underline">
            {listing.currency}
            {listing.pricePerNight.toLocaleString("en-IN")} x {nights} nights
          </span>
          <span>
            {listing.currency}
            {subtotal.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="underline">Airbnb service fee</span>
          <span>
            {listing.currency}
            {serviceFee.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 font-semibold">
        <span>Total</span>
        <span>
          {listing.currency}
          {total.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
}

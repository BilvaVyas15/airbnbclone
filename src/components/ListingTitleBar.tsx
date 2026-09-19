"use client";

import { useState } from "react";

interface Props {
  title: string;
  rating: number;
  reviewCount: number;
  location: string;
}

export default function ListingTitleBar({
  title,
  rating,
  reviewCount,
  location,
}: Props) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-[1120px] px-6 pt-6 md:px-0">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold text-hof">{title}</h1>
        <div className="flex shrink-0 items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold underline decoration-1 hover:bg-gray-100">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M18 16a3 3 0 0 0-2.24 1.02l-6.4-3.73a3 3 0 0 0 0-1.58l6.4-3.73A3 3 0 1 0 15 6a3 3 0 0 0 .06.58L8.66 10.3A3 3 0 1 0 6 15a3 3 0 0 0 2.66-1.6l6.4 3.73A3 3 0 1 0 18 16z" />
            </svg>
            Share
          </button>
          <button
            onClick={() => setSaved((s) => !s)}
            aria-pressed={saved}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold underline decoration-1 hover:bg-gray-100"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 transition-colors ${
                saved ? "fill-rausch" : "fill-none stroke-current stroke-2"
              }`}
            >
              <path d="M12 21s-7.5-4.6-10-9.3C.5 8.4 2.3 5 5.8 5c2 0 3.4 1 6.2 4 2.8-3 4.2-4 6.2-4 3.5 0 5.3 3.4 3.8 6.7C19.5 16.4 12 21 12 21z" />
            </svg>
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1 text-sm">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
          <path d="M12 2 9.2 8.6 2 9.2l5.5 4.7L5.8 21 12 17.3 18.2 21l-1.7-7.1L22 9.2l-7.2-.6z" />
        </svg>
        <span className="font-medium">{rating}</span>
        <span className="text-foggy">·</span>
        <a href="#reviews" className="font-medium underline">
          {reviewCount} reviews
        </a>
        <span className="text-foggy">·</span>
        <span className="underline">{location}</span>
      </div>
    </div>
  );
}

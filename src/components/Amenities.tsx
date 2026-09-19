"use client";

import { useState } from "react";
import { listing } from "@/data/listing";

const iconPaths: Record<string, string> = {
  "hot-tub": "M4 18c0-2 2-3 8-3s8 1 8 3M6 15V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6M12 4v3",
  ac: "M3 9h18M3 15h18M7 9v6M12 9v6M17 9v6",
  parking: "M6 3h12v18H6zM10 7h4a3 3 0 0 1 0 6h-4V7z",
  wifi: "M2 8.5a15 15 0 0 1 20 0M5.5 12a10 10 0 0 1 13 0M9 15.5a5 5 0 0 1 6 0M12 19v.01",
  kitchen: "M4 3v18M4 8h6M20 3v18M14 3v10a3 3 0 0 0 6 0V3M17 13v8",
  workspace: "M4 6h16v10H4zM2 20h20M9 6V4h6v2",
  tv: "M4 4h16v12H4zM9 20h6M12 16v4",
  washer: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM7 6h.01M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
};

export default function Amenities() {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll
    ? listing.amenities
    : listing.amenities.slice(0, 6);

  return (
    <div className="mx-auto max-w-[1120px] border-b border-gray-200 px-6 py-6 md:px-0">
      <h2 className="mb-4 text-xl font-semibold text-hof">
        What this place offers
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {shown.map((a) => (
          <div key={a.label} className="flex items-center gap-4">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-none stroke-current stroke-[1.3]"
            >
              <path d={iconPaths[a.icon] ?? ""} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[15px]">{a.label}</span>
          </div>
        ))}
      </div>
      {listing.amenities.length > 6 && (
        <button
          onClick={() => setShowAll((s) => !s)}
          className="mt-6 rounded-lg border border-hof px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
        >
          {showAll
            ? "Show less"
            : `Show all ${listing.amenities.length} amenities`}
        </button>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { listing } from "@/data/listing";

export default function Description() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mx-auto max-w-[1120px] border-b border-gray-200 px-6 py-6 md:px-0">
      <p
        className={`text-[15px] leading-6 text-hof ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {listing.description}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-3 flex items-center gap-1 font-semibold underline"
      >
        {expanded ? "Show less" : "Show more"}
        <svg
          viewBox="0 0 24 24"
          className={`h-3 w-3 fill-current transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <path d="M12 16 4 8l1.4-1.4L12 13.2l6.6-6.6L20 8z" />
        </svg>
      </button>
    </div>
  );
}

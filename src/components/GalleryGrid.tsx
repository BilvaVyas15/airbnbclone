"use client";

import Image from "next/image";
import { Photo } from "@/data/listing";

interface Props {
  photos: Photo[];
  onOpenTour: () => void;
  onOpenLightbox: (index: number) => void;
}

export default function GalleryGrid({
  photos,
  onOpenTour,
  onOpenLightbox,
}: Props) {
  const main = photos[0];
  const rest = photos.slice(1, 5);

  return (
    <section
      aria-label="Photo gallery"
      className="relative mx-auto mt-6 max-w-[1120px] px-6 md:px-0"
    >
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl h-[280px] md:h-[420px]">
        <button
          className="group relative col-span-2 row-span-2 overflow-hidden focus:outline-none"
          onClick={() => onOpenLightbox(0)}
          aria-label={`Open photo: ${main.room}`}
        >
          <Image
            src={main.src}
            alt={main.alt}
            fill
            priority
            sizes="50vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
        </button>

        {rest.map((p, i) => (
          <button
            key={p.id}
            className={`group relative overflow-hidden focus:outline-none ${
              i === 3 ? "block" : ""
            }`}
            onClick={() => onOpenLightbox(i + 1)}
            aria-label={`Open photo: ${p.room}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      <button
        onClick={onOpenTour}
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-[0_1px_4px_rgba(0,0,0,0.4)] transition-transform duration-150 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-hof md:right-6"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
          <path d="M2 2h4v2H4v2H2V2zm8 0h4v4h-2V4h-2V2zM2 10h2v2h2v2H2v-4zm10 2h-2v-2h4v4h-2v-2z" />
        </svg>
        Show all photos
      </button>
    </section>
  );
}

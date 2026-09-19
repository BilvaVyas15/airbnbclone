"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Photo } from "@/data/listing";

interface Props {
  photos: Photo[];
  onClose: () => void;
  onOpenLightbox: (index: number) => void;
}

export default function PhotoTour({ photos, onClose, onOpenLightbox }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const grouped = photos.reduce<Record<string, Photo[]>>((acc, p) => {
    acc[p.room] = acc[p.room] ? [...acc[p.room], p] : [p];
    return acc;
  }, {});

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      className="fixed inset-0 z-50 overflow-y-auto bg-white animate-fadeIn"
    >
      <div className="sticky top-0 z-10 flex items-center bg-white px-6 py-4">
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close photo tour"
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-hof"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z" />
          </svg>
        </button>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-24">
        {Object.entries(grouped).map(([room, roomPhotos]) => (
          <section key={room} className="mb-10">
            <h2 className="mb-3 text-lg font-semibold text-hof">{room}</h2>
            <div className="flex flex-col gap-3">
              {roomPhotos.map((p) => {
                const globalIndex = photos.findIndex((x) => x.id === p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => onOpenLightbox(globalIndex)}
                    aria-label={`Open ${p.room} photo`}
                    className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-hof"
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="768px"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-sm text-foggy">
              {roomPhotos[0].caption}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

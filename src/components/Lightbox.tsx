"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Photo } from "@/data/listing";

interface Props {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const photo = photos[index];

  // Focus the close button on open, restore focus to trigger on close is
  // handled by the parent (it re-focuses the element that opened this).
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate((index + 1) % photos.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate((index - 1 + photos.length) % photos.length);
      } else if (e.key === "Tab") {
        // simple focus trap within the dialog
        const focusables = containerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [index, photos.length, onClose, onNavigate]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.room}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fadeIn"
    >
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z" />
        </svg>
      </button>

      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-sm font-medium text-white/80">
        {index + 1} / {photos.length}
      </span>

      {photos.length > 1 && (
        <button
          onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-hof shadow-md hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:left-8"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M15.5 19 6.5 12l9-7 1.2 1.6L9.9 12l6.8 5.4z" />
          </svg>
        </button>
      )}

      <div
        key={photo.id}
        className="relative mx-16 h-[75vh] w-[80vw] max-w-4xl animate-scaleIn"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="80vw"
          className="object-contain"
          priority
        />
      </div>

      {photos.length > 1 && (
        <button
          onClick={() => onNavigate((index + 1) % photos.length)}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-hof shadow-md hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:right-8"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M8.5 5 17.5 12l-9 7-1.2-1.6L14.1 12 7.3 6.6z" />
          </svg>
        </button>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white">
        <p className="text-sm font-semibold">{photo.room}</p>
        <p className="text-xs text-white/70">{photo.caption}</p>
      </div>
    </div>
  );
}

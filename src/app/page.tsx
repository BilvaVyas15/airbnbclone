"use client";

import { useCallback, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import GalleryGrid from "@/components/GalleryGrid";
import ListingTitleBar from "@/components/ListingTitleBar";
import HostSummary from "@/components/HostSummary";
import Highlights from "@/components/Highlights";
import Description from "@/components/Description";
import Amenities from "@/components/Amenities";
import BookingCard from "@/components/BookingCard";
import PhotoTour from "@/components/PhotoTour";
import Lightbox from "@/components/Lightbox";
import { listing, photos } from "@/data/listing";

type Overlay = "none" | "tour" | "lightbox";

export default function Home() {
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [returnToTour, setReturnToTour] = useState(false);
  const lastFocused = useRef<HTMLElement | null>(null);

  const openTour = useCallback(() => {
    lastFocused.current = document.activeElement as HTMLElement;
    setOverlay("tour");
  }, []);

  const openLightboxFromGrid = useCallback((index: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setReturnToTour(false);
    setLightboxIndex(index);
    setOverlay("lightbox");
  }, []);

  const openLightboxFromTour = useCallback((index: number) => {
    setReturnToTour(true);
    setLightboxIndex(index);
    setOverlay("lightbox");
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlay("none");
    lastFocused.current?.focus();
  }, []);

  const closeLightbox = useCallback(() => {
    if (returnToTour) {
      setOverlay("tour");
    } else {
      closeOverlay();
    }
  }, [returnToTour, closeOverlay]);

  return (
    <main>
      <SiteHeader />

      <GalleryGrid
        photos={photos}
        onOpenTour={openTour}
        onOpenLightbox={openLightboxFromGrid}
      />

      <ListingTitleBar
        title={listing.title}
        rating={listing.rating}
        reviewCount={listing.reviewCount}
        location={listing.location}
      />

      <div className="mx-auto max-w-[1120px] px-6 py-6 md:grid md:grid-cols-[1fr_380px] md:gap-16 md:px-0">
        <div>
          <HostSummary />
          <Highlights />
          <Description />
          <Amenities />
        </div>
        <div className="hidden md:block">
          <BookingCard />
        </div>
      </div>

      {overlay === "tour" && (
        <PhotoTour
          photos={photos}
          onClose={closeOverlay}
          onOpenLightbox={openLightboxFromTour}
        />
      )}

      {overlay === "lightbox" && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </main>
  );
}

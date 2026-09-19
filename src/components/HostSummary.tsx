import { listing } from "@/data/listing";

export default function HostSummary() {
  return (
    <div className="mx-auto flex max-w-[1120px] items-center justify-between border-b border-gray-200 px-6 py-6 md:px-0">
      <div>
        <p className="text-lg font-semibold text-hof">
          {listing.propertyType}
        </p>
        <p className="text-foggy">
          {listing.guests} guests · {listing.bedrooms} bedroom ·{" "}
          {listing.beds} bed · {listing.bathrooms} bathroom
        </p>
      </div>
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-600">
        {listing.host.name.charAt(0)}
      </div>
    </div>
  );
}

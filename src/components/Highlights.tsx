import { listing } from "@/data/listing";

const icons: Record<string, JSX.Element> = {
  key: (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[1.4]">
      <circle cx="8" cy="15" r="3" />
      <path d="M10.5 12.5 20 3M17 6l2 2M14 9l2 2" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[1.4]">
      <path d="M9 20 3 17V4l6 3 6-3 6 3v13l-6-3-6 3z" />
      <path d="M9 7v13M15 4v13" />
    </svg>
  ),
  medal: (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[1.4]">
      <circle cx="12" cy="8" r="5" />
      <path d="M9 12.5 7 21l5-2 5 2-2-8.5" />
    </svg>
  ),
};

export default function Highlights() {
  return (
    <div className="mx-auto max-w-[1120px] border-b border-gray-200 px-6 py-6 md:px-0">
      <ul className="space-y-6">
        {listing.highlights.map((h) => (
          <li key={h.title} className="flex items-start gap-4">
            <span className="mt-0.5 text-hof">{icons[h.icon]}</span>
            <div>
              <p className="font-medium text-hof">{h.title}</p>
              <p className="text-sm text-foggy">{h.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  room: string;
  caption: string;
}

export const listing = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  propertyType: "Entire serviced apartment in Candolim, India",
  guests: 2,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  rating: 4.86,
  reviewCount: 92,
  isSuperhost: true,
  location: "Candolim, Goa, India",
  pricePerNight: 3200,
  currency: "₹",
  discountNote: "Get 10% off your next stay",
  promoNote: "Price drop",
  host: {
    name: "Mirashya Stays",
    isSuperhost: true,
    yearsHosting: 4,
    avatar: "",
  },
  description:
    "A romantic one-bedroom apartment featuring a private jacuzzi, tucked away in the quiet lanes of Candolim, just a short stroll from the beach and Goa's best nightlife. The space blends warm wood tones with contemporary comforts for a relaxed, indulgent stay.",
  amenities: [
    { label: "Private jacuzzi", icon: "hot-tub" },
    { label: "Air conditioning", icon: "ac" },
    { label: "Free parking on premises", icon: "parking" },
    { label: "Wifi", icon: "wifi" },
    { label: "Kitchen", icon: "kitchen" },
    { label: "Dedicated workspace", icon: "workspace" },
    { label: "TV", icon: "tv" },
    { label: "Washing machine", icon: "washer" },
  ],
  highlights: [
    {
      title: "Self check-in",
      body: "Check yourself in with the smartlock.",
      icon: "key",
    },
    {
      title: "Great location",
      body: "95% of recent guests gave the location a 5-star rating.",
      icon: "map",
    },
    {
      title: "Mirashya Stays is a Superhost",
      body: "Superhosts are experienced, highly rated hosts.",
      icon: "medal",
    },
  ],
};

export const photos: Photo[] = [
  {
    id: "living-1",
    src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&q=80",
    alt: "Living room with orange sofa",
    room: "Living room 1",
    caption: "Sofa, Air conditioning, Ceiling fan, TV",
  },
  {
    id: "living-2",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80",
    alt: "Living room seating area",
    room: "Living room 2",
    caption: "Lounge chairs, Coffee table, Ambient lighting",
  },
  {
    id: "full-kitchen",
    src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&q=80",
    alt: "Full kitchen",
    room: "Full kitchen",
    caption: "Refrigerator, Microwave, Stovetop, Cookware",
  },
  {
    id: "bedroom",
    src: "https://images.unsplash.com/photo-1594563703937-c9c5e9e9e0b9?w=1600&q=80",
    alt: "Bedroom with double bed",
    room: "Bedroom",
    caption: "1 double bed, Air conditioning, Blackout curtains",
  },
  {
    id: "jacuzzi",
    src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80",
    alt: "Private jacuzzi on the balcony",
    room: "Full bathroom",
    caption: "Private jacuzzi, Rain shower, Towels",
  },
  {
    id: "pool",
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80",
    alt: "Shared pool area",
    room: "Pool",
    caption: "Shared outdoor pool, Loungers",
  },
  {
    id: "exterior",
    src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
    alt: "Building exterior",
    room: "Exterior",
    caption: "Building exterior, Entrance, Parking",
  },
];

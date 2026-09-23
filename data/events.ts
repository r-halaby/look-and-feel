export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  description: string;
  capacity?: number;
  status: "upcoming" | "past";
  lumaEventSlug?: string;
  image?: string;
};

export const events: Event[] = [
  {
    id: "evt-001",
    title: "Look &amp; Feel",
    date: "2026-10-22",
    time: "6:30–9 PM",
    location: "Index Greenpoint",
    city: "Brooklyn, NY",
    description:
      "Four visual practitioners perform as DJs back-to-back on the rooftop during an open-air listening session. Come to dance, talk, and explore the relationship between music and creative work. $10 entry.",
    status: "upcoming",
    lumaEventSlug: "ff8c2m1q",
    image:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/uploads/72/f791df86-c66b-4ae8-85a6-c18c82ef9b01.jpg",
  },
];

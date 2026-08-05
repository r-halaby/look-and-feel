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
};

export const events: Event[] = [
  {
    id: "evt-001",
    title: "Coming Soon",
    date: "2026-09-24",
    time: "TBA",
    location: "TBA",
    city: "Brooklyn, NY",
    description: "",
    status: "upcoming",
  },
];

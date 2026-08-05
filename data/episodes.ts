export type Episode = {
  id: string;
  number: number;
  title: string;
  guest: string;
  date: string;
  duration: string;
  description: string;
  audioUrl?: string;
};

export const episodes: Episode[] = [
  {
    id: "ep-001",
    number: 1,
    title: "Coming Soon",
    guest: "Rahmi",
    date: "2026-08-26",
    duration: "",
    description: "",
  },
];

export type Episode = {
  id: string;
  number: number;
  title: string;
  guest: string;
  date: string;
  duration: string;
  description: string;
  audioUrl?: string;
  coverImage?: string;
};

export const episodes: Episode[] = [
  {
    id: "ep-002",
    number: 2,
    title: "LOOK &amp; FEEL RADIO 002",
    guest: "Rahmi Halaby",
    date: "2026-09-23",
    duration: "",
    description: "",
    audioUrl:
      "https://lbgavdwobkucivgs.public.blob.vercel-storage.com/look_and_feel_002.mp3",
    coverImage: "/covers/ep-002.png",
  },
  {
    id: "ep-001",
    number: 1,
    title: "LOOK &amp; FEEL RADIO 001",
    guest: "Rahmi Halaby",
    date: "2026-08-26",
    duration: "",
    description: "",
    coverImage: "/covers/ep-001.jpg",
  },
];

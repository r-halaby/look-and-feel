export type Track = {
  time: string;
  title: string;
  artist: string;
};

export type Chapter = {
  time: string;
  label: string;
  guest?: string;
};

export type Episode = {
  id: string;
  number: number;
  title: string;
  guest: string;
  date: string;
  duration: string;
  description: string;
  audioUrl?: string;
  coverImage?: string;   // 16:9, used in the audio/video player
  hoverImage?: string;   // 4:5, used for the index table hover thumbnail
  videoUrl?: string;
  photos?: string[];
  tracks?: Track[];
  chapters?: Chapter[];
};

export const episodes: Episode[] = [
  {
    id: "ep-003",
    number: 3,
    title: "LOOK &amp; FEEL RADIO 003",
    guest: "Rahmi Halaby",
    date: "2026-10-21",
    duration: "91:00",
    description: "",
    audioUrl: "https://lbgavdwobkucivgs.public.blob.vercel-storage.com/Look%20%26%20Feel%20Radio_ep003.mp3",
    coverImage: "/covers/ep-003-16x9.png",
    hoverImage: "/covers/ep-003-4x5.png",
  },
  {
    id: "ep-002",
    number: 2,
    title: "LOOK &amp; FEEL RADIO 002",
    guest: "Rahmi Halaby",
    date: "2026-09-23",
    duration: "87:57",
    description: "",
    audioUrl:
      "https://lbgavdwobkucivgs.public.blob.vercel-storage.com/look_and_feel_002.mp3",
    coverImage: "/covers/ep-002.png",
    // Replace with the real tracklist
    tracks: [
      { time: "0:00", title: "Track 001", artist: "Artist" },
      { time: "5:30", title: "Track 002", artist: "Artist" },
      { time: "12:00", title: "Track 003", artist: "Artist" },
      { time: "20:15", title: "Track 004", artist: "Artist" },
    ],
    chapters: [
      { time: "45:00", label: "Interview", guest: "Guest Name" },
    ],
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

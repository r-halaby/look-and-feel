export type Track = {
  time: string;
  title: string;
  artist: string;
  coverImage?: string;
  coverCredit?: string;
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
    id: "ep-004",
    number: 4,
    title: "LOOK &amp; FEEL RADIO 004",
    guest: "Rahmi",
    date: "2026-10-28",
    duration: "90:54",
    description: "",
    audioUrl: "https://lbgavdwobkucivgs.public.blob.vercel-storage.com/look%20%26%20feel%20Radio_ep004.mp3",
    coverImage: "/covers/ep-004-16x9.png",
    hoverImage: "/covers/ep-004-4x5.png",
    tracks: [
      { time: "0:00",  title: "Caged Bird",                                    artist: "Ekep Nkwelle" },
      { time: "4:13",  title: "You're My Everything (Live)",                   artist: "Chick Corea" },
      { time: "15:39", title: "The Visionary",                                 artist: "Kamasi Washington & Terrace Martin" },
      { time: "16:14", title: "Eye Never Know",                                artist: "Butcher Brown" },
      { time: "19:09", title: "You Got Me (Dirty)",                            artist: "The Roots ft Erykah Badu & Eve" },
      { time: "22:53", title: "Armando's Rhumba (Live)",                       artist: "Chick Corea" },
      { time: "31:31", title: "Cómo Remolino",                            artist: "New Jazz Underground, Axel Tosca, Gina D'Soto" },
      { time: "38:36", title: "Gentleman",                                     artist: "Meshell Ndegeocello, Yerba Buena, Ron Blake" },
      { time: "45:03", title: "My Foolish Heart (Live)",                       artist: "Chick Corea" },
      { time: "53:50", title: "Boundless Beings (Georgia Anne Muldrow Remix)", artist: "Nubya Garcia" },
      { time: "56:21", title: "God Is Fair, Sexy Nasty (Dirty)",               artist: "Mac Miller ft Kendrick Lamar" },
      { time: "64:07", title: "Sorrow Tears & Blood (2022 Mix)",               artist: "Bilal, Zap Mama, Common" },
      { time: "71:09", title: "The Next Movement (Dirty)",                     artist: "The Roots ft DJ Jazzy Jeff & Jazzyfatnastees" },
      { time: "74:44", title: "Mashita (Joe Kay's Slowed Edit)",               artist: "Mansur Brown" },
      { time: "77:26", title: "The Song Is You (Live)",                        artist: "Chick Corea" },
    ],
  },
  {
    id: "ep-003",
    number: 3,
    title: "LOOK &amp; FEEL RADIO 003",
    guest: "Rahmi",
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
    guest: "Rahmi",
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
    guest: "Rahmi",
    date: "2026-08-26",
    duration: "",
    description: "",
    coverImage: "/covers/ep-001.jpg",
  },
];

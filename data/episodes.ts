export type Track = {
  time: string;
  title: string;
  artist: string;
  album?: string;
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
      { time: "0:00",  title: "Caged Bird",                                    artist: "Ekep Nkwelle",                                   album: "Caged Bird" },
      { time: "4:13",  title: "You're My Everything (Live At Yoshi's Japanese Restaurant, Oakland, CA / October 12, 2010)", artist: "Chick Corea", album: "Trilogy (Deluxe Edition)" },
      { time: "15:39", title: "The Visionary",                                 artist: "Kamasi Washington & Terrace Martin",              album: "Fearless Movement" },
      { time: "16:14", title: "Eye Never Knew",                                artist: "Butcher Brown",                                   album: "Solar Music" },
      { time: "19:09", title: "You Got Me (Dirty)",                            artist: "The Roots ft Erykah Badu & Eve",                  album: "Things Fall Apart" },
      { time: "22:53", title: "Armando's Rhumba (Live At The Festivalna Dvorana Lent, Maribor, Slovenia / November 21, 2012)", artist: "Chick Corea", album: "Trilogy (Deluxe Edition)" },
      { time: "31:31", title: "Cómo Remolino",                                 artist: "New Jazz Underground, Axel Tosca, Gina D'Soto",   album: "Harlem to Havana: Afro-Cuban Modernism VOL.1" },
      { time: "38:36", title: "Gentleman",                                     artist: "Meshell Ndegeocello, Yerba Buena, Ron Blake",      album: "Red Hot + Riot" },
      { time: "45:03", title: "My Foolish Heart (Live At The Auditorio Nacional De Musica, Madrid, Spain / December 2, 2012)", artist: "Chick Corea", album: "Trilogy (Deluxe Edition)" },
      { time: "53:50", title: "Boundless Beings (Georgia Anne Muldrow Remix)", artist: "Nubya Garcia",                                    album: "Source We Move" },
      { time: "56:21", title: "God Is Fair Sexy Nasty (Dirty)",                artist: "Mac Miller ft Kendrick Lamar",                    album: "The Divine Feminine" },
      { time: "64:07", title: "Sorrow Tears & Blood (2022 Mix)",               artist: "Bilal, Zap Mama, Common",                         album: "Red Hot + Riot" },
      { time: "71:09", title: "The Next Movement (Dirty)",                     artist: "The Roots ft DJ Jazzy Jeff & Jazzyfatnastees",    album: "Things Fall Apart" },
      { time: "74:44", title: "Mashita (Joe Kay's Slowed Edit)",               artist: "Mansur Brown",                                    album: "Slowed Edits Vol. III" },
      { time: "77:26", title: "The Song Is You (Live At The Antalya Culture Center, Antalya, Turkey / November 28, 2012)", artist: "Chick Corea", album: "Trilogy (Deluxe Edition)" },
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

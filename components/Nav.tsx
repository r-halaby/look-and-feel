import Link from "next/link";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6 mix-blend-difference">
      <Link
        href="/"
        className="text-[11px] tracking-[0.18em] uppercase leading-tight text-white"
      >
        Tune in to FM F.M.
        <br />
        at Rodeo Radio
      </Link>
      <div className="flex items-center gap-6 sm:gap-10 text-[11px] tracking-[0.18em] uppercase text-white">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <Link href="/radio" className="hover:text-accent transition-colors">
          Listen
        </Link>
        <Link href="/events" className="hover:text-accent transition-colors">
          Events
        </Link>
      </div>
    </nav>
  );
}

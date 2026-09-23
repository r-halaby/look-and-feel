import Link from "next/link";

export function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-5 py-4 sm:px-10 sm:py-6 mix-blend-difference"
      style={{
        paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
        paddingRight: "max(1.25rem, env(safe-area-inset-right))",
        paddingTop: "max(1rem, env(safe-area-inset-top))",
      }}
    >
      <Link
        href="https://evenings.fm/rodeo-radio"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:block text-[11px] tracking-[0.18em] uppercase leading-tight text-white"
      >
        Tune in to FM F.M.
        <br />
        at Rodeo Radio
      </Link>
      <Link
        href="https://evenings.fm/rodeo-radio"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Look & Feel — home"
        className="sm:hidden text-[11px] tracking-[0.18em] uppercase text-white"
      >
        FM F.M.
      </Link>
      <div className="flex items-center gap-5 sm:gap-10 text-[11px] tracking-[0.18em] uppercase text-white">
        <Link
          href="/"
          className="py-2 -my-2 hover:text-accent transition-colors"
        >
          Home
        </Link>
        <Link
          href="/radio"
          className="py-2 -my-2 hover:text-accent transition-colors"
        >
          Listen
        </Link>
        <Link
          href="/events"
          className="py-2 -my-2 hover:text-accent transition-colors"
        >
          Events
        </Link>
      </div>
    </nav>
  );
}

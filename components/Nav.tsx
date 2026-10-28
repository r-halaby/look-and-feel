"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();
  if (pathname.startsWith("/episodes")) return null;

  return (
    <nav
      className="flex items-center justify-between px-5 py-4 sm:px-10 sm:py-5 border-b border-hairline"
      style={{
        paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
        paddingRight: "max(1.25rem, env(safe-area-inset-right))",
        paddingTop: "max(1rem, env(safe-area-inset-top))",
      }}
    >
      <Link href="/" className="text-[11px] tracking-[0.2em] uppercase">
        Look &amp; Feel
      </Link>
      <div className="flex items-center gap-6 sm:gap-8 text-[11px] tracking-[0.2em] uppercase text-muted">
        <Link href="/about" className="hover:text-foreground transition-colors">
          About
        </Link>
      </div>
    </nav>
  );
}

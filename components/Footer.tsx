import { TowerIcon } from "./TowerIcon";

export function Footer() {
  return (
    <footer className="mt-24 sm:mt-32 border-t hairline">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between px-5 py-8 sm:px-10 sm:py-10">
        <TowerIcon className="w-8 h-14 text-foreground" />
        <div className="text-[10px] tracking-[0.2em] uppercase text-muted sm:text-right leading-relaxed">
          Look &amp; Feel
          <br />
          Hosted by Rahmi &middot;{" "}
          <a
            href="https://www.rodeobrooklyn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Rodeo BK
          </a>{" "}
          &middot;{" "}
          <a
            href="https://fieldmeridians.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Field Meridians
          </a>
        </div>
      </div>
    </footer>
  );
}

import { Footer } from "@/components/Footer";

export const metadata = {
  title: "About — Look & Feel",
  description:
    "A study of the reciprocal relationship between sound and design, hosted by Rahmi Halaby.",
};

export default function AboutPage() {
  return (
    <div className="px-5 sm:px-10 pt-8 sm:pt-10 min-h-screen flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-16">
        <div className="max-w-lg shrink-0">
          <h1 className="text-[11px] tracking-[0.2em] uppercase text-muted mb-10">
            About
          </h1>
          <p className="text-base sm:text-lg font-light leading-relaxed mb-5">
            Look &amp; Feel is a radio show about the reciprocal relationship
            between sound and design.
          </p>
          <p className="text-sm leading-relaxed text-muted mb-12">
            Hosted by Rahmi Halaby. Airs on Rodeo Radio every third Wednesday
            at 10&nbsp;AM ET.
          </p>
          <div className="space-y-3 text-[11px] tracking-[0.2em] uppercase">
            <div>
              <a
                href="https://evenings.fm/rodeo-radio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                Rodeo Radio ↗
              </a>
            </div>
            <div>
              <a
                href="https://www.rodeobrooklyn.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                Rodeo Brooklyn ↗
              </a>
            </div>
            <div>
              <a
                href="https://fieldmeridians.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                Field Meridians ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0 ml-auto overflow-hidden shrink-0" style={{ width: 540, height: 540 }}>
          <video
            src="/video/about-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: "scale(1.05) rotate(-2deg)" }}
          />
        </div>
      </div>

      <Footer className="mt-8 sm:mt-10 border-t hairline" />
    </div>
  );
}

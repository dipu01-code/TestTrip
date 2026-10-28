import { Section } from '@/components/Section.js';
import { SectionHeading } from '@/components/SectionHeading.js';
import { Logo } from '@/components/Logo.js';

export function AboutPage() {
  return (
    <div>
      <Section className="pt-28 md:pt-32">
        <div className="max-w-3xl">
          <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-accent-ink mb-4">
            About TasteTrip
          </p>
          <h1 className="text-5xl md:text-6xl font-sans font-semibold tracking-tight text-ink leading-[1.05]">
            Travel beyond the obvious.
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted max-w-2xl leading-relaxed">
            TasteTrip is a culture-powered travel planner. We use cultural taste intelligence — the
            music, movies, food, art, and lifestyle you already love — to help you discover
            destinations, restaurants, and experiences that genuinely fit you.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent-ink mb-3">Our thesis</p>
            <p className="text-muted leading-relaxed">
              Most travel guides recommend the same ten attractions. TasteTrip starts from who you
              are instead, then builds a trip around your actual interests.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent-ink mb-3">The engine</p>
            <p className="text-muted leading-relaxed">
              Cultural taste intelligence from Qloo surfaces connections between interests and places
              that human itineraries tend to miss.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent-ink mb-3">The promise</p>
            <p className="text-muted leading-relaxed">
              A trip that feels like it was planned by someone who knows you — because it was, in
              part, informed by the culture you already respond to.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-sand/40">
        <div className="max-w-2xl mx-auto text-center">
          <Logo showWordmark className="mb-8" />
          <p className="text-muted leading-relaxed">
            Built with cultural taste intelligence. Qloo and related marks are used under license.
            Demo content is clearly labeled.
          </p>
        </div>
      </Section>
    </div>
  );
}
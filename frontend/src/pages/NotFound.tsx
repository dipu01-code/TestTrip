import { Link } from 'react-router-dom';
import { Section } from '@/components/Section.js';
import { SectionHeading } from '@/components/SectionHeading.js';
import { Button } from '@/components/Button.js';

export function NotFoundPage() {
  return (
    <Section className="min-h-[60vh] flex items-center">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent-ink mb-4">
          404 · Not found
        </p>
        <h1 className="text-5xl md:text-6xl font-sans font-semibold tracking-tight text-ink leading-[1.05]">
          This page drifted off the map.
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted max-w-xl mx-auto leading-relaxed">
          The route you were looking for doesn't exist, or it moved. Head back home and pick a destination worth your taste.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button as="link" href="/" variant="primary" size="lg">
            Back to TasteTrip
          </Button>
          <Button as="link" href="/plan" variant="secondary" size="lg">
            Plan My Trip
          </Button>
        </div>
      </div>
    </Section>
  );
}
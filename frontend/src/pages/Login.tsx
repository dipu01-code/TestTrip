import { Link } from 'react-router-dom';
import { Section } from '@/components/Section.js';
import { SectionHeading } from '@/components/SectionHeading.js';
import { Button } from '@/components/Button.js';
import { Logo } from '@/components/Logo.js';

export function LoginPage() {
  return (
    <Section className="min-h-[70vh] flex items-center">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl w-full">
        <div>
          <Logo showWordmark className="mb-8" />
          <SectionHeading
 eyebrow="Coming soon"
            title="Sign in is not live yet"
            subtitle="Guest trip planning works without an account right now. Full authentication is on the roadmap."
          />
          <p className="text-muted leading-relaxed mb-6">
            When sign-in ships, you'll be able to save trips, refine your taste profile, and pick up a
            plan across devices. For now, start a trip as a guest.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as="link" href="/plan" variant="primary" size="lg">
              Plan as guest
            </Button>
            <Button as="link" href="/" variant="ghost" size="lg">
              Back to home
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-card p-8 shadow-soft">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              // Auth is intentionally not implemented yet.
            }}
            aria-label="Sign in form (not implemented)"
          >
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
              <input
                type="email"
                disabled
                placeholder="you@example.com"
                className="w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-sm text-muted placeholder:text-muted/60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
              <input
                type="password"
                disabled
                placeholder="••••••••"
                className="w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-sm text-muted placeholder:text-muted/60"
              />
            </div>
            <Button type="submit" disabled className="w-full">
              Sign in — coming soon
            </Button>
          </form>
          <p className="mt-5 text-xs text-muted text-center">
            By continuing you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </Section>
  );
}
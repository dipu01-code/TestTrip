import { Section } from '@/components/Section.js';
import { SectionHeading } from '@/components/SectionHeading.js';
import { Button } from '@/components/Button.js';
import { DestinationCard } from '@/components/DestinationCard.js';
import { DEMO_DESTINATIONS } from '@/lib/utils.js';
import { Navbar } from '@/components/Navbar.js';
import { Footer } from '@/components/Footer.js';
import { motion } from 'motion/react';
import { fadeUp, staggerContainer, staggerChild, floaty } from '@/lib/motion.js';
import { Music, Film, UtensilsCrossed, Compass, Headphones, Brain } from 'lucide-react';

export function HomePage() {
  const interestCategories = [
    { key: 'music', label: 'Music', icon: Music, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { key: 'movies', label: 'Movies & TV', icon: Film, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { key: 'food', label: 'Food', icon: UtensilsCrossed, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { key: 'art', label: 'Art & Culture', icon: Brain, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { key: 'gaming', label: 'Gaming', icon: Compass, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { key: 'lifestyle', label: 'Lifestyle', icon: Headphones, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center pt-16 lg:pt-24 bg-hero-gradient"
        aria-labelledby="hero-title"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Copy */}
            <div className="relative z-10" {...fadeUp(0)}>
              <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-accent-ink mb-6">
                CULTURE-POWERED TRAVEL
              </p>
              <h1 id="hero-title" className="text-5xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-tight text-ink leading-[1.02] max-w-2xl">
                Your taste.
                <br />
                Your world.
                <br />
                <span className="relative">
                  Your next adventure.
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/30 -z-10" aria-hidden="true" />
                </span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted max-w-xl leading-relaxed" {...fadeUp(0.1)}>
                Discover destinations, hidden gems, and unforgettable experiences shaped by the music, movies, food, and culture you love.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4" {...fadeUp(0.2)}>
                <Button as="link" href="/plan" variant="primary" size="lg" iconRight>
                  Create My Trip
                </Button>
                <Button as="link" href="#taste-discovery" variant="ghost" size="lg">
                  Explore the Experience
                </Button>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-8 text-sm text-muted/70" {...fadeUp(0.3)}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                  <span>Powered by cultural taste intelligence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-lavender" aria-hidden="true" />
                  <span>Qloo-powered recommendations</span>
                </div>
              </div>
            </div>

            {/* Right: Visual with floating cards */}
            <div className="relative lg:ml-auto" aria-hidden="true" {...fadeUp(0.1)}>
              <div className="relative aspect-[4/3] lg:aspect-[5/4] max-w-lg lg:max-w-xl mx-auto">
                {/* Main hero image */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-lift bg-sand"
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80"
                    alt="Tokyo streets at night with neon signs and crowds"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white/90 text-lg font-medium">Tokyo, Japan</p>
                    <p className="text-white/60 text-sm mt-1">Where neon meets tradition</p>
                  </div>
                </motion.div>

                {/* Floating interest cards */}
                {interestCategories.map((cat, i) => (
                  <motion.div
                    key={cat.key}
                    variants={floaty}
                    style={{
                      top: `${12 + (i % 3) * 20}%`,
                      left: i < 3 ? `${8 + i * 10}%` : `${70 + (i - 3) * 12}%`,
                    }}
                    className="absolute z-20"
                  >
                    <div
                      className={`
                        rounded-2xl p-3 md:p-4 shadow-lift border border-line backdrop-blur-sm
                        ${cat.bg} ${cat.color}
                      `}
                    >
                      <cat.icon className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                      <span className="hidden md:inline-block ml-2 font-semibold text-sm">{cat.label}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Secondary image peeking */}
                <motion.div
                  className="absolute -bottom-8 -right-8 lg:-bottom-12 lg:-right-12 w-48 lg:w-64 aspect-square rounded-2xl overflow-hidden shadow-lift border border-line"
                  animate={{ opacity: 1, rotate: -3 }}
                  initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
                    alt="Mountain landscape"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <svg className="w-6 h-6 text-muted/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Taste Discovery Section */}
      <Section id="taste-discovery" aria-label="Taste Discovery">
        <motion.div variants={staggerContainer(0.1)}>
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="Start with what you love"
            subtitle="Pick a few artists, films, cuisines, or scenes. We map your taste to places that match."
            align="center"
          />
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
            variants={staggerContainer(0.1)}
          >
            {interestCategories.map((cat, i) => (
              <motion.article
                key={cat.key}
                variants={staggerChild}
                className="group relative rounded-2xl border border-line bg-card p-6 md:p-8 hover:border-accent/40 transition-colors"
                whileHover={{ y: -4 }}
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${cat.bg} ${cat.color}`}
                  aria-hidden="true"
                >
                  <cat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-ink mb-2">{cat.label}</h3>
                <p className="text-muted leading-relaxed mb-6">
                  {cat.key === 'music' && 'Artists, genres, and scenes that soundtrack your life'}
                  {cat.key === 'movies' && 'Films, directors, and aesthetics that move you'}
                  {cat.key === 'food' && 'Flavors, dishes, and dining rituals you crave'}
                  {cat.key === 'art' && 'Movements, creators, and spaces that inspire you'}
                  {cat.key === 'gaming' && 'Worlds, mechanics, and narratives you explore'}
                  {cat.key === 'lifestyle' && 'Rituals, communities, and daily rhythms you love'}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-accent-ink transition-colors">
                  Explore <span aria-hidden="true">→</span>
                </span>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* Featured Destinations */}
      <Section id="destinations" aria-label="Featured Destinations">
        <div className="mb-10 md:mb-14 text-center">
          <SectionHeading
            eyebrow="DISCOVER"
            title="Destinations that match your vibe"
            subtitle="Sample matches — your personal results appear after you share your taste."
            align="center"
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_DESTINATIONS.slice(0, 4).map((dest, i) => (
            <DestinationCard
              key={dest.name}
              {...dest}
              priority={i < 2}
              className="h-full"
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button as="link" href="/plan" variant="ghost" size="lg" iconRight>
            See all destinations
          </Button>
        </div>
      </Section>

      {/* How It Works Preview */}
      <Section id="how-it-works" aria-label="How It Works" className="bg-sand/40">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <SectionHeading
            eyebrow="THE PROCESS"
            title="Three steps to your trip"
            subtitle="Share your taste, get matched, then refine until it feels right."
            align="center"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: '01', title: 'Share your taste', desc: 'Pick music, movies, food, art, gaming, and lifestyle cues. Takes 2 minutes.' },
            { num: '02', title: 'Get cultural matches', desc: 'Qloo intelligence maps your taste to destinations, neighborhoods, and venues.' },
            { num: '03', title: 'Refine & go', desc: 'Swap days, adjust pace, save favorites. Export a ready-to-use itinerary.' },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              className="relative text-center p-6"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }}
            >
              <div className="mb-4 text-4xl md:text-5xl font-sans font-semibold text-ink/10">{step.num}</div>
              <h3 className="text-xl font-semibold text-ink mb-3">{step.title}</h3>
              <p className="text-muted leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="relative" aria-label="Get started" style={{ background: 'var(--hero-gradient)' }}>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-ink leading-[1.05]">
            Your next favorite place is waiting.
          </h2>
          <p className="mt-4 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Start a trip as a guest — no account needed. When you're ready, save it and pick up anywhere.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button as="link" href="/plan" variant="secondary" size="lg" iconRight>
              Plan My Trip
            </Button>
            <Button as="link" href="/about" variant="ghost" size="lg">
              Learn more
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
import { Section } from '@/components/Section.js';
import { SectionHeading } from '@/components/SectionHeading.js';
import { Button } from '@/components/Button.js';
import { TasteSelector, type Interest } from '@/components/TasteSelector.js';
import { ProgressStepper } from '@/components/ProgressStepper.js';
import { DestinationCard } from '@/components/DestinationCard.js';
import { DEMO_DESTINATIONS } from '@/lib/utils.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, CalendarDays, Users, Sliders, Sparkles } from 'lucide-react';

const PLAN_STEPS = [
  { label: 'Taste', description: 'Pick music, movies, food, art, gaming, lifestyle' },
  { label: 'Preferences', description: 'Budget, pace, dates, group size' },
  { label: 'Destination', description: 'Choose or let us suggest' },
  { label: 'Itinerary', description: 'Review and refine your day-by-day plan' },
];

const DEMO_INTERESTS: Interest[] = [
  { category: 'music', value: 'Radiohead' },
  { category: 'food', value: 'Sushi' },
  { category: 'movies', value: 'Parasite' },
  { category: 'art', value: 'Impressionism' },
];

export function PlanPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [interests, setInterests] = useState<Interest[]>(DEMO_INTERESTS);

  const handleGenerate = () => {
    // Navigate would happen here with actual API call
    console.log('Generating trip with:', interests);
  };

  return (
    <div className="min-h-screen">
      <Section className="pt-28 pb-8">
        <div className="max-w-5xl mx-auto">
          <ProgressStepper steps={PLAN_STEPS} current={currentStep} />

          {currentStep === 0 && (
            <div className="mt-12" role="region" aria-labelledby="taste-heading">
              <SectionHeading
                id="taste-heading"
                eyebrow="STEP 1 OF 4"
                title="What's your taste?"
                subtitle="Select a few things you love. The more specific, the better your matches."
              />
              <TasteSelector
                value={interests}
                onChange={setInterests}
                maxInterests={10}
                className="mt-8"
              />
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setCurrentStep(1)}
                  disabled={interests.length === 0}
                  iconRight
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="mt-12" role="region" aria-labelledby="prefs-heading">
              <SectionHeading
                id="prefs-heading"
                eyebrow="STEP 2 OF 4"
                title="Trip preferences"
                subtitle="Help us tune the itinerary to your style."
              />
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-ink">Budget</label>
                  <select className="w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                    <option value="">Any</option>
                    <option value="budget">Budget-conscious</option>
                    <option value="moderate">Moderate</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-ink">Pace</label>
                  <select className="w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                    <option value="">Balanced</option>
                    <option value="relaxed">Relaxed</option>
                    <option value="packed">Packed</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-ink">Group size</label>
                  <select className="w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                    <option value="1">Solo</option>
                    <option value="2">Couple</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5+">5 or more</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-ink">Dates</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setCurrentStep(0)}>
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(2)} iconRight>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mt-12" role="region" aria-labelledby="dest-heading">
              <SectionHeading
                id="dest-heading"
                eyebrow="STEP 3 OF 4"
                title="Pick a destination"
                subtitle="Or let us suggest one based on your taste."
              />
              <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEMO_DESTINATIONS.slice(0, 6).map((dest) => (
                  <DestinationCard
                    key={dest.name}
                    {...dest}
                    priority={false}
                  />
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(3)} iconRight>
                  Generate Itinerary
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mt-12" role="region" aria-labelledby="itinerary-heading">
              <SectionHeading
                id="itinerary-heading"
                eyebrow="STEP 4 OF 4"
                title="Your itinerary preview"
                subtitle="This is a static preview. The live generator uses Qloo intelligence."
              />
              <div className="mt-8 space-y-6">
                {[1, 2, 3].map((day) => (
                  <details key={day} className="group rounded-2xl border border-line bg-card overflow-hidden" open={day === 1}>
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                          <CalendarDays className="w-6 h-6 text-accent-ink" aria-hidden="true" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-ink">Day {day}</h4>
                          <p className="text-sm text-muted">Tokyo, Japan</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-ink group-open:rotate-180 transition-transform">
                        ▸
                      </span>
                    </summary>
                    <div className="p-5 border-t border-line space-y-4 bg-cream/30">
                      {[
                        { time: '09:00', name: 'Tsukiji Outer Market', type: 'food', desc: 'Fresh sushi breakfast at a local favorite' },
                        { time: '11:30', name: 'TeamLab Planets', type: 'experience', desc: 'Immersive digital art museum' },
                        { time: '14:00', name: 'Shinjuku Gyoen', type: 'activity', desc: 'Traditional Japanese garden' },
                        { time: '18:30', name: 'Omoide Yokocho', type: 'food', desc: 'Yakitori alley in Shinjuku' },
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-line">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-accent-ink" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-ink">{activity.name}</h5>
                              <span className="text-sm text-muted">{activity.time}</span>
                            </div>
                            <p className="text-sm text-muted mt-1">{activity.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setCurrentStep(2)}>
                  Back
                </Button>
                <Button variant="primary" onClick={handleGenerate} iconRight size="lg">
                  Save Trip
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted text-center">
                Saved trips appear on your dashboard. <Link to="/login" className="underline hover:text-ink">Sign in</Link> to access across devices.
              </p>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
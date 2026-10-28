import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/lib/utils';

export interface Interest {
  category: string;
  value: string;
}

interface TasteSelectorProps {
  value: Interest[];
  onChange: (next: Interest[]) => void;
  maxInterests?: number;
  className?: string;
}

const DEMO_INTERESTS: Record<string, string[]> = {
  music: ['Bon Iver', 'Radiohead', 'Loyle Carner', 'Jazz', 'Classical'],
  movies: ['Hereditary', 'Parasite', 'The French Dispatch', 'Scorsese', 'Indie'],
  food: ['Sushi', 'Tacos al pastor', 'Neapolitan pizza', 'Umami', 'Street food'],
  'art': ['Impressionism', 'Murals', 'Land art', 'Ceramics', 'Design'],
  gaming: ['Zelda', 'Stardew Valley', 'FromSoftware', 'RPG', 'Indie'],
  lifestyle: ['Night markets', 'Café culture', 'Photography', 'Hiking', 'Jazz bars'],
};

export function TasteSelector({
  value,
  onChange,
  maxInterests = 8,
  className,
}: TasteSelectorProps) {
  const [selected, setSelected] = useState<Interest[]>(value);

  function toggle(category: string, item: string) {
    const exists = selected.some((s) => s.category === category && s.value === item);
    let next: Interest[];
    if (exists) {
      next = selected.filter((s) => !(s.category === category && s.value === item));
    } else if (selected.length >= maxInterests) {
      return;
    } else {
      next = [...selected, { category, value: item }];
    }
    setSelected(next);
    onChange(next);
  }

  const categories = Object.keys(DEMO_INTERESTS) as (keyof typeof DEMO_INTERESTS)[];

  return (
    <div className={cn('space-y-5', className)}>
      {categories.map((category) => {
        const items = DEMO_INTERESTS[category];
        return (
          <div key={category} className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="text-base" aria-hidden>
                {CATEGORY_ICONS[category] || '✦'}
              </span>
              {CATEGORY_LABELS[category] || category}
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => {
                const isActive = selected.some(
                  (s) => s.category === category && s.value === item,
                );
                return (
                  <motion.button
                    key={item}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggle(category, item)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm font-medium border transition-all',
                      isActive
                        ? 'bg-ink text-cream border-ink'
                        : 'bg-card text-ink/80 border-line hover:border-ink/40 hover:bg-sand',
                    )}
                  >
                    {item}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="pt-2">
        <p className="text-xs text-muted">
          Selected {selected.length}/{maxInterests} interests
        </p>
      </div>
    </div>
  );
}
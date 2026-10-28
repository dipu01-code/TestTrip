import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ArrowRight, MapPin } from 'lucide-react';

export interface DestinationCardProps {
  name: string;
  country: string;
  image: string;
  description: string;
  tags: string[];
  match?: number;
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}

export function DestinationCard({
  name,
  country,
  image,
  description,
  tags,
  match,
  href = '/plan',
  className,
  size = 'md',
  priority = false,
}: DestinationCardProps) {
  const sizes = {
    sm: 'aspect-[4/3]',
    md: 'aspect-[4/3]',
    lg: 'aspect-[3/2]',
  };

  const Card = (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('group relative flex flex-col rounded-2xl overflow-hidden bg-card border border-line shadow-soft', className)}
    >
      <div className={cn('relative overflow-hidden', sizes[size])}>
        <img
          src={image}
          alt={`${name}, ${country}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream/90 backdrop-blur text-xs font-semibold text-ink">
          <MapPin className="w-3 h-3" />
          {country}
        </div>
        {match !== undefined && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-accent text-ink text-xs font-bold">
            {match}% match
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white text-xl font-sans font-semibold drop-shadow-lg">
            {name}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 md:p-5">
        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-sand text-[11px] font-medium text-ink/80"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-accent-ink transition-colors">
          Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link to={href} state={{ destination: name }} className="block">
        {Card}
      </Link>
    );
  }
  return Card;
}
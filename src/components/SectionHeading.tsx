import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 md:mb-14', align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-accent-ink mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold tracking-tight text-ink leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-muted max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
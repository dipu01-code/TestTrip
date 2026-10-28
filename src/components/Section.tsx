import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  as?: 'section' | 'div';
  id?: string;
  'aria-label'?: string;
}

export function Section({
  children,
  className,
  narrow = false,
  as: Tag = 'section',
  id,
  'aria-label': ariaLabel,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn(
        'py-16 md:py-24 lg:py-28',
        narrow ? 'px-4 md:px-6' : 'px-4 md:px-6 lg:px-8',
        className,
      )}
    >
      <div className={cn('mx-auto w-full', narrow ? 'max-w-3xl' : 'max-w-7xl')}>
        {children}
      </div>
    </Tag>
  );
}
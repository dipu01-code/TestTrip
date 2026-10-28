import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, showWordmark = true, size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-11 h-11' : 'w-8 h-8';
  const fontSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl';

  const Mark = (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', iconSize)}
      aria-hidden
    >
      <circle cx="16" cy="16" r="13.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 5 L16 11.5 M16 20.5 L16 27 M5.5 16 L11.5 16 M20.5 16 L26.5 16"
        stroke="#F5C518"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2.75" fill="currentColor" />
    </svg>
  );

  if (!showWordmark) {
    return (
      <span className={cn('inline-flex items-center text-ink', className)} aria-label="TasteTrip home">
        {Mark}
      </span>
    );
  }

  return (
    <Link
      to="/"
      className={cn('inline-flex items-center gap-2.5 text-ink', className)}
      aria-label="TasteTrip home"
    >
      {Mark}
      <span
        className={cn(
          fontSize,
          'font-sans font-semibold tracking-tight leading-none',
          'bg-[linear-gradient(180deg,#141414_0%,#141414_60%,#B8890A_100%)] bg-clip-text text-transparent',
        )}
      >
        TasteTrip
      </span>
    </Link>
  );
}
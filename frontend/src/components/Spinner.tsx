import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
      className={cn(
        'inline-block border-2 border-current border-t-transparent rounded-full',
        sizes[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-sand',
        'before:absolute before:inset-0 before:-translate-x-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        'animate-shimmer',
        className,
      )}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-line bg-card p-4 space-y-3', className)}>
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function PageSpinner({ message }: { message?: string }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-muted">
      <Spinner size="lg" className="text-accent-ink" />
      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-cream/50 p-8 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-sand flex items-center justify-center mb-4">
        <span className="text-xl">🧭</span>
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="mt-1 text-sm text-muted max-w-md mx-auto">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <span className="text-xl">⚠️</span>
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="mt-1 text-sm text-muted max-w-md mx-auto">{description}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-cream text-sm font-medium hover:bg-[#232323] transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
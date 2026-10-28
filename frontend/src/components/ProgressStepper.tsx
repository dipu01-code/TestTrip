import { cn } from '@/lib/utils';

interface Step {
  label: string;
  description?: string;
}

interface ProgressStepperProps {
  steps: Step[];
  current: number;
  className?: string;
}

export function ProgressStepper({ steps, current, className }: ProgressStepperProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center">
        {steps.map((step, i) => {
          const isDone = i < current;
          const isCurrent = i === current;
          const isFuture = i > current;
          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    'w-8 h-8 rounded-full inline-flex items-center justify-center text-sm font-semibold transition-colors',
                    isDone && 'bg-ink text-cream',
                    isCurrent && 'bg-accent text-ink ring-4 ring-accent/20',
                    isFuture && 'bg-sand text-muted',
                  )}
                >
                  {isDone ? '✓' : i + 1}
                </span>
                <span
                  className={cn(
                    'text-xs font-medium hidden sm:inline-block',
                    isCurrent ? 'text-ink' : 'text-muted',
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 rounded-full transition-colors',
                    isDone ? 'bg-ink' : 'bg-line',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
      {steps[current]?.description && (
        <p className="mt-3 text-sm text-muted text-center">
          {steps[current].description}
        </p>
      )}
    </div>
  );
}
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  as?: 'button' | 'link';
  href?: string;
  external?: boolean;
  icon?: boolean;
  iconRight?: boolean;
  children?: ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-full whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-cream hover:bg-[#232323] active:bg-black',
  secondary:
    'bg-accent text-ink hover:bg-[#E6B800] active:bg-[#D4A200] shadow-soft',
  ghost:
    'bg-transparent text-ink hover:bg-black/5 active:bg-black/10',
  danger:
    'bg-red-500 text-white hover:bg-red-600',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  as = 'button',
  href,
  external,
  icon = false,
  iconRight = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], icon && 'px-2.5', className);

  const content = (
    <span className="inline-flex items-center gap-2">
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      ) : (
        children
      )}
    </span>
  ) as ReactNode;

  if (as === 'link' && href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={classes}
      disabled={loading || props.disabled}
      {...props}
    >
      {content}
    </motion.button>
  );
}

export function ArrowButton({
  variant = 'primary',
  size = 'lg',
  children,
  ...rest
}: Omit<ButtonProps, 'iconRight'>) {
  return (
    <Button variant={variant} size={size} iconRight {...rest}>
      {children}
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
}
'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gold-500 text-charcoal-900 hover:bg-gold-400 active:bg-gold-600 shadow-md hover:shadow-glow-gold',
  secondary:
    'bg-charcoal-800 text-ivory-50 hover:bg-charcoal-700 active:bg-charcoal-900',
  outline:
    'border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-charcoal-900',
  ghost:
    'text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-50',
  dark:
    'bg-charcoal-950 text-gold-500 border border-gold-500/30 hover:border-gold-500 hover:bg-charcoal-900',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, className = '', children, href, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-body font-semibold tracking-wide uppercase rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;

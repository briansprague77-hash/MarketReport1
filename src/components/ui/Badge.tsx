interface BadgeProps {
  label: string;
  variant?: 'gold' | 'dark' | 'outline' | 'success' | 'info';
  size?: 'sm' | 'md';
}

const variantStyles: Record<string, string> = {
  gold: 'bg-gold-500/15 text-gold-500 border-gold-500/30',
  dark: 'bg-charcoal-800 text-ivory-50 border-charcoal-700',
  outline: 'bg-transparent text-charcoal-600 border-charcoal-300',
  success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
  info: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
};

export default function Badge({ label, variant = 'gold', size = 'sm' }: BadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-3 py-1 text-[11px]' : 'px-4 py-1.5 text-xs';

  return (
    <span
      className={`inline-flex items-center font-body font-semibold uppercase tracking-widest border rounded-sm ${variantStyles[variant]} ${sizeClasses}`}
    >
      {label}
    </span>
  );
}

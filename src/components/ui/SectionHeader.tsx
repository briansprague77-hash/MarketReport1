interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  variant?: 'light' | 'dark';
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  variant = 'light',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const isDark = variant === 'dark';

  return (
    <div className={`${alignClass} mb-12 md:mb-16`}>
      {eyebrow && (
        <div className="flex items-center gap-3 mb-4" style={align === 'center' ? { justifyContent: 'center' } : {}}>
          <div className="h-px w-8 bg-gold-500" />
          <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight ${
          isDark ? 'text-ivory-50' : 'text-charcoal-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg md:text-xl font-body leading-relaxed max-w-3xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${isDark ? 'text-ivory-300' : 'text-charcoal-500'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  theme?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  lead,
  theme = 'light',
  align = 'left',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const isCenter = align === 'center';

  return (
    <div className={`space-y-4 sm:space-y-6 ${isCenter ? 'text-center mx-auto' : ''} ${className}`}>
      {eyebrow && (
        <p className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-[32px] sm:text-4xl md:text-5xl lg:text-[56px] font-light leading-[1.08] tracking-[-0.02em] ${
          isDark ? 'text-cream' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`text-base sm:text-lg leading-[1.75] max-w-[62ch] font-light ${
            isCenter ? 'mx-auto' : ''
          } ${isDark ? 'text-stone/90' : 'text-stone'}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
};

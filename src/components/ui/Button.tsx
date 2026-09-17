import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'gold-outline';
  to?: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  to,
  href,
  className = '',
  children,
  icon,
  iconPosition = 'right',
  size = 'md',
  onClick,
  disabled,
  type = 'button',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-6 py-3 text-[11px] tracking-[0.2em]',
    md: 'px-8 py-4 text-xs tracking-[0.2em]',
    lg: 'px-10 py-5 text-xs tracking-[0.22em]',
  }[size];

  const baseClasses =
    'inline-flex items-center justify-center font-body uppercase font-normal rounded-none transition-all duration-400 disabled:opacity-40 disabled:pointer-events-none select-none text-center cursor-pointer min-h-[44px]';

  let variantClass = '';

  switch (variant) {
    case 'primary':
      variantClass = `btn-luxury-primary ${sizeClasses}`;
      break;
    case 'secondary':
      variantClass = `btn-luxury-secondary ${sizeClasses}`;
      break;
    case 'gold-outline':
      variantClass = `btn-luxury-gold ${sizeClasses}`;
      break;
    case 'tertiary':
      variantClass = 'link-tertiary';
      break;
  }

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-3 transition-transform duration-400">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="ml-3 transition-transform duration-400 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${variantClass} ${className}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${variantClass} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClass} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};

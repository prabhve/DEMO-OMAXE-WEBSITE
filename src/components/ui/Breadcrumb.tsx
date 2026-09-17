import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`py-4 ${className}`}>
      <ol className="flex items-center flex-wrap gap-2 text-xs text-stone tracking-wide">
        <li>
          <Link to="/" className="hover:text-gold transition-colors duration-200">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-stone/50" />
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-gold transition-colors duration-200">
                  {item.label}
                </Link>
              ) : (
                <span className="text-ink font-medium" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

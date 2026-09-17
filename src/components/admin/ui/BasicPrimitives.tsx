import React from 'react';

// ============================================================================
// BADGE
// ============================================================================
interface BadgeProps {
  variant?: 'default' | 'neutral' | 'success' | 'warning' | 'danger' | 'gold' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'sm',
  children,
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700',
    neutral: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    danger: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    gold: 'bg-amber-100/60 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700',
    info: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium rounded border whitespace-nowrap ${variantStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </span>
  );
};

// ============================================================================
// TABS
// ============================================================================
interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pill' | 'segmented';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className = '',
}) => {
  if (variant === 'segmented') {
    return (
      <div className={`inline-flex p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                isActive
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="text-[10px] px-1.5 py-0.2 bg-neutral-200 dark:bg-neutral-700 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 border-b border-neutral-200 dark:border-neutral-800 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
              isActive
                ? 'border-amber-600 text-amber-700 dark:text-amber-400 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// ============================================================================
// EMPTY STATE
// ============================================================================
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50/40 dark:bg-neutral-900/40 ${className}`}>
      {icon && (
        <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mb-3">
          {icon}
        </div>
      )}
      <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</h4>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm">{description}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md transition-colors shadow-xs"
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      )}
    </div>
  );
};

// ============================================================================
// SKELETON
// ============================================================================
export const Skeleton: React.FC<{ className?: string }> = ({ className = 'h-4 w-full' }) => (
  <div className={`bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded ${className}`} />
);

// ============================================================================
// BUTTON
// ============================================================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'outline',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-amber-600 hover:bg-amber-700 text-white font-semibold border border-transparent shadow-2xs',
    outline: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-800 dark:text-neutral-200',
    ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-2xs',
  }[variant];

  const sizeStyles = {
    xs: 'text-[11px] px-2 py-1 rounded',
    sm: 'text-xs px-3 py-1.5 rounded',
    md: 'text-xs px-4 py-2 rounded-md',
    lg: 'text-sm px-5 py-2.5 rounded-md',
  }[size];

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-1.5">
          <svg className="animate-spin h-3.5 w-3.5 text-current" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

// ============================================================================
// MODAL
// ============================================================================
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
}) => {
  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full ${sizeStyles} bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 text-lg leading-none"
            >
              &times;
            </button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

// ============================================================================
// INPUT
// ============================================================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    return (
      <div className="space-y-1 w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500/20 ${
            error
              ? 'border-rose-300 dark:border-rose-700 focus:border-rose-500'
              : 'border-neutral-200 dark:border-neutral-700 focus:border-amber-600'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-[11px] text-rose-600 dark:text-rose-400">{error}</p>}
        {helperText && !error && <p className="text-[11px] text-neutral-400">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ============================================================================
// SELECT
// ============================================================================
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: SelectOption[];
  children?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, children, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    return (
      <div className="space-y-1 w-full">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500/20 cursor-pointer ${
            error
              ? 'border-rose-300 dark:border-rose-700 focus:border-rose-500'
              : 'border-neutral-200 dark:border-neutral-700 focus:border-amber-600'
          } ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100"
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && <p className="text-[11px] text-rose-600 dark:text-rose-400">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';



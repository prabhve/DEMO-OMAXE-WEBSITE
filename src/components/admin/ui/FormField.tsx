import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormFieldProps {
  label?: string;
  error?: FieldError | string;
  helperText?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required,
  className = '',
  children,
}) => {
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {errorMessage ? (
        <p className="text-[11px] text-rose-500 font-medium">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{helperText}</p>
      ) : null}
    </div>
  );
};

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }
>(({ className = '', hasError, ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full px-3 py-2 text-sm bg-white dark:bg-neutral-900 border rounded-md text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 transition-colors ${
      hasError
        ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500'
        : 'border-neutral-300 dark:border-neutral-700 focus:ring-amber-500 focus:border-amber-500'
    } ${className}`}
    {...props}
  />
));
Input.displayName = 'Input';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }
>(({ className = '', hasError, ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full px-3 py-2 text-sm bg-white dark:bg-neutral-900 border rounded-md text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 transition-colors ${
      hasError
        ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500'
        : 'border-neutral-300 dark:border-neutral-700 focus:ring-amber-500 focus:border-amber-500'
    } ${className}`}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }
>(({ className = '', hasError, children, ...props }, ref) => (
  <select
    ref={ref}
    className={`w-full px-3 py-2 text-sm bg-white dark:bg-neutral-900 border rounded-md text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 transition-colors ${
      hasError
        ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500'
        : 'border-neutral-300 dark:border-neutral-700 focus:ring-amber-500 focus:border-amber-500'
    } ${className}`}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = 'Select';

export const Switch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
}> = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between">
    {(label || description) && (
      <div className="space-y-0.5 mr-4">
        {label && <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 block">{label}</span>}
        {description && <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">{description}</span>}
      </div>
    )}
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
        checked ? 'bg-amber-600' : 'bg-neutral-300 dark:bg-neutral-700'
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

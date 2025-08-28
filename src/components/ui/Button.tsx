import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseClass = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]';
    
    const variants = {
      primary: 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 focus:ring-purple-500 shadow-lg hover:shadow-xl',
      secondary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500',
      outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    return (
      <button
        ref={ref}
        className={cn(baseClass, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
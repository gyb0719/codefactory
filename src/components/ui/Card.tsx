import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    const baseClass = 'rounded-2xl transition-all duration-300';
    
    const variants = {
      default: 'bg-white shadow-sm border border-gray-100',
      elevated: 'bg-white shadow-lg',
      bordered: 'bg-white border-2 border-gray-200',
      glass: 'bg-white/80 backdrop-blur-sm border border-white/20'
    };

    const MotionCard = hover ? motion.div : 'div';
    const motionProps = hover ? {
      whileHover: { 
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
      },
      transition: { type: "spring", stiffness: 300, damping: 30 }
    } : {};

    return (
      <MotionCard
        ref={ref}
        className={cn(baseClass, variants[variant], className)}
        {...motionProps}
        {...props}
      >
        {children}
      </MotionCard>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 pb-6', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-bold text-gray-900', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-gray-600 mt-2', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

export { Card, CardHeader, CardContent, CardTitle, CardDescription };
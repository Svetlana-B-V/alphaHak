import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6 md:p-7',
  lg: 'p-8 md:p-10',
};

export default function Card({
  children,
  className = '',
  hoverable = false,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={`
        bg-white/95 backdrop-blur-sm
        rounded-[28px]
        border border-border
        shadow-sm
        ${paddingStyles[padding]}
        ${hoverable ? 'layered-card hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardSectionProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: CardSectionProps) {
  return (
    <h3 className={`text-lg md:text-xl font-extrabold text-text-primary tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }: CardSectionProps) {
  return <p className={`text-sm text-text-secondary mt-1.5 ${className}`}>{children}</p>;
}

export function CardContent({ children, className = '' }: CardSectionProps) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = '' }: CardSectionProps) {
  return <div className={`mt-5 pt-4 border-t border-border ${className}`}>{children}</div>;
}
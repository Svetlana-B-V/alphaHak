import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-yandex-yellow text-yandex-black hover:bg-yandex-yellow-hover active:bg-yandex-yellow-active font-semibold',
  secondary:
    'bg-yandex-black text-yandex-white hover:bg-gray-800 active:bg-gray-900 font-semibold',
  outline:
    'border-2 border-yandex-black text-yandex-black bg-transparent hover:bg-yandex-black hover:text-yandex-white font-medium',
  ghost:
    'text-yandex-text-primary bg-transparent hover:bg-yandex-gray font-medium',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-7 py-3.5 text-base rounded-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        transition-all duration-150 ease-in-out
        cursor-pointer select-none
        focus:outline-none focus:ring-2 focus:ring-yandex-yellow focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
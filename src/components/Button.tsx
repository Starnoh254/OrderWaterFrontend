import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline' | 'ghost'
}

export default function Button({
  variant = 'solid',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none'
  const variants: Record<string, string> = {
    solid: 'bg-primary text-white hover:opacity-95',
    outline:
      'border border-primary text-primary bg-transparent hover:bg-primary/10',
    ghost: 'text-primary bg-transparent hover:bg-primary/10',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  )
}

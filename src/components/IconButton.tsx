import React from 'react'

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode
}

export default function IconButton({
  icon,
  className = '',
  ...rest
}: IconButtonProps) {
  const base =
    'inline-flex items-center justify-center p-2 rounded-md focus:outline-none'
  return (
    <button
      className={`${base} text-primary hover:bg-primary/10 ${className}`.trim()}
      {...rest}
    >
      {icon}
    </button>
  )
}

import React from 'react'

type UnorederedListProps = {children: React.ReactNode, className?: string}

export function Ul({children, className}: UnorederedListProps) {
  return <ul className="my-6 ml-6 list-disc text-lessforeground">{children}</ul>
}

export function Li({children}: {children: React.ReactNode}) {
  return <li className="mt-2">{children}</li>
}
import React from 'react'

type UnorederedListProps = {children: React.ReactNode}

export function Ul({children}: UnorederedListProps) {
  return <ul className="my-6 ml-6 text-foreground list-disc">{children}</ul>
}

export function Li({children}: {children: React.ReactNode}) {
  return <li className="mt-2">{children}</li>
}
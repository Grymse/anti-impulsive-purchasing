import React from 'react'
import { cn } from '~lib/utils'

type Props = {variant?: 'h1' | 'h2' | 'h3', children: React.ReactNode, className?: string}


export default function Header({variant = 'h1', children, className}: Props) {
    switch (variant) {
        case 'h1':
        return <h1 className={cn('scroll-m-20 pt-6 text-3xl font-bold tracking-tight text-lessforeground', className)}>{children}</h1>
        case 'h2':
        return <h2 className={cn('pt-6 text-lessforeground font-heading scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0', className)}>{children}</h2>
        case 'h3':
        return <h3 className={cn('text-lg font-bold text-lessforeground', className)}>{children}</h3>
    }
}
import React from 'react'
import { cn } from '~lib/utils'

type Props = {children : React.ReactNode, className?: string, variant?: 'subtitle' | 'body'}

export default function Text({children, className, variant='body'}: Props) {
    if (variant === 'subtitle')
        return <p className={cn('text-lessmuted-foreground leading-7 text-base', className)}>{children}</p>

    return <p style={{lineHeight: '1.75rem'}} className={cn('text-lessforeground leading-7 text-base', className)}>{children}</p>
}

export function Link({children, href, className}: {children: React.ReactNode, href: string, className?: string}) {
    return <a href={
        href
    } className={
        cn('text-lessprimary cursor-pointer underline hover:opacity-80', className)
    }>{children}</a>
}
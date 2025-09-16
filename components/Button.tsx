import { cn } from '@/lib/classUtils';
import React from 'react'

type ButtonProps = {
    text: string;
    clickable: boolean;
    onClick: () => void;
}

const Button = ({ text, clickable, onClick }: ButtonProps) => {
    return (
        <button 
        onClick={() => {
            if (clickable) {
                onClick()
            }
        }}
        className={cn(
            'w-full h-fit flex justify-center items-center p-[var(--padding-small)] paragraph-large bg-card-highlight rounded-full border-[3px]',
            clickable ? 'opacity-100 border-transparent': 'opacity-10 border-foreground-second border-dashed'
        )}>
            {text}
        </button>
    )
}

export default Button
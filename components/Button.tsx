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
            'w-full h-fit flex justify-center items-center p-[var(--padding-small)] paragraph-large button-style',
            clickable ? 'opacity-100': 'opacity-10'
        )}>
            {text}
        </button>
    )
}

export default Button
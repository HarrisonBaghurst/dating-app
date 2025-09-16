import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/classUtils';

type ToggleStateProps = {
    imageOn: string;
    imageOff: string;
    onState: boolean;
    onChange: () => void;
}

const ToggleState = ({ imageOn, imageOff, onState, onChange }: ToggleStateProps) => {
    return (
        <button 
        type='button'
        onClick={onChange}
        className={cn(
            'h-full aspect-1/1 p-[var(--padding-small)] rounded-full flex items-center justify-center',
            onState? 'bg-card-highlight': 'bg-card-grey'
        )}> 
            <Image 
            src={onState? imageOn: imageOff}
            alt={`remind ${onState.toString()}`}
            width={32}
            height={32}
            />
        </button>
    ) 
}

export default ToggleState
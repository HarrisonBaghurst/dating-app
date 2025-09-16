import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';

type ToggleStateProps = {
    imageOn: string;
    imageOff: string;
    onState: boolean;
    onChange: () => void;
}

const ToggleState = ({ imageOn, imageOff, onState, onChange }: ToggleStateProps) => {
    return (
        <div 
        onClick={onChange}
        className={cn(
            'w-fit h-fit p-[var(--padding-small)] rounded-full',
            onState? 'bg-card-highlight': 'bg-card-grey'
        )}> 
            <Image 
            src={onState? imageOn: imageOff}
            alt={`remind ${onState.toString()}`}
            width={32}
            height={32}
            />
        </div>
    ) 
}

export default ToggleState
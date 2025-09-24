'use client'

import { motion } from 'framer-motion';
import React from 'react'
import Image from 'next/image'
import { useIcons } from '@/constants/icons';

type ToggleProps = {
    state: 'light' | 'dark';
    options: string[];
    onChange: () => void;
}

const Toggle = ({ state, options, onChange }: ToggleProps) => {
    const icons = useIcons();

    const usedIcons = [icons.lightMode, icons.darkMode]

    return (
        <div className='flex gap-[var(--gap-medium)]'>
            {options.map((option , i) => {
                const optionState = option.split(' ')[0].toLowerCase();

                return (
                    <motion.div
                    key={i}
                    whileHover={! (state === optionState) ? { borderColor: "var(--card-highlight)" } : {}}
                    transition={{ duration: 0.2 }}
                    className={'relative p-[var(--padding-small)] rounded-[var(--rounding-small)] flex justify-center cursor-pointer border-[3px] border-transparent'}
                    onClick={() => {
                        if (state !== optionState) {
                            onChange()
                        }
                    }}
                    >
                        {state === optionState && (
                            <motion.div 
                            layoutId='toggle'
                            className='absolute inset-0 bg-card-highlight rounded-[var(--rounding-small)]'
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                            }}
                            />
                        )}
                            <div className='relative z-10 flex gap-[var(--gap-small)] items-center'>
                            <Image 
                            src={usedIcons[i]}
                            alt='event type image'
                            width={0}
                            height={0}
                            className='w-[var(--icon-large)] h-[var(--icon-large)]'
                            />
                            <div className='hidden 2xl:block'>
                                {option}
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

export default Toggle
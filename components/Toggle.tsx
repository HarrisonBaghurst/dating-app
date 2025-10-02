'use client'

import { motion } from 'framer-motion';
import React from 'react'
import Image from 'next/image'

type ToggleProps = {
    keyText: string;
    state: string;
    options: string[];
    icons: string[];
    onChange: () => void;
}

const Toggle = ({ keyText, state, options, icons, onChange }: ToggleProps) => {

    return (
        <div className='flex gap-[var(--gap-medium)] paragraph-large text-foreground-light'>
            {options.map((option , i) => {
                const optionState = option.split(' ')[0].toLowerCase();

                return (
                    <motion.div
                    key={i}
                    whileHover={! (state === optionState) ? { borderColor: "var(--card-highlight)" } : {}}
                    transition={{ duration: 0.2 }}
                    className={'relative py-[var(--padding-small)] px-[calc(var(--padding-small)*1.5)] rounded-full flex justify-center cursor-pointer border-[1px] border-card-grey'}
                    onClick={() => {
                        if (state !== optionState) {
                            onChange()
                        }
                    }}
                    >
                        {state === optionState && (
                            <motion.div 
                            layoutId={keyText}
                            className='absolute inset-0 bg-card-highlight rounded-full'
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                            }}
                            />
                        )}
                            <div className='relative z-10 flex gap-[var(--gap-small)] items-center'>
                            <Image 
                            src={icons[i]}
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
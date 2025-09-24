'use client'

import Toggle from '@/components/Toggle'
import { useTheme } from '@/providers/IconProvider';
import React from 'react'

const page = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <section className='bg-background-light w-full min-h-screen p-[var(--padding-large)] paragraph-large flex flex-col gap-[var(--gap-large)]'>
            <h1 className='font-enorm title-large'>Appearance</h1>
            <Toggle 
            state={theme}
            options={['Light Mode', 'Dark Mode']}
            onChange={() => {toggleTheme()}}
            />
        </section>
    )
}

export default page
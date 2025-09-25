'use client'

import Toggle from '@/components/Toggle'
import { useTheme } from '@/providers/IconProvider';
import React from 'react'

const Page = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <section className='bg-background-light w-full min-h-screen p-[var(--padding-large)] paragraph-large flex flex-col gap-[var(--gap-large)]'>
            <h1 className='font-enorm title-large'>Appearance</h1>
            <div className='flex gap-[calc(var(--gap-large)*2)] items-center'>
                <p className='title-small font-enorm'>Theme</p>
                <Toggle 
                state={theme}
                options={['Light Mode', 'Dark Mode']}
                onChange={() => {toggleTheme()}}
                />
            </div>
        </section>
    )
}

export default Page
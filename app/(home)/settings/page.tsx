'use client'

import EventTypeSorter from '@/components/EventTypeSorter';
import Toggle from '@/components/Toggle'
import { useIcons } from '@/constants/icons';
import { useSettings } from '@/providers/SettingsProvider';
import React from 'react'

const Page = () => {
    const { theme, toggleTheme, inputTitles, toggleInputTitles } = useSettings();
    const icons = useIcons();

    return (
        <section className='bg-background-light w-full min-h-screen p-[var(--padding-large)] paragraph-large flex flex-col gap-[var(--gap-large)]'>
            <div className='flex flex-col gap-[var(--gap-medium)] w-full 2xl:w-1/2 p-[var(--padding-medium)] card-style'>
                <h1 className='font-enorm title-small'>Appearance</h1>
                <div className='flex flex-col gap-[var(--gap-small)]'>
                    <div className='flex justify-between items-center'>
                        <p className='paragraph-large text-foreground-second'>Theme</p>
                        <Toggle 
                        keyText={'theme'}
                        state={theme}
                        options={['Light Mode', 'Dark Mode']}
                        icons={[icons.lightMode, icons.darkMode]}
                        onChange={() => {toggleTheme()}}
                        />
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='paragraph-large text-foreground-second'>Input field titles</p>
                        <Toggle 
                        keyText={'inputTitles'}
                        state={inputTitles}
                        options={['Show Titles', 'Hide Titles']}
                        icons={[icons.eye, icons.eyeClosed]}
                        onChange={() => {toggleInputTitles()}}
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-[var(--gap-medium)] w-full 2xl:w-1/2 p-[var(--padding-medium)] card-style'>
                <h1 className='font-enorm title-small'>Events</h1>
                <div className='flex flex-col gap-[var(--gap-large)]'>
                    <div className='flex flex-col gap-[var(--gap-medium)]'>
                        <p className='paragraph-large text-foreground-second'>Event type priority</p>
                        <EventTypeSorter />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page
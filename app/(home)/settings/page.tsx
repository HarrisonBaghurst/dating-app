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
            <h1 className='font-enorm title-large'>Appearance</h1>
            <div className='flex flex-col gap-[var(--gap-small)] w-full 2xl:w-1/2'>
                <div className='flex justify-between items-center'>
                    <p className='title-small'>Theme</p>
                    <Toggle 
                    keyText={'theme'}
                    state={theme}
                    options={['Light Mode', 'Dark Mode']}
                    icons={[icons.lightMode, icons.darkMode]}
                    onChange={() => {toggleTheme()}}
                    />
                </div>
                <div className='flex justify-between items-center'>
                    <p className='title-small'>Input field titles</p>
                    <Toggle 
                    keyText={'inputTitles'}
                    state={inputTitles}
                    options={['Show Titles', 'Hide Titles']}
                    icons={[icons.eye, icons.eyeClosed]}
                    onChange={() => {toggleInputTitles()}}
                    />
                </div>
            </div>
                <h1 className='font-enorm title-large'>Events</h1>
                <div className='flex flex-col gap-[var(--gap-large)] w-full 2xl:w-1/2'>
                    <div className='flex flex-col gap-[var(--gap-medium)]'>
                        <p className='title-small'>Event type priority</p>
                        <EventTypeSorter />
                    </div>
                </div>
        </section>
    )
}

export default Page
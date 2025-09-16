'use client'

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import DatePicker from './DatePicker';
import ToggleState from './ToggleState';
import Button from './Button';

type CreateEventProps = {
    defaultDate?: Date | null;
}

const CreateEvent = ({ defaultDate }: CreateEventProps) => {
    const eventTypes = ['Deadline', 'Reminder', 'Event', 'All Day'] as const;

    // storing input information
    const [selected, setSelected] = useState<'Deadline' | 'Reminder' | 'Event' | 'All Day'>('Deadline');
    const [title, setTitle] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<string>('00:00');
    const [endTime, setEndTime] = useState<string>('00:00');
    const [extraInfo, setExtraInfo] = useState<string>('');
    const [remind, setRemind] = useState(false);

    // can click continue button
    const [clickable, setClickable] = useState(false);

    useEffect(() => {
        if (
            title && date && (
                (selected === 'Deadline' && startTime !== '00:00') || 
                (selected === 'Reminder' && startTime !== '00:00') ||
                (selected === 'Event' && startTime !== '00:00' && endTime !== '00:00') ||
                (selected === 'All Day')
            )
        ) {
            setClickable(true);
            return;
        }
        setClickable(false);
    }, [selected, title, date, startTime, endTime]);

    return (
        <div className='h-full w-full bg-background-light rounded-[var(--rounding-large)] p-[var(--padding-large)] flex flex-col gap-[var(--gap-medium)]'>
            <h1 className='title-large font-enorm'>
                New Event
            </h1>
            <div className='grid grid-cols-4 gap-[var(--gap-large)] paragraph-large text-foreground-main'>
                {eventTypes.map((eventType, i) => (
                    <motion.div
                    key={i}
                    whileHover={! (selected === eventType) ? { borderColor: "var(--card-highlight)" } : {}}
                    transition={{ duration: 0.2 }}
                    className={'relative p-[var(--padding-small)] rounded-[var(--rounding-small)] flex justify-center cursor-pointer border-[3px] border-transparent'}
                    onClick={() => setSelected(eventType)}
                    >
                        {selected === eventType && (
                            <motion.div 
                            layoutId='highlight'
                            className='absolute inset-0 bg-card-highlight rounded-[var(--rounding-small)]'
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                            }}
                            />
                        )}
                        <span className='relative z-10'>
                            {eventType}
                        </span>
                    </motion.div>
                ))}
            </div>
            <Input 
            type='text'
            placeholder='Event title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <DatePicker 
            defaultDate={defaultDate}
            onChange={(newDate) => setDate(newDate)}
            />
            {selected !== 'All Day' && (
                <div className='flex gap-[var(--gap-medium)]'>
                    <Input
                    type='time'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    />
                    {selected === 'Event' && (
                        <Input
                        type='time'
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        />
                    )}
                </div>
            )}
            <Input 
            type='text'
            placeholder='Extra information'
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            />
            <div className='flex gap-[var(--gap-medium)] items-center'>
                <ToggleState 
                imageOn={'/icons/bell-ringing.svg'}
                imageOff={'/icons/bell-off.svg'}
                onState={remind}
                onChange={() => setRemind(!remind)}
                />
                <Button 
                text='Create New Event'
                clickable={clickable}
                onClick={() => {}}
                />
            </div>
        </div>
    )
}

export default CreateEvent
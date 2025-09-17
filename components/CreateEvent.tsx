'use client'

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import DatePicker from './DatePicker';
import ToggleState from './ToggleState';
import Button from './Button';
import { useModal } from '@/providers/ModalProvider';
import { useRefreshEventsContext } from '@/providers/RefreshEventsProvider';

type CreateEventProps = {
    defaultDate?: Date | null;
}

const CreateEvent = ({ defaultDate }: CreateEventProps) => {
    const { refresh } = useRefreshEventsContext();
    const { closeModal } = useModal();
    const eventTypes = ['Deadline', 'Reminder', 'Event', 'All Day'] as const;

    // storing input information
    const [selected, setSelected] = useState<'Deadline' | 'Reminder' | 'Event' | 'All Day'>('Deadline');
    const [title, setTitle] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<string>('00:00');
    const [endTime, setEndTime] = useState<string>('00:00');
    const [extraInfo, setExtraInfo] = useState<string>('');
    const [repeat, setRepeat] = useState<string>('1');
    const [remind, setRemind] = useState(false);

    // can click continue button
    const [clickable, setClickable] = useState(false);

    useEffect(() => {
        if (
            title && date && (
                (selected === 'Deadline' && startTime !== '00:00') || 
                (selected === 'Reminder' && startTime !== '00:00') ||
                (selected === 'Event' && startTime !== '00:00' && endTime !== '00:00' && location !== '') ||
                (selected === 'All Day')
            )
        ) {
            setClickable(true);
            return;
        }
        setClickable(false);
    }, [selected, title, date, startTime, endTime]);

    const createEvent = async () => {
        if (!date) return;

        const numRepeats = selected === 'Event' ? Math.max(1, parseInt(repeat || '1', 10) || 1) : 1;

        try {
            for (let i = 0; i < numRepeats; i++) {
                const newDate = new Date(date.getTime());
                newDate.setDate(newDate.getDate() + i * 7);

                const y = newDate.getFullYear();
                const m = String(newDate.getMonth() + 1).padStart(2, '0');
                const d = String(newDate.getDate()).padStart(2, '0');
                const formattedDate = `${y}-${m}-${d}`;

                // build payload - remove undefined fields
                const payload: Record<string, any> = {
                    title,
                    date: formattedDate,
                    location,
                    startTime,
                    endTime,
                    extraInfo,
                    remind,
                    eventType: selected.toLowerCase(),
                };

                const res = await fetch('/api/events/post', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    const text = await res.text().catch(() => null);
                    throw new Error(`Failed to create event #${i + 1}: ${res.status} ${res.statusText} ${text ?? ''}`);
                }
            }

            closeModal();
            refresh();
        } catch (err) {
            console.error(err);
            alert('Error creating events: ' + (err instanceof Error ? err.message : 'unknown'));
        }
    }

    return (
        <div className='h-fit w-full bg-background-light rounded-[var(--rounding-large)] p-[var(--padding-large)] flex flex-col gap-[var(--gap-large)]'>
            {/* title */}
            <div className='flex flex-col gap-[var(--gap-medium)]'>
                <h1 className='title-large font-enorm'>
                    New Calendar Entry
                </h1>
                {/* type of event selector */}
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
            </div>
            <div className='flex flex-col gap-[var(--gap-small)]'>
                {/* title of event input field */}
                <Input 
                type='text'
                placeholder='Event title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                {/* loaction of event input field */}
                {selected === 'Event' && (
                    <Input 
                    type='text'
                    placeholder='Location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />
                )}
                {/* date of event selector */}
                <DatePicker 
                defaultDate={defaultDate}
                onChange={(newDate) => setDate(newDate)}
                />
                {/* time of event selector - conditional render based on type of event */}
                {selected !== 'All Day' && (
                    <div className='flex gap-[var(--gap-small)]'>
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
                {/* extra information input field */}
                <Input 
                type='text'
                placeholder='Extra information'
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
                />
                {/* repeat number */}
                {selected === 'Event' && (
                    <Input
                    type='number'
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                    />
                )}
            </div>
            <div className='flex gap-[var(--gap-medium)] items-center'>
                {/* reminder toggle */}
                <ToggleState 
                imageOn={'/icons/bell-ringing.svg'}
                imageOff={'/icons/bell-off.svg'}
                onState={remind}
                onChange={() => setRemind(!remind)}
                />
                {/* final create button */}
                <Button 
                text='Create New Calendar Entry'
                clickable={clickable}
                onClick={() => createEvent()}
                />
            </div>
        </div>
    )
}

export default CreateEvent
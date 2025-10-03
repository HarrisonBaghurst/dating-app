'use client'

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import DatePicker from './DatePicker';
import Button from './Button';
import { useModal } from '@/providers/ModalProvider';
import { useRefreshEventsContext } from '@/providers/RefreshEventsProvider';
import { useIcons } from '@/constants/icons';
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type CreateEventProps = {
    defaultDate?: Date | null;
}

type EventPayload = {
  title: string;
  date: string;
  location: string;
  cost: string;
  startTime: string;
  endTime: string;
  extraInfo: string;
  eventType: 'deadline' | 'reminder' | 'event' | 'all day' | 'birthday' | 'bill';
};

const CreateEvent = ({ defaultDate }: CreateEventProps) => {
    const icons = useIcons();

    const { refresh } = useRefreshEventsContext();
    const { closeModal } = useModal();
    const eventTypes = [['Deadline', icons.deadline], ['Reminder', icons.reminder], ['Event', icons.event], ['All Day', icons.allDay], ['Birthday', icons.birthday], ['Bill', icons.bill]] as const;
    const [clicked, setClicked] = useState(false);

    // storing input information
    const [selected, setSelected] = useState<'Deadline' | 'Reminder' | 'Event' | 'All Day' | 'Birthday' | 'Bill'>('Deadline');
    const [title, setTitle] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [cost, setCost] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<string>('00:00');
    const [endTime, setEndTime] = useState<string>('00:00');
    const [extraInfo, setExtraInfo] = useState<string>('');
    const [repeat, setRepeat] = useState<string>('1');

    // can click continue button
    const [clickable, setClickable] = useState(false);

    useEffect(() => {
        if (
            title && date && (
                (selected === 'Deadline' && startTime !== '00:00') || 
                (selected === 'Reminder' && startTime !== '00:00') ||
                (selected === 'Event' && startTime !== '00:00' && endTime !== '00:00' && location !== '') ||
                (selected === 'All Day') ||
                (selected === 'Birthday') || 
                (selected === 'Bill' && cost !== '')
            )
        ) {
            setClickable(true);
            return;
        }
        setClickable(false);
    }, [selected, title, date, startTime, endTime, clicked, cost]);

    const createEvent = async () => {
        if (!date) return;

        setClicked(true);

        const numRepeats = selected === 'Event' ? Math.max(1, parseInt(repeat || '1', 10) || 1) : 1;

        try {
            for (let i = 0; i < numRepeats; i++) {
                const newDate = new Date(date.getTime());
                newDate.setDate(newDate.getDate() + i * 7);

                const y = newDate.getFullYear();
                const m = String(newDate.getMonth() + 1).padStart(2, '0');
                const d = String(newDate.getDate()).padStart(2, '0');
                const formattedDate = `${y}-${m}-${d}`;

                const payload: EventPayload = {
                    title,
                    date: formattedDate,
                    location,
                    cost,
                    startTime,
                    endTime,
                    extraInfo,
                    eventType: selected.toLowerCase() as EventPayload['eventType'],
                };

                const res = await fetch('/api/events/post', {
                    credentials: 'include',
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
            setClicked(false);
            resetInputs();
        } catch (err) {
            console.error(err);
            alert('Error creating events: ' + (err instanceof Error ? err.message : 'unknown'));
        }
    }

    const resetInputs = () => {
        setTitle('');
        setLocation('');
        setStartTime('00:00');
        setEndTime('00:00');
        setExtraInfo('');
        setRepeat('1');
    }

    return (
        <div className='h-fit w-full bg-card-grey rounded-[var(--rounding-large)] p-[var(--padding-medium)] flex flex-col gap-[var(--gap-large)] border-[1px] border-card-highlight'>
            {/* title */}
            <div className='flex flex-col gap-[var(--gap-medium)]'>
                <h1 className='title-small font-enorm'>
                    Create New Entry
                </h1>
                {/* type of event selector */}
                <Select
                value={selected}
                onValueChange={(value) =>
                    setSelected(value as 'Deadline' | 'Reminder' | 'Event' | 'All Day' | 'Birthday')
                }>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Event type"/>
                    </SelectTrigger>
                    <SelectContent>
                        {eventTypes.map((eventType, i) => (
                            <SelectItem 
                            key={i}
                            value={eventType[0]}
                            >
                                <div className='flex gap-[var(--gap-medium)] items-center'>
                                    <Image 
                                    src={eventType[1]}
                                    alt='event image'
                                    width={0}
                                    height={0}
                                    className='w-[var(--icon-large)] h-[var(--icon-large)]'
                                    />
                                    {eventType[0]}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='flex flex-col gap-[var(--gap-small)]'>
                {/* title of event input field */}
                <Input 
                type='text'
                title='Title'
                placeholder='Event title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                {/* loaction of event input field */}
                {selected === 'Event' && (
                    <Input 
                    type='text'
                    title='Location'
                    placeholder='Location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />
                )}
                {/* cost of event input field */}
                {selected === 'Bill' && (
                    <Input 
                    type='text'
                    title='Cost'
                    placeholder='Cost'
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    />
                )}
                {/* date of event selector */}
                <DatePicker 
                defaultDate={defaultDate}
                onChange={(newDate) => setDate(newDate)}
                />
                {/* time of event selector - conditional render based on type of event */}
                {selected !== 'All Day' && selected !== 'Birthday' && selected !== 'Bill' && (
                    <div className='flex gap-[var(--gap-small)]'>
                        <Input
                        type='time'
                        title='Begins at'
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        />
                        {selected === 'Event' && (
                            <Input
                            type='time'
                            title='Ends at'
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            />
                        )}
                    </div>
                )}
                {/* extra information input field */}
                <Input 
                type='text'
                title='Extra info'
                placeholder='Extra information'
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
                />
                {/* repeat number */}
                {selected === 'Event' && (
                    <Input
                    type='number'
                    title='Repeat for # weeks'
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                    />
                )}
            </div>
            {/* final create button */}
            <Button 
            text='Create New Calendar Entry'
            clickable={clickable && !clicked}
            onClick={() => createEvent()}
            />
        </div>
    )
}

export default CreateEvent
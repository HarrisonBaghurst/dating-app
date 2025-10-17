'use client'

import { cn } from '@/lib/classUtils';
import React, { useEffect, useState } from 'react'
import { CalendarEvent, EventType } from '@/types/event';
import { getOrdinal } from '@/lib/dateUtils';
import { weekDays } from '@/constants/CalendarInfo';
import { useIcons } from '@/constants/icons';
import { useSettings } from '@/providers/SettingsProvider';

type CalendarCardProps = {
    date: number;
    month: number;
    year: number;
    day: number;
    isToday: boolean;
    events?: CalendarEvent[]
    onSelect?: (date: number, evenst: CalendarEvent[]) => void;
}

const CalendarCard = ({ date, month, year, day, isToday, events, onSelect }: CalendarCardProps) => {
    const icons = useIcons();
    
    const { eventTypeOrder, updateEventTypeOrder } = useSettings();

    const [sortedEvents, setSortedEvents] = useState<CalendarEvent[]>([]);

    const initialEvents: EventType[] = [
        { id: 'deadline', icon: icons.deadline },
        { id: 'reminder', icon: icons.reminder },
        { id: 'event', icon: icons.event },
        { id: 'all day', icon: icons.allDay},
        { id: 'birthday', icon: icons.birthday},
        { id: 'bill', icon: icons.bill},
    ]
    
    useEffect(() => {
        if (!eventTypeOrder) {
            updateEventTypeOrder(initialEvents);
        }
    }, [eventTypeOrder])

    useEffect(() => {
        if (!events || !eventTypeOrder) return; 

        const sorted = [...events].sort((a, b) => {
            const indexA = eventTypeOrder.findIndex(et => et.id === a.type);
            const indexB = eventTypeOrder.findIndex(et => et.id === b.type);
            return indexA - indexB;
        })

        setSortedEvents(sorted)

    }, [events, eventTypeOrder])

    if (!eventTypeOrder) return null;

    const getEventColour = (type: string) => {
		switch (type) {
			case 'deadline': return 'var(--event-pink)'
            case 'reminder': return 'var(--event-yellow)'
            case 'event': return 'var(--event-blue)'
            case 'birthday': return 'var(--event-orange)'
            case 'bill': return 'var(--event-green)'
            default: return 'var(--event-purple)'
		}
	}

    return (
        <div
        className={cn(
            'dark-card-style p-[var(--padding-small)] flex flex-col gap-[var(--gap-small)] cursor-pointer aspect-square',
            isToday ? 'border-[3px] border-card-highlight' : 'border-0',
        )}
        onClick={() => {
            if (onSelect && events) onSelect(date, events);
        }}
        >
            <div className='flex flex-row-reverse justify-end 2xl:justify-start 2xl:flex-row gap-[var(--gap-small)] items-center'>
                <p className='flex items-baseline text-foreground-main font-enorm'>
                    <span className='paragraph-large'>{date}</span>
                    <span className='paragraph-small'>{getOrdinal(date)}</span>
                </p>
                <p className='block 2xl:hidden paragraph-large'>
                    {weekDays[day].slice(0,3)}
                </p>
            </div>
            {events !== undefined ? (
                <div className='flex flex-wrap gap-[var(--gap-xsmall)]'>
                    {sortedEvents.map((event, i) => (
                        <div 
                        key={i} 
                        className='w-[calc(var(--icon-small)/2)] h-[calc(var(--icon-small)/2)] rounded-full'
                        style={{ backgroundColor: getEventColour(event.type) }}
                        />
                    ))}
                </div>
            ): (
                <div className='flex flex-wrap gap-[var(--gap-xsmall)]'>
                    {[...Array(3)].map((_, i) => (
                        <div 
                        key={i} 
                        className='w-[calc(var(--icon-small)/2)] h-[calc(var(--icon-small)/2)] rounded-full bg-white opacity-15'
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CalendarCard
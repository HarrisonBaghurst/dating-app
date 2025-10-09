'use client'

import { cn } from '@/lib/classUtils';
import React, { useEffect, useMemo } from 'react'
import { CalendarEvent, EventType } from '@/types/event';
import { getOrdinal } from '@/lib/dateUtils';
import { useModal } from '@/providers/ModalProvider';
import EventsList from './EventsList';
import Image from 'next/image';
import { weekDays } from '@/constants/CalendarInfo';
import { useIcons } from '@/constants/icons';
import { useSettings } from '@/providers/SettingsProvider';

type CalendarCardProps = {
    date: number;
    month: number;
    year: number;
    day: number;
    isToday: boolean;
    events: CalendarEvent[]
}

const CalendarCard = ({ date, month, year, day, isToday, events }: CalendarCardProps) => {
    const icons = useIcons();
    
    const { eventTypeOrder, updateEventTypeOrder } = useSettings();
    const { openModal } = useModal();

    const maxVisible = 5;

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
    }, [eventTypeOrder, updateEventTypeOrder])


    if (!eventTypeOrder) return null;

    const sortEvents = ((events: CalendarEvent[]) => {

        return [...events].sort((a, b) => {
            const typeA = eventTypeOrder.findIndex((i) => i.id === a.type);
            const typeB = eventTypeOrder.findIndex((i) => i.id === b.type);

            if (typeA !== typeB) {
                return typeA - typeB;
            }

            // Compare by start_time if both have it
            if (a.start_time && b.start_time) {
                return a.start_time.localeCompare(b.start_time);
            }

            return 0;
        });
    });

    const sortedEvents = sortEvents(events);

    const getEventImage = (type: string) => {
        switch (type) {
            case 'deadline': return icons.deadline
            case 'reminder': return icons.reminder
            case 'event': return icons.event
            case 'birthday': return icons.birthday
            case 'bill': return icons.bill
            default: return icons.allDay
        }
    }

    return (
        <div
        className={cn(
            'card-style p-[var(--padding-small)] flex flex-col gap-[var(--gap-small)] cursor-pointer',
            isToday ? 'bg-card-highlight' : 'bg-card-grey',
            'h-[18vh] 2xl:h-[10vw]'
        )}
        onClick={() => {
            openModal(
                <EventsList 
                date={date}
                month={month}
                year={year}
                events={events}
                />
            )
        }}
        >
            <div className='flex flex-row-reverse justify-end 2xl:justify-start 2xl:flex-row gap-[var(--gap-small)] items-center'>
                <p className='flex items-baseline text-foreground-main'>
                    <span className='paragraph-large'>{date}</span>
                    <span className='paragraph-small'>{getOrdinal(date)}</span>
                </p>
                <p className='block 2xl:hidden paragraph-large'>
                    {weekDays[day].slice(0,3)}
                </p>
            </div>
            <div className='paragraph-small text-foreground-second'>
                {sortedEvents.slice(0, maxVisible - (sortedEvents.length > maxVisible ? 1 : 0)).map((event, i) => (
                    <div 
                    key={i}
                    className='flex items-center gap-[var(--gap-xsmall)]'
                    >
                        <Image 
                        src={getEventImage(event.type)}
                        alt='event icon'
                        width={0}
                        height={0}
                        className='w-[var(--icon-small)] h-[var(--icon-small)]'
                        />
                        {event.title}
                    </div>
                ))}
                {sortedEvents.length > maxVisible && (
                    <div>+{sortedEvents.length - (maxVisible - 1)} more</div>
                )}
            </div>
        </div>
    )
}

export default CalendarCard
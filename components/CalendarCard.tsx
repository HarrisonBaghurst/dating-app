'use client'

import { cn } from '@/lib/classUtils';
import React, { useMemo } from 'react'
import { CalendarEvent } from '@/types/event';
import { getOrdinal } from '@/lib/dateUtils';
import { useModal } from '@/providers/ModalProvider';
import EventsList from './EventsList';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { weekDays } from '@/constants/CalendarInfo';
import { useIcons } from '@/constants/icons';

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
    
    const { openModal } = useModal();

    const maxVisible = 5;

    const sortedEvents = useMemo(() => {
        const typeOrder: Record<string, number> = {
            deadline: 0,
            reminder: 1,
            event: 2,
            'all day': 3,
        };

        return [...events].sort((a, b) => {
            const typeA = typeOrder[a.type] ?? 99;
            const typeB = typeOrder[b.type] ?? 99;

            if (typeA !== typeB) {
                return typeA - typeB;
            }

            // Compare by start_time if both have it
            if (a.start_time && b.start_time) {
                return a.start_time.localeCompare(b.start_time);
            }

            return 0;
        });
    }, [events]);

    const getEventImage = (type: string) => {
        switch (type) {
            case 'deadline': return icons.deadline
            case 'reminder': return icons.reminder
            case 'event': return icons.event
            default: return icons.allDay
        }
    }

    return (
        <motion.div
        whileHover={{
            borderColor: "var(--card-highlight)",
        }}
        transition={{ duration: 0.2 }}
        className={cn(
            'p-[var(--padding-small)] rounded-[var(--rounding-small)] flex flex-col gap-[var(--gap-small)] cursor-pointer',
            'border-[3px] border-transparent',
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
        </motion.div>
    )
}

export default CalendarCard
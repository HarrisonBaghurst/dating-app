'use client'

import { cn } from '@/lib/utils';
import React from 'react'
import { CalendarEvent } from '@/types/event';
import { getOrdinal } from '@/lib/dateUtils';
import { useModal } from '@/providers/ModalProvider';
import EventsList from './EventsList';
import { motion } from 'framer-motion';

type CalendarCardProps = {
    date: number;
    month: number;
    year: number;
    isToday: boolean;
    events: CalendarEvent[]
}

const CalendarCard = ({ date, month, year, isToday, events }: CalendarCardProps) => {
    const { openModal } = useModal();

    return (
        <motion.div
        whileHover={{
            scale: 1.04,
            borderColor: "var(--card-highlight)",
        }}
        transition={{ duration: 0.2 }}
        className={cn(
            'p-[var(--padding-small)] rounded-[var(--rounding-small)] h-[10vw] flex flex-col gap-[var(--gap-small)] cursor-pointer',
            'border-[3px] border-transparent',
            isToday ? 'bg-card-highlight' : 'bg-card-grey'
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
            <p className='flex items-baseline text-foreground-main'>
                <span className='paragraph-large'>{date}</span>
                <span className='paragraph-small'>{getOrdinal(date)}</span>
            </p>
            <div className='paragraph-small text-foreground-second'>
                {events?.map((event, i) => (
                <div key={i}>{event.title}</div>
                ))}
            </div>
        </motion.div>
    )
}

export default CalendarCard
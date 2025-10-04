'use client'

import React, { useEffect, useState } from 'react'
import CalendarCard from './CalendarCard'
import Loader from './Loader';
import type { CalendarEvent } from '@/types/event'
import { useRefreshEventsContext } from '@/providers/RefreshEventsProvider';
import { weekDays } from '@/constants/CalendarInfo';

type CalendarProps = {
    month: number;
    year: number;
}

const Calendar = ({ month, year }: CalendarProps) => {
    const { trigger } = useRefreshEventsContext();
    const [events, setEvents] = useState<CalendarEvent[] | null>(null);

    // fetch events for month
    useEffect(() => {
        setEvents(null);
        const fetchEvents = async () => {
            try {
                const res = await fetch(`/api/events/get`, {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ month, year })
                });
                if (!res.ok) {
                    console.error('Failed to fetch events');
                    setEvents([]);
                }
                const data = await res.json();
                setEvents(data.events ?? []);
            } catch (err) {
                console.error(err);
                setEvents([]);
            }
        }
        fetchEvents();
    }, [month, year, trigger])

    // don't show calendar until events are loaded
    if (events === null) return <Loader />;

    // days setup for visuals of calendar
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    firstDayOfMonth = (firstDayOfMonth + 6) % 7;
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
        <div key={`blank-${i}`} className='hidden 2xl:block'/>
    ));

    // find current date to compare to current month and year for date highlight
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    // create list of calendar cards
    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const dayNum = i + 1;
        const isToday = dayNum === todayDate && month === todayMonth && year === todayYear;
        
        const dayEvents = events.filter(event => {
            const [y, m, d] = event.date.split('-').map(Number);
            return d === dayNum && (m - 1) === month && y === year;
        });


        return (
            <CalendarCard 
            key={dayNum}
            date={dayNum}
            month={month}
            year={year}
            day={(i + firstDayOfMonth) % 7}
            isToday={isToday}
            events={dayEvents}
            />
        );
    });

    return (
        <div className='flex flex-col gap-[var(--gap-large)]'>
            <div className='flex flex-col gap-[var(--gap-small)]'>
                <div className='hidden 2xl:grid grid-cols-7 gap-[var(--gap-small)]'>
                    {weekDays.map((day, i) => (
                        <div 
                        key={i}
                        className='w-full p-[var(--padding-small)] flex justify-center paragraph-large bg-background-dark rounded-[var(--rounding-small)]'
                        >
                            {day}
                        </div>
                    ))} 
                </div>
                <div className='
                grid gap-[var(--gap-small)]
                grid-cols-2
                2xl:grid-cols-7
                '>
                    {blanks}
                    {days}
                </div>
            </div>
        </div>
    )
}

export default Calendar
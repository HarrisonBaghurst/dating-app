'use client'

import React, { useEffect, useState } from 'react'
import CalendarCard from './CalendarCard'
import Loader from './Loader';

type CalendarProps = {
    month: number;
    year: number;
}

type Event = {
    id: number;
    created_at: string;
    title: string;
    date: string;
    location: string;
    start_time: string;
    end_time: string;
    extra_info: string;
    remind: boolean;
    type: string;
}

const Calendar = ({ month, year }: CalendarProps) => {
    const [events, setEvents] = useState<Event[] | null>(null);

    // fetch events for month
    useEffect(() => {
        setEvents(null);
        const fetchEvents = async () => {
            const res = await fetch(`/api/events/get?month=${month}&year=${year}`);
            const data = await res.json();
            if (data.events) {
                setEvents(data.events);
            }
        }
        fetchEvents();
    }, [month, year])

    // don't show calendar until events are loaded
    if (events === null) return <Loader />;

    // days setup for visuals of calendar
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    firstDayOfMonth = (firstDayOfMonth + 6) % 7;
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
        <div key={`blank-${i}`} />
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
            const eventDate = new Date(event.date);
            return (
                eventDate.getDate() === dayNum && 
                eventDate.getMonth() === month && 
                eventDate.getFullYear() === year
            );
        });

        return (
            <CalendarCard 
            key={dayNum}
            date={dayNum}
            isToday={isToday}
            events={dayEvents}
            />
        );
    });

    return (
        <div className='flex flex-col gap-[var(--gap-small)]'>
            <div className='grid grid-cols-7 gap-[var(--gap-small)]'>
                {weekDays.map((day, i) => (
                    <div 
                    key={i}
                    className='w-full p-[var(--padding-small)] flex justify-center paragraph-large bg-background-dark rounded-[var(--rounding-small)]'
                    >
                        {day}
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-7 gap-[var(--gap-small)]'>
                {blanks}
                {days}
            </div>
        </div>
    )
}

export default Calendar
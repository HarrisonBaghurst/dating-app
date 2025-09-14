import React from 'react'
import CalendarCard from './CalendarCard'

type CalendarProps = {
    date: number;
    month: number;
    year: number;
}

const Calendar = ({ date, month, year }: CalendarProps) => {

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let firstDayOfMonth = new Date(year, month, 1).getDay();

    firstDayOfMonth = (firstDayOfMonth + 6) % 7;

    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
        <div key={`blank-${i}`} />
    ));

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const dayNum = i + 1;
        return (
            <CalendarCard 
            key={dayNum}
            date={dayNum}
            isToday={dayNum === date}
            />
        )
    });

    return (
        <div className='grid grid-cols-7 gap-[var(--gap-small)]'>
            {blanks}
            {days}
        </div>
    )
}

export default Calendar
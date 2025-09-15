import { cn } from '@/lib/utils';
import React from 'react'

type CalendarCardProps = {
    date: number;
    isToday: boolean;
    events?: Event[]
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

const CalendarCard = ({ date, isToday, events }: CalendarCardProps) => {
    
    const getOrdinal = (n: number) => {
		if (n % 100 >= 11 && n % 100 <= 13) return `th` // special case for 11th, 12th & 13th
		switch (n % 10) {
			case 1: return `st`
			case 2: return `nd`
			case 3: return `rd`
			default: return `th`
		}
	}
    
    return (
        <div
        key={date}
        className={cn(
            'p-[var(--padding-small)] bg-card-grey rounded-[var(--rounding-small)] h-[10dvw] flex flex-col gap-[var(--gap-small)]',
            isToday ? 'bg-card-highlight' : 'bg-card-grey'
        )}
        >
            <p className='flex items-baseline text-foreground-main'>
                <span className='paragraph-large'>{date}</span>
                <span className='paragraph-small'>{getOrdinal(date)}</span>
            </p>
            <div className='paragraph-small text-foreground-second'>
                {events?.map((event, i) => (
                    <div key={i}>
                        {event.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalendarCard
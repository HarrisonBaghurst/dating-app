import { cn } from '@/lib/utils';
import React from 'react'

type CalendarCardProps = {
    date: number;
    isToday: boolean;
}

const CalendarCard = ({ date, isToday }: CalendarCardProps) => {
    
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
            'p-[var(--padding-small)] bg-card-grey rounded-[var(--rounding-small)] h-[10dvw]',
            isToday ? 'bg-card-highlight' : 'bg-card-grey'
        )}
        >
            <p className='flex items-baseline text-foreground-main'>
                <span className='paragraph-large'>{date}</span>
                <span className='paragraph-small'>{getOrdinal(date)}</span>
            </p>
        </div>
    )
}

export default CalendarCard
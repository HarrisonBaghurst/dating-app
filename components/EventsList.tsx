import { getOrdinal } from '@/lib/dateUtils';
import { CalendarEvent } from '@/types/event';
import Image from 'next/image';
import React from 'react'

type EventsListProps = {
    date?: number;
	month?: number;
	year?: number;
    events: CalendarEvent[];
}

const EventsList = ({ date, month, year, events }: EventsListProps) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	const sortedEvents = [...events].sort((a, b) => {
		const timeA = a.start_time.localeCompare(b.start_time);
		return timeA;
	})

    return (
		<div className='bg-background-dark w-full rounded-[var(--rounding-large)] p-[var(--padding-large)] paragraph-large flex flex-col gap-[var(--gap-medium)] h-full'>
			{date && month && year && (
				<div className='flex justify-between items-center'>
					<h1 className='flex items-baseline text-foreground-main font-enorm title-large'>
						{date}
						<span className='title-small pr-4'>{getOrdinal(date)}</span>
						{` ${months[month]}, `} 
						{year}
					</h1>
					<Image 
					src={'/icons/square-plus.svg'}
					alt={`plus icon`}
					width={32}
					height={32}
					className='cursor-pointer'
					/>
				</div>
			)}
			<div className='flex flex-col gap-[var(--gap-small)]'>
				{sortedEvents.length === 0 ? (
					<h2 className='title-small font-enorm text-foreground-second'>Nothing Scheduled</h2>
				) : (
					<h2 className='title-small font-enorm'>Events</h2>
				)}
				<div className='flex flex-col gap-[var(--gap-small)]'>
					{sortedEvents.map((event, i) => (
						<div
						key={i}
						className='flex flex-col gap-[var(--gap-small)] bg-background-light p-[var(--padding-small)] rounded-[var(--rounding-small)] text-foreground-second paragraph-small'
						>
							<div className=' grid grid-cols-4'>
								<p className='text-foreground-main paragraph-large col-span-2'>{event.title}</p>
								<p className='text-right'>{`${event.start_time.substring(0, 5)} - ${event.end_time.substring(0, 5)}`}</p>
								<p className='text-right'>{event.location}</p>
							</div>
							{event.extra_info !== 'NULL' && (
								<p>
									{event.extra_info}
								</p>
									
							)}
						</div>
					))}
				</div>
			</div>
		</div>
    )
}

export default EventsList
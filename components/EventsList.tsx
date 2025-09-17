import { getOrdinal } from '@/lib/dateUtils';
import { useModal } from '@/providers/ModalProvider';
import { CalendarEvent } from '@/types/event';
import Image from 'next/image';
import React from 'react'
import CreateEvent from './CreateEvent';

type EventsListProps = {
    date?: number;
	month?: number;
	year?: number;
    events: CalendarEvent[];
}

const EventsList = ({ date, month, year, events }: EventsListProps) => {
	const { openModal } = useModal();

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	const sortedEvents = [...events].sort((a, b) => {
		const timeA = a.start_time.localeCompare(b.start_time);
		return timeA;
	})

	const deadlines = sortedEvents.filter(ev => ev.type === 'deadline');
	const reminders = sortedEvents.filter(ev => ev.type === 'reminder');
	const normalEvents = sortedEvents.filter(ev => ev.type === 'event');
	const allDayEvents = sortedEvents.filter(ev => ev.type === 'all day');

    return (
		<div className='bg-background-light w-full rounded-[var(--rounding-large)] p-[var(--padding-large)] paragraph-large flex flex-col gap-[var(--gap-medium)] h-fit'>
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
					onClick={() => {openModal(
						<CreateEvent 
						defaultDate={new Date(year, month, date)}
						/>
					)}}
					/>
				</div>
			)}
			<div className='flex flex-col gap-[var(--gap-large)]'>
				{events.length === 0 && (
					<h2 className='title-small font-enorm text-foreground-second'>Nothing Scheduled</h2>
				)}
				{deadlines.length !== 0 && 
					<div className='flex flex-col gap-[var(--gap-small)]'>
						<h2 className='title-small font-enorm'>Deadlines</h2>	
						{deadlines.map((event, i) => (
							<div
							key={i}
							className='flex flex-col gap-[var(--gap-small)] bg-card-grey p-[var(--padding-small)] rounded-[var(--rounding-small)] text-foreground-second paragraph-small'
							>
								<div className='flex justify-between items-center'>
									<p className='text-foreground-main paragraph-large col-span-2'>{event.title}</p>
									<p className='text-right'>{`${event.start_time.substring(0, 5)}`}</p>
								</div>
								{event.extra_info !== 'NULL' && event.extra_info !== '' && (
									<p>
										{event.extra_info}
									</p>
								)}
							</div>
						))}
					</div>
				}
				{reminders.length !== 0 && 
					<div className='flex flex-col gap-[var(--gap-small)]'>
						<h2 className='title-small font-enorm'>Reminders</h2>	
						{reminders.map((event, i) => (
							<div
							key={i}
							className='flex flex-col gap-[var(--gap-small)] bg-card-grey p-[var(--padding-small)] rounded-[var(--rounding-small)] text-foreground-second paragraph-small'
							>
								<div className='flex justify-between items-center'>
									<p className='text-foreground-main paragraph-large col-span-2'>{event.title}</p>
									<p className='text-right'>{`${event.start_time.substring(0, 5)}`}</p>
								</div>
								{event.extra_info !== 'NULL' && event.extra_info !== '' && (
									<p>
										{event.extra_info}
									</p>
								)}
							</div>
						))}
					</div>
				}
				{normalEvents.length !== 0 && 
					<div className='flex flex-col gap-[var(--gap-small)]'>
						<h2 className='title-small font-enorm'>Events</h2>	
						{normalEvents.map((event, i) => (
							<div
							key={i}
							className='flex flex-col gap-[var(--gap-small)] bg-card-grey p-[var(--padding-small)] rounded-[var(--rounding-small)] text-foreground-second paragraph-small'
							>
								<div className=' grid grid-cols-4 items-center'>
									<p className='text-foreground-main paragraph-large col-span-2'>{event.title}</p>
									<p className='text-right'>{event.location}</p>
									<p className='text-right'>{`${event.start_time.substring(0, 5)} - ${event.end_time.substring(0, 5)}`}</p>
								</div>
								{event.extra_info !== 'NULL' && event.extra_info !== '' && (
									<p>
										{event.extra_info}
									</p>
								)}
							</div>
						))}
					</div>
				}
				{allDayEvents.length !== 0 && 
					<div className='flex flex-col gap-[var(--gap-small)]'>
						<h2 className='title-small font-enorm'>All Day</h2>	
						{allDayEvents.map((event, i) => (
							<div
							key={i}
							className='flex flex-col gap-[var(--gap-small)] bg-card-grey p-[var(--padding-small)] rounded-[var(--rounding-small)] text-foreground-second paragraph-small'
							>
								<div className='flex items-center'>
									<p className='text-foreground-main paragraph-large col-span-2'>{event.title}</p>
								</div>
								{event.extra_info !== 'NULL' && event.extra_info !== '' && (
									<p>
										{event.extra_info}
									</p>
								)}
							</div>
						))}
					</div>
				}
			</div>
		</div>
    )
}

export default EventsList
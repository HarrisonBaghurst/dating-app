'use client'

import { getOrdinal } from '@/lib/dateUtils';
import { useModal } from '@/providers/ModalProvider';
import { CalendarEvent } from '@/types/event';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import CreateEvent from './CreateEvent';
import { cn } from '@/lib/classUtils';
import { useIcons } from '@/constants/icons';
import EventSection from './EventSection';

type EventsListProps = {
    date?: number;
	month?: number;
	year?: number;
    events: CalendarEvent[];
	title?: string;
}

const EventsList = ({ date, month, year, events, title }: EventsListProps) => {
	const icons = useIcons()

	const { openModal } = useModal();

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	const [deadlines, setDeadlines] = useState<CalendarEvent[]>([]); 
	const [reminders, setReminders] = useState<CalendarEvent[]>([]); 
	const [normalEvents, setNormalEvents] = useState<CalendarEvent[]>([]); 
	const [allDayEvents, setAllDayEvents] = useState<CalendarEvent[]>([]); 

	useEffect(() => {
		const sortedEvents = [...events].sort((a, b) => {
			const timeA = a.start_time.localeCompare(b.start_time);
			return timeA;
		})
	
		setDeadlines(sortedEvents.filter(ev => ev.type === 'deadline'));
		setReminders(sortedEvents.filter(ev => ev.type === 'reminder'));
		setNormalEvents(sortedEvents.filter(ev => ev.type === 'event'));
		setAllDayEvents(sortedEvents.filter(ev => ev.type === 'all day'));
	}, [events])

    return (
		<div className='bg-card-grey w-full rounded-[var(--rounding-large)] p-[var(--padding-large)] paragraph-large flex flex-col gap-[var(--gap-medium)] h-fit border-[1px] border-card-highlight'>
			{title && (
				<h2 className='title-large font-enorm'>
					{title}
				</h2>
			)}
			{date && month && year && (
				<div className='flex justify-between items-center'>
					<h1 className='flex items-baseline text-foreground-main font-enorm title-large'>
						{date}
						<span className='title-small pr-4'>{getOrdinal(date)}</span>
						{` ${months[month]}, `} 
						{year}
					</h1>
					<Image 
					src={icons.create}
					alt={`plus icon`}
					width={0}
					height={0}
					className='cursor-pointer w-[var(--icon-large)] h-[var(--icon-large)]'
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
				<EventSection 
				title={'Deadlines'}
				events={deadlines}
				icon={icons.deadline}
				/>
				<EventSection
				title={'Reminders'}
				events={reminders}
				icon={icons.reminder}
				/>
				<EventSection 
				title={'Events'}
				events={normalEvents}
				icon={icons.event}
				/>
				<EventSection 
				title={'All Day'}
				events={allDayEvents}
				icon={icons.allDay}
				/>
			</div>
		</div>
    )
}

export default EventsList
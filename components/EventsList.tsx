'use client'

import { getOrdinal } from '@/lib/dateUtils';
import { useModal } from '@/providers/ModalProvider';
import { CalendarEvent } from '@/types/event';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import CreateEvent from './CreateEvent';
import { useIcons } from '@/constants/icons';
import EventSection from './EventSection';
import toTitleCase from '@/lib/stringUtils';

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

	const [groupedEvents, setGroupedEvents] = useState<Record<string, CalendarEvent[]>>({});

	useEffect(() => {
		const sortedEvents = [...events].sort((a, b) => 
			a.start_time.localeCompare(b.start_time)
		);

		const groupedEvents = sortedEvents.reduce<Record<string, typeof events>>((acc, ev) => {
			if (!acc[ev.type]) {
				acc[ev.type] = [];
			}
			acc[ev.type].push(ev);
			return acc;
		}, {});

		setGroupedEvents(groupedEvents);
	}, [events])

	const getEventIcon = (type: string) => {
		switch (type) {
			case 'deadline': return icons.deadline
			case 'reminder': return icons.reminder
			case 'event': return icons.event
			default: return icons.allDay
		}
	}

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
				{Object.entries(groupedEvents).map(([type, events]) => (
					<EventSection 
					key={type}
					title={toTitleCase(type)}
					events={events}
					icon={getEventIcon(type)}
					/>
				))}
			</div>
		</div>
    )
}

export default EventsList
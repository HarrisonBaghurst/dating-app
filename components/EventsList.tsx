'use client'

import { getOrdinal } from '@/lib/dateUtils';
import { useModal } from '@/providers/ModalProvider';
import { CalendarEvent, EventType } from '@/types/event';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import CreateEvent from './CreateEvent';
import { useIcons } from '@/constants/icons';
import { useSettings } from '@/providers/SettingsProvider';
import EventCard from './EventCard';
import EventCardLoader from './EventCardLoader';
import gsap from 'gsap';

type EventsListProps = {
    date?: number;
	month?: number;
	year?: number;
    events?: CalendarEvent[];
	title?: string;
}

const EventsList = ({ date, month, year, events, title }: EventsListProps) => {
	const icons = useIcons();

	const { eventTypeOrder, updateEventTypeOrder } = useSettings();

	const { openModal } = useModal();

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	const [groupedEvents, setGroupedEvents] = useState<Record<string, CalendarEvent[]>>({});

	const listRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!events) return;
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

	const initialEvents: EventType[] = [
		{ id: 'deadline', icon: icons.deadline },
		{ id: 'reminder', icon: icons.reminder },
		{ id: 'event', icon: icons.event },
		{ id: 'all day', icon: icons.allDay},
		{ id: 'birthday', icon: icons.birthday},
		{ id: 'bill', icon: icons.bill},
	]
	
	useEffect(() => {
		if (!eventTypeOrder) {
			updateEventTypeOrder(initialEvents);
		}
	}, [eventTypeOrder, updateEventTypeOrder])

	useEffect(() => {
		if (events && listRef.current) {
			requestAnimationFrame(() => {
				gsap.fromTo(
					listRef.current,
					{ opacity: 0.5, scale: 0.95 },
					{ opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
				)
			})
		}
	}, [events]);

	if (!eventTypeOrder) return null;

    return (
		<div
		ref={listRef} 
		className='
		card-style p-[var(--padding-medium)] w-full paragraph-large flex flex-col gap-[var(--gap-medium)] h-fit
		scale-95 opacity-50 will-change-transform
		'>
			{title && (
				<h2 className='title-small font-enorm'>
					{title}
				</h2>
			)}
			{date !== undefined && month !== undefined && year !== undefined && (
				<div className='flex justify-between items-center'>
					<h1 className='flex items-baseline text-foreground-main font-enorm title-small'>
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
			{events ? (
				<div className='
				grid grid-cols-1 gap-[var(--gap-small)]
				'> 	
					{events.length === 0 && (
						<h2 className='paragraph-large text-foreground-second'>Nothing Scheduled</h2>
					)}
					{eventTypeOrder
					.filter(eventType => (groupedEvents[eventType.id] || []).length > 0)
					.map((eventType) => (
						(groupedEvents[eventType.id] || []).map((event) => (
							<EventCard 
							key={event.id}
							event={event}
							/>
						))
					))
					}
				</div>
			) : (
				<div className='grid grid-cols-1 gap-[var(--gap-small)]'>
					{[...Array(3)].map((_, i) => (
						<EventCardLoader key={i} />
					))}
				</div>
			)}
		</div>
    )
}

export default EventsList
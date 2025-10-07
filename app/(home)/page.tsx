'use client'

import EventsList from '@/components/EventsList';
import TitleTime from '@/components/TitleTime';
import { months } from '@/constants/CalendarInfo';
import { getOrdinal } from '@/lib/dateUtils';
import { useRefreshEventsContext } from '@/providers/RefreshEventsProvider';
import { CalendarEvent } from '@/types/event';
import React, { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

const Page = () => {
	const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

	const {trigger} = useRefreshEventsContext();
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
					body: JSON.stringify({ month: todayMonth, year: todayYear })
				});
				if (!res.ok) {
					console.error('Failed to fetch events');
					setEvents([]);
				}
				const data = await res.json();
				setEvents(data.events);
			} catch (err) {
				console.error(err);
				setEvents([]);
			}
		}
		fetchEvents();
	}, [trigger, todayMonth, todayYear])
	
	return (
		<section className='w-full h-fit min-h-screen bg-background-light overflow-hidden p-[var(--padding-large)] flex flex-col gap-[var(--gap-large)]'>
			<div className='
			flex 
			flex-col gap-[var(--gap-small)]
			2xl:justify-between 2xl:items-center 2xl:flex-row 2xl:gap-0
			'>
				<h1 className='title-large font-enorm'>
					{todayDate}
					<span className='title-small'>{getOrdinal(todayDate)}</span>
					{` ${months[todayMonth]}, ${todayYear}`}
				</h1>
				<TitleTime />
			</div>
			<div className='
			grid gap-[var(--gap-large)]
			grid-cols-1
			2xl:grid-cols-2
			'>
				{events? (
					<EventsList 
					title="Today's Schedule"
					events={events.filter((event: CalendarEvent) => (new Date(event.date)).getDate() === today.getDate()) ?? []}
					/>
				): <div className='relative h-[15rem]'><Loader /></div>}
				{events? (
					<EventsList 
					title="Tomorrow's Schedule"
					events={events.filter((event: CalendarEvent) => (new Date(event.date)).getDate() === today.getDate() + 1) ?? []}
					/>
				): <div className='relative h-[15rem]'><Loader /></div>}
			</div>
			
		</section>
	)
}

export default Page
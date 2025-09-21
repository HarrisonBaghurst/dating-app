'use client'

import EventsList from '@/components/EventsList';
import TitleTime from '@/components/TitleTime';
import { months } from '@/constants/CalendarInfo';
import { getOrdinal } from '@/lib/dateUtils';
import { useRefreshEventsContext } from '@/providers/RefreshEventsProvider';
import { CalendarEvent } from '@/types/event';
import React, { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import CreateEvent from '@/components/CreateEvent';

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
				console.log(data);
				setEvents(data.events);
			} catch (err) {
				console.error(err);
				setEvents([]);
			}
		}
		fetchEvents();
	}, [trigger])
	
	return (
		<section className='w-full h-fit min-h-screen bg-background-light rounded-l-[var(--rounding-large)] overflow-hidden p-[var(--padding-large)] flex flex-col gap-[var(--gap-large)]'>
			<div className='flex justify-between items-center'>
				<h1 className='title-large font-enorm'>
					{todayDate}
					<span className='title-small'>{getOrdinal(todayDate)}</span>
					{` ${months[todayMonth]}, ${todayYear}`}
				</h1>
				<TitleTime />
			</div>
			<div className='grid grid-cols-2 gap-[var(--gap-large)]'>
				<div className='flex flex-col gap-[var(--gap-large)]'>
					<div className='h-fit bg-card-grey p-[3px] rounded-[calc(var(--rounding-large)+3px)] gap-[var(--gap-small)]'>
						{events? (
							<EventsList 
							title='Today'
							events={events.filter((event: CalendarEvent) => (new Date(event.date)).getDate() === today.getDate()) ?? []}
							/>
						): <div className='relative h-[15rem]'><Loader /></div>}
					</div>
					<div className='h-fit bg-card-grey p-[3px] rounded-[calc(var(--rounding-large)+3px)] gap-[var(--gap-small)]'>
						{events? (
							<EventsList 
							title='Tomorrow'
							events={events.filter((event: CalendarEvent) => (new Date(event.date)).getDate() === today.getDate() + 1) ?? []}
							/>
						): <div className='relative h-[15rem]'><Loader /></div>}
					</div>
				</div>
				<div className='h-fit bg-card-grey p-[3px] rounded-[calc(var(--rounding-large)+3px)]'>
					<CreateEvent />
				</div>
			</div>
			
		</section>
	)
}

export default Page
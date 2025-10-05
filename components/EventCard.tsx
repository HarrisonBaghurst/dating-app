'use client'

import { useIcons } from '@/constants/icons';
import React, { useState } from 'react'
import Image from 'next/image'
import { useModal } from '@/providers/ModalProvider';
import { useRefreshEventsContext } from '@/providers/RefreshEventsProvider';
import { cn } from '@/lib/classUtils';
import { CalendarEvent } from '@/types/event';

type EventCardProps = {
	event: CalendarEvent;
}

const EventCard = ({ event }: EventCardProps) => {
	const icons = useIcons();
	const { closeModal } = useModal();
	const { refresh } = useRefreshEventsContext();

	const [clickable, setClickable] = useState(true);

	const deleteEvent = async (id: number) => {
		if (clickable) {
			setClickable(false);
			try {
				const res = await fetch('/api/events/del', {
					credentials: 'include',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ id })
				});
				if (!res.ok) {
					console.error('Failed to delete event');
					return;
				}
				refresh();
				closeModal();
				setClickable(false);
			} catch (err) {
				console.error(err);
			}
		}
	}

	const getEventImage = (type: string) => {
        switch (type) {
            case 'deadline': return icons.deadline
            case 'reminder': return icons.reminder
            case 'event': return icons.event
            case 'birthday': return icons.birthday
            case 'bill': return icons.bill
            default: return icons.allDay
        }
    }

	return (
		<div
		className={cn(
			'flex flex-col gap-[var(--gap-small)] bg-background-light p-[var(--padding-small)] rounded-[var(--rounding-small)] text-foreground-second paragraph-small h-fit',
			clickable? 'opacity-100' : 'opacity-10'
		)}
		>
			<div className='flex gap-[var(--gap-small)] items-center'>
				{/* event type icon */}
				<Image 
				src={getEventImage(event.type)}
				alt='event type icon'
				width={0}
				height={0}
				className='w-[var(--icon-small)] h-[var(--icon-small)]'
				/>
				{/* event title */}
				<h2 className='text-foreground-main paragraph-large'>
					{event.title}
				</h2>
			</div>
			
			<div className='flex gap-[var(--gap-large)] items-center'>
				{/* start and end time */}
				{event.start_time !== '' && event.end_time !== '' && event.end_time.substring(0, 5) !== '00:00' ? (
					<p>{`${event.start_time.substring(0, 5)} - ${event.end_time.substring(0, 5)}`}</p>
				) : event.start_time !== '' && event.start_time.substring(0, 5) !== '00:00' ? (
					<p>{`${event.start_time.substring(0, 5)}`}</p>
				) : 
					null
				}
				{/* location */}
				{event.location !== '' && (
					<p>{event.location}</p>
				)}
				{/* bill cost */} 
				{event.cost !== '' && (
					<p>{event.cost}</p>
				)}
			</div>
			
		</div>
	)
}

export default EventCard

{/*
<div className='flex gap-[var(--gap-large)] items-center'>
	<div className=' grid grid-cols-4 items-center w-full'>

		<p className='text-foreground-main paragraph-large col-span-2'>{title}</p>

		{location !== '' ? (
			<p className='text-right'>{location}</p>
		) : <div></div>}

		{startTime !== '' && endTime !== '' && endTime.substring(0, 5) !== '00:00' ? (
			<p className='text-right'>{`${startTime.substring(0, 5)} - ${endTime.substring(0, 5)}`}</p>
		) : startTime !== '' && startTime.substring(0, 5) !== '00:00' ? (
			<p className='text-right'>{`${startTime.substring(0, 5)}`}</p>
		) : 
			null
		}
		{cost !== '' && cost != null && (
			<p className='text-right'>{cost}</p>
		)}
	</div>
	<Image 
	src={icons.remove}
	alt='delete icon'
	width={0}
	height={0}
	className='w-[var(--icon-small)] h-[var(--icon-small)]'
	onClick={() => deleteEvent(id)}
	/>
</div>
{extraInfo !== 'NULL' && extraInfo !== '' && (
	<p>
		{extraInfo}
	</p>
)}
*/}
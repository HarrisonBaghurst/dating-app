'use client'

import { getOrdinal } from '@/lib/dateUtils';
import { useModal } from '@/providers/ModalProvider';
import { CalendarEvent } from '@/types/event';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import CreateEvent from './CreateEvent';
import { useRefreshEventsContext } from '@/providers/RefreshEventsProvider';
import { cn } from '@/lib/classUtils';
import { useIcons } from '@/constants/icons';

type EventsListProps = {
    date?: number;
	month?: number;
	year?: number;
    events: CalendarEvent[];
	title?: string;
}

const EventsList = ({ date, month, year, events, title }: EventsListProps) => {
	const icons = useIcons()

	const { openModal, closeModal } = useModal();
	const { refresh } = useRefreshEventsContext();

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	const [deadlines, setDeadlines] = useState<CalendarEvent[]>([]); 
	const [reminders, setReminders] = useState<CalendarEvent[]>([]); 
	const [normalEvents, setNormalEvents] = useState<CalendarEvent[]>([]); 
	const [allDayEvents, setAllDayEvents] = useState<CalendarEvent[]>([]); 

	const [clickable, setClickable] = useState(true);

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
			<div className={cn(
				'flex flex-col gap-[var(--gap-large)]',
				clickable? 'opacity-100' : 'opacity-10'
			)}>
				{events.length === 0 && (
					<h2 className='title-small font-enorm text-foreground-second'>Nothing Scheduled</h2>
				)}
				{deadlines.length !== 0 && 
					<div className='flex flex-col gap-[var(--gap-small)]'>
						<div className='flex gap-[var(--gap-small)] items-center'>
							<Image 
							src={icons.deadline}
							alt='deadline icon'
							width={0}
							height={0}
							className='w-[var(--icon-large)] h-[var(--icon-large)]'
							/>
							<h2 className='title-small font-enorm'>Deadlines</h2>	
						</div>
						{deadlines.map((event, i) => (
							<div
							key={i}
							className='flex flex-col gap-[var(--gap-small)] bg-background-light p-[var(--padding-small)] rounded-[var(--rounding-small)] text-foreground-second paragraph-small'
							>	
								<div className='flex gap-[var(--gap-large)] items-center'>
									<div className='flex justify-between items-center w-full'>
										<p className='text-foreground-main paragraph-large col-span-2'>{event.title}</p>
										<p className='text-right'>{`${event.start_time.substring(0, 5)}`}</p>
									</div>
									<Image 
									src={icons.remove}
									alt='delete icon'
									width={0}
									height={0}
									className='w-[var(--icon-small)] h-[var(--icon-small)]'
									onClick={() => deleteEvent(event.id)}
									/>
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
						<div className='flex gap-[var(--gap-small)] items-center'>
							<Image 
							src={icons.reminder}
							alt='reminder icon'
							width={0}
							height={0}
							className='w-[var(--icon-large)] h-[var(--icon-large)]'
							/>
							<h2 className='title-small font-enorm'>Reminders</h2>	
						</div>
						{reminders.map((event, i) => (
							<div
							key={i}
							className='flex flex-col gap-[var(--gap-small)] bg-background-light p-[var(--padding-small)] rounded-[var(--rounding-small)] text-foreground-second paragraph-small'
							>
								<div className='flex gap-[var(--gap-large)] items-center'>
									<div className='flex justify-between items-center w-full'>
										<p className='text-foreground-main paragraph-large col-span-2'>{event.title}</p>
										<p className='text-right'>{`${event.start_time.substring(0, 5)}`}</p>
									</div>
									<Image 
									src={icons.remove}
									alt='delete icon'
									width={0}
									height={0}
									className='w-[var(--icon-small)] h-[var(--icon-small)]'
									onClick={() => deleteEvent(event.id)}
									/>
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
						<div className='flex gap-[var(--gap-small)] items-center'>
							<Image 
							src={icons.event}
							alt='event icon'
							width={0}
							height={0}
							className='w-[var(--icon-large)] h-[var(--icon-large)]'
							/>
							<h2 className='title-small font-enorm'>Events</h2>	
						</div>
						{normalEvents.map((event, i) => (
							<div
							key={i}
							className='flex flex-col gap-[var(--gap-small)] bg-background-light p-[var(--padding-small)] rounded-[var(--rounding-small)] text-foreground-second paragraph-small'
							>
								<div className='flex gap-[var(--gap-large)] items-center'>
									<div className=' grid grid-cols-4 items-center w-full'>
										<p className='text-foreground-main paragraph-large col-span-2'>{event.title}</p>
										<p className='text-right'>{event.location}</p>
										<p className='text-right'>{`${event.start_time.substring(0, 5)} - ${event.end_time.substring(0, 5)}`}</p>
									</div>
									<Image 
									src={icons.remove}
									alt='delete icon'
									width={0}
									height={0}
									className='w-[var(--icon-small)] h-[var(--icon-small)]'
									onClick={() => deleteEvent(event.id)}
									/>
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
						<div className='flex gap-[var(--gap-small)] items-center'>
							<Image 
							src={icons.allDay}
							alt='all day icon'
							width={0}
							height={0}
							className='w-[var(--icon-large)] h-[var(--icon-large)]'
							/>
							<h2 className='title-small font-enorm'>All Day</h2>	
						</div>
						{allDayEvents.map((event, i) => (
							<div
							key={i}
							className='flex flex-col gap-[var(--gap-small)] bg-background-light p-[var(--padding-small)] rounded-[var(--rounding-small)] text-foreground-second paragraph-small'
							>
								<div className='flex gap-[var(--gap-large)] items-center'>
									<div className='flex items-center w-full'>
										<p className='text-foreground-main paragraph-large col-span-2'>{event.title}</p>
									</div>
									<Image 
									src={icons.remove}
									alt='delete icon'
									width={0}
									height={0}
									className='w-[var(--icon-small)] h-[var(--icon-small)]'
									onClick={() => deleteEvent(event.id)}
									/>
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
'use client'

import { useIcons } from '@/constants/icons';
import React, { useState } from 'react'
import Image from 'next/image'
import { useModal } from '@/providers/ModalProvider';
import { useRefreshEventsContext } from '@/providers/RefreshEventsProvider';
import { cn } from '@/lib/classUtils';
import { CalendarEvent } from '@/types/event';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toTitleCase from '@/lib/stringUtils';
import EventCardLoader from './EventCardLoader';

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

	const copyEventToClipboard = async () => {
		const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

		const params = new URLSearchParams({
			title: event.title,
			date: event.date,
			location: event.location || '',
			cost: event.cost || '',
			'start-time': event.start_time || '',
			'end-time': event.end_time || '', 
			'extra-info': event.extra_info || '',
			'event-type': event.type,
		})

		const eventUrl = `${baseUrl}/shared-event?${params.toString()}`;

		try {
			await navigator.clipboard.writeText(eventUrl);
			console.log('Copied event link to clipboard: ', eventUrl);
		} catch (err) {
			console.error('Failed to copy event link: ', err);
			alert('Could not copy event link to clipboard');
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

	const getEventColour = (type: string) => {
		switch (type) {
			case 'deadline': return 'var(--event-pink)'
            case 'reminder': return 'var(--event-yellow)'
            case 'event': return 'var(--event-blue)'
            case 'birthday': return 'var(--event-orange)'
            case 'bill': return 'var(--event-green)'
            default: return 'var(--event-purple)'
		}
	}

	const dropDownOptions = [
		{
			"text": "Copy Share Link",
			"icon": icons.copy,
			"onClick": () => copyEventToClipboard(),
		},
		{
			"text": "Delete Event",
			"icon": icons.remove,
			"onClick": () => deleteEvent(event.id),
		},
	]

	if (!clickable) return <EventCardLoader />

	return (
		<div
		className='flex gap-[var(--padding-small)] p-[var(--padding-small)] text-foreground-second paragraph-small h-fit dark-card-style'>
			<div className='w-[2px] min-h-full' style={{ backgroundColor: getEventColour(event.type) }}/>
			<div className='flex flex-col gap-[var(--gap-small)] w-full'>
				<div className='flex w-full justify-between items-center'>
					<div className='flex gap-[var(--gap-small)] items-center'>
						<Image 
						src={getEventImage(event.type)}
						alt='event type icon'
						width={0}
						height={0}
						className='w-[var(--icon-large)] h-[var(--icon-large)]'
						/>
						<p style={{ color: getEventColour(event.type) }} className='font-enorm'>
							{toTitleCase(event.type)}
						</p>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Image 
							src={icons.menu}
							alt='remove event icon'
							width={0}
							height={0}
							className='w-[var(--icon-large)] h-[var(--icon-large)] cursor-pointer'
							onClick={() => {}} 
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{dropDownOptions.map((option, i) => (
								<DropdownMenuItem
								key={i}
								>
									<div 
									className='flex gap-[var(--gap-medium)] items-center'
									onClick={() => option.onClick()}
									>
										<Image
										src={option.icon}
										alt='dropdown icon'
										width={0}
										height={0}
										className='w-[var(--icon-large)] h-[var(--icon-large)]'
										/>
										{option.text}
									</div>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div>
					<h3 className='font-enorm text-foreground-main paragraph-large'>
						{event.title}
					</h3>
				</div>
				
				{!['birthday', 'all day'].includes(event.type) && (
					<div>
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

						{/* cost */}
						{event.cost !== '' && (
							<p>{event.cost}</p>
						)}
					</div>
				)}

				{/* extra info */}
				{event.extra_info !== 'NULL' && event.extra_info !== '' && (
					<p>{event.extra_info}</p>
				)}
			</div>


			{/*
			<div 
			className='w-[1px] min-h-full'
			style={{ backgroundColor: getEventColour(event.type) }}
			/>
			<div className='flex flex-col gap-[var(--gap-small)] w-full'>
				<div className='flex justify-between items-center'>
					<div className='flex gap-[var(--gap-small)] items-center'>
						<Image 
						src={getEventImage(event.type)}
						alt='event type icon'
						width={0}
						height={0}
						className='w-[var(--icon-small)] h-[var(--icon-small)]'
						/>
						<h2 className='text-foreground-main paragraph-large'>
							{event.title}
						</h2>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Image 
							src={icons.menu}
							alt='remove event icon'
							width={0}
							height={0}
							className='w-[var(--icon-small)] h-[var(--icon-small)] cursor-pointer'
							onClick={() => {}} 
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{dropDownOptions.map((option, i) => (
								<DropdownMenuItem
								key={i}
								>
									<div 
									className='flex gap-[var(--gap-medium)] items-center'
									onClick={() => option.onClick()}
									>
										<Image
										src={option.icon}
										alt='dropdown icon'
										width={0}
										height={0}
										className='w-[var(--icon-large)] h-[var(--icon-large)]'
										/>
										{option.text}
									</div>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				
				{event.type !== 'birthday' && event.type !== 'all day' && (
					<div className='flex flex-col gap-[calc(var(--gap-small)/2)]'>
						{event.start_time !== '' && event.end_time !== '' && event.end_time.substring(0, 5) !== '00:00' ? (
							<p>{`${event.start_time.substring(0, 5)} - ${event.end_time.substring(0, 5)}`}</p>
						) : event.start_time !== '' && event.start_time.substring(0, 5) !== '00:00' ? (
							<p>{`${event.start_time.substring(0, 5)}`}</p>
						) : 
							null
						}
						{event.location !== '' && (
							<p>{event.location}</p>
						)}
						{event.cost !== '' && (
							<p>{event.cost}</p>
						)}
						{event.extra_info !== 'NULL' && event.extra_info !== '' && (
							<p>{event.extra_info}</p>
						)}
					</div>
				)}

			</div>
			*/}
		</div>
	)
}

export default EventCard

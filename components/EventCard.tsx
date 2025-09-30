'use client'

import { useIcons } from '@/constants/icons';
import React, { useState } from 'react'
import Image from 'next/image'
import { useModal } from '@/providers/ModalProvider';
import { useRefreshEventsContext } from '@/providers/RefreshEventsProvider';
import { cn } from '@/lib/classUtils';

type EventCardProps = {
	id: number;
    title: string;
	location: string;
	startTime: string;
	endTime: string;
	extraInfo: string;
}

const EventCard = ({ id, title, location, startTime, endTime, extraInfo }: EventCardProps) => {
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

	return (
		<div
		className={cn(
			'flex flex-col gap-[var(--gap-small)] bg-background-light p-[var(--padding-small)] rounded-[var(--rounding-small)] text-foreground-second paragraph-small',
			clickable? 'opacity-100' : 'opacity-10'
		)}
		>
			<div className='flex gap-[var(--gap-large)] items-center'>
				<div className=' grid grid-cols-4 items-center w-full'>

					{/* title */}
					<p className='text-foreground-main paragraph-large col-span-2'>{title}</p>

					{/* location */}
					{location !== '' ? (
						<p className='text-right'>{location}</p>
					) : <div></div>}

					{/* start and end times */}
					{startTime !== '' && endTime !== '' && endTime.substring(0, 5) !== '00:00' ? (
						<p className='text-right'>{`${startTime.substring(0, 5)} - ${endTime.substring(0, 5)}`}</p>
					) : startTime !== '' && startTime.substring(0, 5) !== '00:00' ? (
						<p className='text-right'>{`${startTime.substring(0, 5)}`}</p>
					) : 
						null
					}
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
		</div>
	)
}

export default EventCard
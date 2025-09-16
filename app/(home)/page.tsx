'use client'

import Calendar from '@/components/Calendar';
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const page = () => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	const [time, setTime] = useState<Date | null>(null); // used for clock and current day checking 
	const [calendarMonth, setCalendarMonth] = useState<number | null>(null); 
	const [calendarYear, setCalendarYear] = useState<number | null>(null);
	
	useEffect(() => {
		// get month and year
		const tempTime = new Date();
		setCalendarMonth(tempTime.getMonth());
		setCalendarYear(tempTime.getFullYear());

		// set up the interval for updating the clock 
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		setTime(new Date());
			
		// remove interval on dismount
		return () => clearInterval(interval);
	}, []);

	// until time is found return loader element 
	if (!time || calendarMonth === null || calendarYear === null) return null;

	const updateCalendarMonth = (change: number) => { // +1 increases month shown in calendar, -1 decreases month
		let currentMonth = calendarMonth;
		currentMonth += change;
		if (currentMonth >= 12) {
			currentMonth -= 12;
			setCalendarYear(calendarYear + 1);
		}
		else if (currentMonth < 0) {
			currentMonth += 12;
			setCalendarYear(calendarYear - 1);
		}
		setCalendarMonth(currentMonth);
	}

	return (
		<section className='w-full h-fit bg-background-light rounded-l-[var(--rounding-large)] overflow-hidden p-[var(--padding-large)] flex flex-col gap-[var(--gap-large)]'>
			<div className='flex items-center justify-between'>
				<div className='flex gap-[var(--gap-small)] items-center'>
					<Image 
					src={'/icons/chevron-left.svg'}
					alt={'left arrow icon'}
					width={32}
					height={32}
					className='cursor-pointer'
					onClick={() => updateCalendarMonth(-1)}
					/>
					<h1 className='title-large font-enorm'>
						{`${months[calendarMonth]}, ${calendarYear}`}
					</h1>
					<Image 
					src={'/icons/chevron-left.svg'}
					alt={'left arrow icon'}
					width={32}
					height={32}
					className='cursor-pointer rotate-180'
					onClick={() => updateCalendarMonth(1)}
					/>
				</div>
				<h2 className='title-small font-enorm'>
					{`${String(time.getHours()).padStart(2, '0')} : ${String(time.getMinutes()).padStart(2, '0')} : ${String(time.getSeconds()).padStart(2, '0')}`}
				</h2>
			</div>
			<Calendar 
			month={calendarMonth}
			year={calendarYear}
			/>
		</section>
	)
}

export default page

// events, reminders, deadlines, all-day event
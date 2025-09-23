'use client'

import Calendar from '@/components/Calendar';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { months } from '@/constants/CalendarInfo'
import TitleTime from '@/components/TitleTime';
import { icons } from '@/constants/icons';

const Page = () => {
	const time = new Date();
	const [calendarMonth, setCalendarMonth] = useState<number | null>(null); 
	const [calendarYear, setCalendarYear] = useState<number | null>(null);

	useEffect(() => {
		setCalendarMonth(time.getMonth());
		setCalendarYear(time.getFullYear());
	}, [])
	
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
		<section className='w-full h-fit min-h-screen bg-background-light overflow-hidden p-[var(--padding-large)] flex flex-col gap-[var(--gap-large)]'>
			<div className='flex items-center justify-center 2xl:justify-between'>
				<div className='flex gap-[var(--gap-medium)] items-center'>
					<Image 
					src={icons.leftArrow}
					alt={'left arrow icon'}
					width={0}
					height={0}
					className='cursor-pointer w-[var(--icon-large)] h-[var(--icon-large)]'
					onClick={() => updateCalendarMonth(-1)}
					/>
					<h1 className='title-large font-enorm'>
						{`${months[calendarMonth]}, ${calendarYear}`}
					</h1>
					<Image 
					src={icons.leftArrow}
					alt={'right arrow icon'}
					width={0}
					height={0}
					className='cursor-pointer w-[var(--icon-large)] h-[var(--icon-large)] rotate-180'
					onClick={() => updateCalendarMonth(1)}
					/>
				</div>
				<div className='hidden 2xl:block'>
					<TitleTime />
				</div>
			</div>
			<Calendar 
			month={calendarMonth}
			year={calendarYear}
			/>
		</section>
	)
}

export default Page
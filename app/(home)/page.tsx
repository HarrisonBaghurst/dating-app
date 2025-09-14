'use client'

import Calendar from '@/components/Calendar';
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react'

const page = () => {
	const [time, setTime] = useState<Date | null>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	if (!time) return <Loader />;

	const currentDateString = time.toLocaleDateString('en-GB', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	})

	return (
		<section className='w-full h-fit bg-background-light rounded-l-[var(--rounding-large)] overflow-hidden p-[var(--padding-large)] flex flex-col gap-[var(--gap-large)]'>
			<div className='flex items-center justify-between'>
				<h1 className='title-large font-enorm'>
					{currentDateString}
				</h1>
				<h2 className='title-small font-enorm'>
					{`${String(time.getHours()).padStart(2, '0')} : ${String(time.getMinutes()).padStart(2, '0')} : ${String(time.getSeconds()).padStart(2, '0')}`}
				</h2>
			</div>
			<Calendar 
			date={time.getDate()}
			month={time.getMonth()}
			year={time.getFullYear()}
			/>
		</section>
	)
}

export default page
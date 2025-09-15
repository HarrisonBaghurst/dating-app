'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useState } from 'react'

const SideBar = () => {	
	const links = [
		{
			"text": "Home",
			"icon": "/icons/home.svg",
			"link": "/",
		},
		{
			"text": "Calendar",
			"icon": "/icons/calendar-week.svg",
			"link": "/",
		},
		{
			"text": "Create",
			"icon": "/icons/square-plus.svg",
			"link": "/",
		},
		{
			"text": "List View",
			"icon": "/icons/eye.svg",
			"link": "/",
		}
	]

	const [selected, setSelected] = useState(0);

    return (
        <section className='w-[20dvw] h-screen bg-background-dark p-[var(--padding-large)] flex flex-col gap-[var(--gap-large)] fixed'>
            <div className='flex justify-between'>
				<div className='cursor-pointer rounded-full'>
					<Image 
					src={'/icons/user-circle.svg'}
					alt={'user circle icon'}
					width={32}
					height={32}
					/>
				</div>
				<div className='cursor-pointer rounded-full'>
					<Image 
					src={'/icons/chevron-left.svg'}
					alt={'left arrow icon'}
					width={32}
					height={32}
					/>
				</div>
			</div>
			<div className='paragraph-large flex flex-col gap-[var(--gap-small)]'>
				{links.map((link, i) => (
					<div
					key={i}
					className={cn(
						'rounded-[var(--rounding-small)] p-[var(--padding-small)] flex items-center gap-[var(--gap-medium)] cursor-pointer',
						i === selected && 'bg-background-light'
					)}
					>	
						<Image 
						src={link.icon}
						alt={`${link.text} icon`}
						width={32}
						height={32}
						/>
						{link.text}
					</div>
				))}
			</div>
        </section>
    )
}

export default SideBar
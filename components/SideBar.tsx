'use client'

import { cn } from '@/lib/classUtils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = () => {	
	const links = [
		{
			"text": "Home",
			"icon": "/icons/home.svg",
			"dest": "/",
		},
		{
			"text": "Calendar",
			"icon": "/icons/calendar-week.svg",
			"dest": "/calendar",
		},
		{
			"text": "Create",
			"icon": "/icons/square-plus.svg",
			"dest": "...",
		},
		{
			"text": "List View",
			"icon": "/icons/eye.svg",
			"dest": "...",
		}
	]

	const pathname = usePathname();

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
				{links.map((link, i) => {
					const isActive = link.dest === '/' ? pathname === '/' : pathname.includes(link.dest);

					return (
						<Link
						href={link.dest}
						key={i}
						className={cn(
							'relative rounded-[var(--rounding-small)] p-[var(--padding-small)] cursor-pointer',
						)}
						>	
							{isActive && (
								<motion.div
								layoutId='activeBackground'
								className='absolute inset-0 bg-card-highlight rounded-[var(--rounding-small)]'
								transition={{ type: 'spring', stiffness: 400, damping: 30 }}
								/>
							)}
							<div className='relative flex items-center gap-[var(--gap-medium)]'>
								<Image 
								src={link.icon}
								alt={`${link.text} icon`}
								width={32}
								height={32}
								/>
								{link.text}
							</div>
						</Link>
					)
				})}
			</div>
        </section>
    )
}

export default SideBar
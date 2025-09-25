'use client'

import { cn } from '@/lib/classUtils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { supabaseBrowser } from '@/lib/supabase/browserClient'
import { useIcons } from '@/constants/icons'

const SideBar = () => {	
	const icons = useIcons();
	const links = [
		{
			"text": "Home",
			"icon": icons.home,
			"dest": "/",
		},
		{
			"text": "Calendar",
			"icon": icons.calendar,
			"dest": "/calendar",
		},
		{
			"text": "Settings",
			"icon": icons.settings,
			"dest": "/settings",
		}
	]
	
	const router = useRouter()
	
	const handleLogout = async () => {
		await supabaseBrowser.auth.signOut();
		router.push('/login');
	}

	const pathname = usePathname();

    return (
        <section className='
		bg-background-dark p-[var(--padding-large)] flex justify-between fixed z-50
		bottom-0 left-0 h-[20dvw] w-screen flex-row
		2xl:top-0 2xl:left-0 2xl:w-[20dvw] 2xl:h-screen 2xl:flex-col
		'>
            <div className='
			flex gap-[var(--gap-large)]
			flex-row
			2xl:flex-col
			'>	
				<Image 
				src={icons.user}
				alt={'user circle icon'}
				width={0}
				height={0}
				className='hidden 2xl:block cursor-pointer w-[var(--icon-large)] h-[var(--icon-large)]'
				/>
				<div className='
				paragraph-large flex gap-[var(--gap-small)]
				flex-row
				2xl:flex-col
				'>
					{links.map((link, i) => {
						const isActive = link.dest === '/' ? pathname === '/' : pathname.includes(link.dest);

						return (
							<Link
							key={i}
							href={link.dest}
							>
								<motion.div
								whileHover={! (isActive) ? { borderColor: "var(--card-highlight)" } : {}}
								className={cn(
									'relative rounded-[var(--rounding-small)] p-[var(--padding-small)] cursor-pointer',
									'border-[3px] border-transparent'
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
										width={0}
										height={0}
										className='w-[var(--icon-large)] h-[var(--icon-large)]'
										/>
										<div className='hidden 2xl:block'>
											{link.text}
										</div>
									</div>
								</motion.div>
							</Link>
						)
					})}
				</div>
			</div>
			<motion.div
			whileHover={{ borderColor: "var(--card-highlight)" }}
			className={cn(
				'relative rounded-[var(--rounding-small)] p-[var(--padding-small)] cursor-pointer',
				'border-[3px] border-transparent'
			)}
			>	
				<div 
				onClick={handleLogout}
				className='relative flex items-center gap-[var(--gap-medium)] paragraph-large'
				>
					<Image 
					src={icons.logout}
					alt={`logout icon`}
					width={0}
					height={0}
					className='w-[var(--icon-large)] h-[var(--icon-large)]'
					/>
					<div className='hidden 2xl:block'>
						{'Logout'}
					</div>
				</div>
			</motion.div>
        </section>
    )
}

export default SideBar
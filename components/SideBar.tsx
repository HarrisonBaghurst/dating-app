'use client'

import { cn } from '@/lib/classUtils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { supabaseBrowser } from '@/lib/supabase/browserClient'

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
		}
	]
	
	const router = useRouter()
	
		async function handleLogout() {
			await supabaseBrowser.auth.signOut()
			router.push('/login')
		}

	const pathname = usePathname();

    return (
        <section className='w-[20dvw] h-screen bg-background-dark p-[var(--padding-large)] flex flex-col justify-between  fixed'>
            <div className='flex flex-col gap-[var(--gap-large)]'>
				<div className='flex justify-between'>
					<Image 
					src={'/icons/user-circle.svg'}
					alt={'user circle icon'}
					width={32}
					height={32}
					className='cursor-pointer'
					/>
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
										width={32}
										height={32}
										/>
										{link.text}
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
					src={'/icons/logout-2.svg'}
					alt={`logout icon`}
					width={32}
					height={32}
					/>
					{'Logout'}
				</div>
			</motion.div>
        </section>
    )
}

export default SideBar
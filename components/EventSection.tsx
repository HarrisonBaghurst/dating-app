import { CalendarEvent } from '@/types/event'
import React from 'react'
import Image from 'next/image'
import EventCard from './EventCard'


type EventSectionProps = { 
    title: string;
    events: CalendarEvent[];
    icon: string;
}

const EventSection = ({ title, events, icon }: EventSectionProps) => {
    return (
        <>
            {events.length !== 0 && 
                <div className='flex flex-col gap-[var(--gap-small)]'>
                    <div className='flex gap-[var(--gap-small)] items-center'>
                        <Image 
                        src={icon}
                        alt='deadline icon'
                        width={0}
                        height={0}
                        className='w-[var(--icon-large)] h-[var(--icon-large)]'
                        />
                        <h2 className='title-small font-enorm'>{title}</h2>	
                    </div>
                    {events.map((event, i) => (
                        <EventCard 
                        key={i}
                        id={event.id}
                        title={event.title}
                        location={event.location}
                        startTime={event.start_time}
                        endTime={event.end_time}
                        extraInfo={event.extra_info}
                        />
                    ))}
                </div>
            }
        </>
    )
}

export default EventSection
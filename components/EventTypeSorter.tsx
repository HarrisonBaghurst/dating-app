'use client'

import { useIcons } from '@/constants/icons';
import React, { useState } from 'react'
import toTitleCase from '@/lib/stringUtils';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from './SortableItem';
import Image from 'next/image';

type EventType = {
    id: string;
    icon: string;
}

const EventTypeSorter = () => {
    const icons = useIcons();
    
    const initialEvents: EventType[] = [
        { id: 'deadline', icon: icons.deadline },
        { id: 'reminder', icon: icons.reminder },
        { id: 'event', icon: icons.event },
        { id: 'all day', icon: icons.allDay},
    ]
    
    const [eventTypes, setEventTypes] = useState(initialEvents);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <div>
            <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => {
                const { active, over } = event;
                if (over && active.id !== over.id) {
                    setEventTypes((items) => {
                        const oldIndex = items.findIndex((i) => i.id === active.id);
                        const newIndex = items.findIndex((i) => i.id === over.id);
                        return arrayMove(items, oldIndex, newIndex)
                    })
                }
            }}
            >
                <SortableContext
                items={eventTypes.map((i) => i.id)}
                strategy={verticalListSortingStrategy}
                >
                    <div className='flex flex-col gap-[var(--gap-small)]'>
                        {eventTypes.map((event) => (
                            <SortableItem key={event.id} id={event.id}>
                                <div className='bg-card-grey p-[var(--padding-small)] rounded-[var(--rounding-small)] w-1/2 flex justify-between items-center'>
                                    <div className='flex gap-[var(--gap-medium)] items-center'>
                                        <Image 
                                        src={event.icon}
                                        alt='event icon'
                                        width={0}
                                        height={0}
                                        className='w-[var(--icon-large)] h-[var(--icon-large)]'
                                        />
                                        <p>{toTitleCase(event.id)}</p>
                                    </div>
                                    <Image 
                                    src={icons.drag}
                                    alt='event icon'
                                    width={0}
                                    height={0}
                                    className='w-[var(--icon-large)] h-[var(--icon-large)]'
                                    />
                                </div>
                            </SortableItem>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}

export default EventTypeSorter
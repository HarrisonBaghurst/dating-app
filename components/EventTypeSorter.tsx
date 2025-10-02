'use client'

import { useIcons } from '@/constants/icons';
import React from 'react'
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
import { useSettings } from '@/providers/SettingsProvider';
import { EventType } from '@/types/event';

const EventTypeSorter = () => {
    const icons = useIcons();
    const { eventTypeOrder, updateEventTypeOrder } = useSettings();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const initialEvents: EventType[] = [
        { id: 'deadline', icon: icons.deadline },
        { id: 'reminder', icon: icons.reminder },
        { id: 'event', icon: icons.event },
        { id: 'all day', icon: icons.allDay},
    ]
    

    if (!eventTypeOrder) {
        updateEventTypeOrder(initialEvents);
    }

    if (!eventTypeOrder) return null;
87
    return (
        <div>
            <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => {
                const { active, over } = event;
                if (over && active.id !== over.id) {
                    const oldIndex = eventTypeOrder.findIndex((i) => i.id === active.id);
                    const newIndex = eventTypeOrder.findIndex((i) => i.id === over.id);
                    const newOrder = arrayMove(eventTypeOrder, oldIndex, newIndex);
                    updateEventTypeOrder(newOrder);
                }
            }}
            >
                <SortableContext
                items={eventTypeOrder.map((i) => i.id)}
                strategy={verticalListSortingStrategy}
                >
                    <div className='flex flex-col gap-[var(--gap-small)]'>
                        {eventTypeOrder.map((event) => (
                            <SortableItem key={event.id} id={event.id}>
                                <div className='bg-background-light p-[var(--padding-small)] rounded-[var(--rounding-small)] flex justify-between items-center'>
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
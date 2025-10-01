'use client'

import { useSortable } from '@dnd-kit/sortable';
import React, { ReactNode } from 'react'
import { CSS } from "@dnd-kit/utilities";

type SortableItemProps = {
    id: string;
    children: ReactNode;
}

const SortableItem = ({ id, children }: SortableItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        touchAction: 'none',
    }

    return (
        <div 
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        >
            {children}
        </div>
    )
}

export default SortableItem
'use client'

import Loader from '@/components/Loader'
import { EventPayload } from '@/types/event'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const Page = () => {
    const router = useRouter();
    const params = useSearchParams();

    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const createEventFormParams = async () => {
            const title = params.get('title') || '';
            const date = params.get('date');
            const location = params.get('location') || '';
            const cost = params.get('cost') || '';
            const startTime = params.get('start-time') || '00:00';
            const endTime = params.get('end-time') || '00:00';
            const extraInfo = params.get('extra-info') || '';
            const eventType = params.get('event-type') as EventPayload['eventType'] | null;

            // validate required fields 
            const isValid =
                title &&
                date && (
                    (eventType === 'deadline' && startTime !== '00:00') ||
                    (eventType === 'reminder' && startTime !== '00:00') ||
                    (eventType === 'event' && startTime !== '00:00' && endTime !== '00:00' && location !== '') ||
                    eventType === 'all day' ||
                    eventType === 'birthday' ||
                    (eventType === 'bill' && cost !== '')
                );

            if (!isValid) {
                console.warn('Invalid or missing parameters in URL');
                router.replace('/');
                return;
            }

            const payload: EventPayload = {
                title,
                date,
                location,
                cost,
                startTime,
                endTime,
                extraInfo,
                eventType,
            };

            try {
                const res = await fetch('/api/events/post', {
                    credentials: 'include',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    const text = await res.text().catch(() => '');
                    throw new Error(`Failed to create event: ${text}`);
                }
                router.replace('/');

            } catch (err) {
                console.error('Error creating meeting: ', err);
                router.replace('/');
            }
        }
        createEventFormParams();

    }, [params, router])

    return (
        <div className='w-screen h-screen'>
            <Loader />
        </div>
    )
}

export default Page
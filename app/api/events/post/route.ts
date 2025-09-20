import { createClient } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

const supabase = await createClient();

export async function POST(request: Request) {
    try {
        const { title, date, location, startTime, endTime, extraInfo, remind, eventType } = await request.json();
    
        const { data, error } = await supabase
            .from('full-schedule')
            .insert([
                {
                    title,
                    date,
                    location,
                    start_time: startTime,
                    end_time: endTime,
                    extra_info: extraInfo,
                    remind,
                    type: eventType,
                }
            ])
            .select();
    
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    
        return NextResponse.json({ event: data }, { status: 201 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
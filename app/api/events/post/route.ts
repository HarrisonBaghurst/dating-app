import { createServerSupabaseClient } from '@/lib/supabase/serverClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const supabase = await createServerSupabaseClient();
    
    // validate user
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

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
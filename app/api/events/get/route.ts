import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
    const { month, year } = await request.json();

    if (month === null || month === undefined || year == null || year === undefined) {
        return NextResponse.json({ error: 'Missing month or year' }, { status: 400 });
    }

    const startDate = new Date(Number(year), Number(month), 1).toISOString();
    const endDate = new Date(Number(year), Number(month) + 1, 0).toISOString();

    const { data, error } = await supabase
        .from('full-schedule')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ events: data });
}
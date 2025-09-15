import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    if (!month || !year) {
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
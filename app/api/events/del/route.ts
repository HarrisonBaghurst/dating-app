import { createServerSupabaseClient } from '@/lib/supabase/serverClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const supabase = await createServerSupabaseClient();

    // validate user
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'missing id in request body' }, { status: 400 });
        }

        const { data, error } = await supabase 
            .from('full-schedule')
            .delete()
            .eq('id', id)
            .select();

        if (error) {
            console.error(error.message);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: 'item deleted successfully', data }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
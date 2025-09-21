import 'server-only'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

type CookieToSet = { name: string; value: string; options?: any }

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll().map((c) => ({ name: c.name, value: c.value }))
        },

        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieOptions: any = {}
            if (options?.path) cookieOptions.path = options.path
            if (options?.maxAge) cookieOptions.maxAge = options.maxAge
            if (options?.expires) cookieOptions.expires = options.expires
            if (options?.httpOnly !== undefined) cookieOptions.httpOnly = options.httpOnly
            if (options?.sameSite) cookieOptions.sameSite = options.sameSite
            if (options?.secure !== undefined) cookieOptions.secure = options.secure

            response.cookies.set(name, value, cookieOptions)
          })
        },
      },
    }
  )

  const { data, error } = await supabase.auth.getUser()

  return { response, user: data?.user ?? null, error }
}

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/browserClient'
import { Input } from '@/components/ui/input'
import Button from '@/components/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [clickable, setClickable] = useState(false);
  const searchParams = useSearchParams()
  const router = useRouter()

  const next = searchParams.get('next') || '/';

  useEffect(() => {
    if (email === '' || password === '') {
        setClickable(false);
        return;
    }
    setClickable(true);

  }, [email, password])

  async function handleSignIn() {
    setClickable(false);

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error(error.message);
      return
    }

    router.push(next)
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-background-light paragraph-large">
        <div className='bg-background-light p-[var(--padding-large)] rounded-[var(--rounding-large)] border-[3px] border-card-grey w-[35%] flex flex-col gap-[var(--gap-large)]'>
            <h1 className='title-large font-enorm'>
                Calendar Login
            </h1>
            <div className='flex flex-col gap-[var(--gap-small)]'>
                <Input 
                type='email'
                placeholder='Your Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button 
            text='Login'
            clickable={clickable}
            onClick={() => handleSignIn()}
            />
        </div>
    </div>
  )
}

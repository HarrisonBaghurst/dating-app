'use client'

import { supabaseBrowser } from '@/lib/supabase/browserClient';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import Button from './Button';

const LoginForm = () => {
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
            <div className='
            bg-card-grey p-[var(--padding-medium)] rounded-[var(--rounding-large)] flex flex-col gap-[var(--gap-large)] border-[1px] border-card-highlight
            w-[75%]
            2xl:w-[35%]
            '>
                <h1 className='title-small font-enorm'>
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

export default LoginForm
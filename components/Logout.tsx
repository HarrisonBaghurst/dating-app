'use client'

import { supabaseBrowser } from '@/lib/supabase/browserClient'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Logout = () => {
    const router = useRouter()

    async function handleLogout() {
        await supabaseBrowser.auth.signOut()
        router.push('/login')
    }
    return (
        <div 
        className='cursor-pointer rounded-full'
        onClick={handleLogout}
        >
            <Image 
            src={'/icons/user-circle.svg'}
            alt={'user circle icon'}
            width={32}
            height={32}
            />
        </div>
    )
}

export default Logout
import { icons } from '@/constants/icons'
import Image from 'next/image'
import React from 'react'

const Loader = () => {
    return (
        <div className='w-full h-full bg-background-light rounded-[var(--rounding-large)] flex justify-center items-center'>
            <Image 
			src={icons.loader}
			alt='rotating loader'
			width={64}
			height={64}
			className='animate-[spin-reverse_1s_linear_infinite]'
			/>
        </div>
    )
}

export default Loader
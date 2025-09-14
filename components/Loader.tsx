import Image from 'next/image'
import React from 'react'

const Loader = () => {
    return (
        <div className='w-full h-screen bg-background-light rounded-[var(--rounding-large)] flex justify-center items-center'>
            <Image 
			src={'/icons/loader-2.svg'}
			alt='rotating loader'
			width={64}
			height={64}
			className='animate-spin'
			/>
        </div>
    )
}

export default Loader
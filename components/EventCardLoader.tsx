import React from 'react'

const EventCardLoader = () => {
  return (
    <div className='dark-card-style p-[var(--padding-small)] flex gap-[var(--gap-small)] paragraph-small'>
        <div className='w-[2px] min-h-full bg-white opacity-15'/>
        <div className='flex flex-col gap-[var(--gap-small)] w-full'>
            <div className='flex gap-[var(--gap-small)] items-center'>
                <div className='w-[var(--icon-large)] h-[var(--icon-large)] bg-white opacity-15 rounded-full'/>
                <div className='font-enorm bg-white opacity-15 text-transparent rounded-full'>
                    This is where 
                </div>
            </div>
            <div className='font-enorm bg-white opacity-25 text-transparent rounded-full w-fit'>
                This is where the title goes
            </div>
            <div className='bg-white opacity-15 text-transparent rounded-full w-fit'>
                This is where 
            </div>
        </div>
    </div>
  )
}

export default EventCardLoader
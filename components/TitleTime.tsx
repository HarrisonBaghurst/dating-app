'use client'

import React, { useEffect, useState } from 'react'

const TitleTime = () => {
    const [time, setTime] = useState<null | Date>(null)

    useEffect(() => {
		// get month and year
		const tempTime = new Date();

		// set up the interval for updating the clock 
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		setTime(new Date());
			
		// remove interval on dismount
		return () => clearInterval(interval);
	}, []);

    if (!time) return null;
    
    return (
        <h2 className='title-small font-enorm'>
            {`${String(time.getHours()).padStart(2, '0')} : ${String(time.getMinutes()).padStart(2, '0')} : ${String(time.getSeconds()).padStart(2, '0')}`}
        </h2>
    )
}

export default TitleTime
"use client"

import React, { useEffect, useState } from "react"
import { Input } from "./ui/input"

type DatePickerProps = {
    defaultDate?: Date | null;
    onChange: (date: Date | null) => void;
};

const DatePicker = ({ defaultDate = null, onChange }: DatePickerProps) => {

    const [day, setDay] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [year, setYear] = useState<string>('');

    // set date, day, month, year
    useEffect(() => {
        const baseDate = defaultDate ?? new Date();
        setDay(baseDate.getDate().toString());
        setMonth((baseDate.getMonth() + 1).toString());
        setYear(baseDate.getFullYear().toString());
    }, [defaultDate])

    useEffect(() => {
        if (!day || !month || !year) {
            onChange(null);
            return;
        }

        const d = parseInt(day, 10);
        const m = parseInt(month, 10) - 1;
        const y = parseInt(year, 10);

        const newDate = new Date(y, m, d);

        if (
            newDate.getFullYear() === y && 
            newDate.getMonth() === m && 
            newDate.getDate() === d
        ) {
            onChange(newDate)
        }
        else {
            onChange(null);
        }

    }, [day, month, year])

    return (
        <div className="grid grid-cols-3 gap-[var(--gap-small)]">
            <Input 
            type="number"
            value={day}
            placeholder="DD"
            onChange={(e) => setDay(e.target.value)}
            />
            <Input 
            type="number"  
            value={month}
            placeholder="MM"
            onChange={(e) => setMonth(e.target.value)}
            />
            <Input 
            type="number"
            value={year}
            placeholder="YYYY"
            onChange={(e) => setYear(e.target.value)}
            />
        </div>
    )
}

export default DatePicker

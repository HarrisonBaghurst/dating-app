'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type InputTitles = 'show' | 'hide';

interface SettingsContextValue {
	theme: Theme;
	toggleTheme: () => void;
	inputTitles: InputTitles;
	toggleInputTitles: () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme | null>(null);
	const [inputTitles, setInputTitles] = useState<InputTitles | null>(null);

	useEffect(() => {

		// theme setup 
		const storedTheme = localStorage.getItem('theme') as Theme | null;
		if (storedTheme) {
			setTheme(storedTheme);
			document.documentElement.classList.toggle('dark', storedTheme === 'dark');
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const defaultTheme: Theme = prefersDark ? 'dark': 'light';
			setTheme(defaultTheme);
			document.documentElement.classList.toggle('dark', defaultTheme === 'dark');
		}

		// input titles setup 
		const storedInputTitles = localStorage.getItem('inputTitles') as InputTitles | null;
		if (storedInputTitles) {
			setInputTitles(storedInputTitles);
		} else {
			setInputTitles('show');
		}

	}, []);

	if (!theme || !inputTitles) return null;

	const toggleTheme = () => {
		const newTheme: Theme = theme === 'light' ? 'dark': 'light';
		setTheme(newTheme);
		document.documentElement.classList.toggle('dark', newTheme === 'dark');
		localStorage.setItem('theme', newTheme);
	};

	const toggleInputTitles = () => {
		const newInputTitles = inputTitles === 'hide' ? 'show': 'hide';
		setInputTitles(newInputTitles);
		localStorage.setItem('inputTitles', newInputTitles)
	}

	return (
		<SettingsContext.Provider value={{ theme, toggleTheme, inputTitles, toggleInputTitles }}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => {
	const context = useContext(SettingsContext);
	if (!context) throw new Error('useTheme must be used within ThemeProvider');
	return context;
};

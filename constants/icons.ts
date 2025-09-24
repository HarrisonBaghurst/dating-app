import { useTheme } from "@/providers/IconProvider";

const relative = '/icons/';
const darkRelative = '/icons-dark/'
const suffix = '-svgrepo-com.svg';

const expand = (rel: string) => (word: string) => {
    return `${rel}${word}${suffix}`
}

const light = {
    user: expand(relative)('user-circle'),
    home: expand(relative)('home-smile'),
    calendar: expand(relative)('calendar'),
    logout: expand(relative)('logout-3'),
    create: expand(relative)('calendar-add'),
    remove: expand(relative)('backspace'),
    deadline: expand(relative)('stopwatch-play'),
    reminder: expand(relative)('lightbulb'),
    event: expand(relative)('ticket'),
    allDay: expand(relative)('sunrise'),
    leftArrow: expand(relative)('round-alt-arrow-left'),
    loader: expand(relative)('refresh'),
    settings: expand(relative)('settings'),
    lightMode: expand(relative)('sun'),
    darkMode: expand(relative)('moon-stars'),
}

const dark = {
    user: expand(darkRelative)('user-circle'),
    home: expand(darkRelative)('home-smile'),
    calendar: expand(darkRelative)('calendar'),
    logout: expand(darkRelative)('logout-3'),
    create: expand(darkRelative)('calendar-add'),
    remove: expand(darkRelative)('backspace'),
    deadline: expand(darkRelative)('stopwatch-play'),
    reminder: expand(darkRelative)('lightbulb'),
    event: expand(darkRelative)('ticket'),
    allDay: expand(darkRelative)('sunrise'),
    leftArrow: expand(darkRelative)('round-alt-arrow-left'),
    loader: expand(darkRelative)('refresh'),
    settings: expand(darkRelative)('settings'),
    lightMode: expand(darkRelative)('sun'),
    darkMode: expand(darkRelative)('moon-stars'),
}

export const useIcons = () => {
    const { theme } = useTheme();
    return theme === 'dark' ? dark : light;
}
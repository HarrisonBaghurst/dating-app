const relative = '/icons/bold/';
const suffix = '-svgrepo-com.svg';

const expand = (word: string) => {
    return `${relative}${word}${suffix}`
}

export const icons = {
    user: expand('user-circle'),
    home: expand('home-smile'),
    calendar: expand('calendar'),
    logout: expand('logout-3'),
    create: expand('calendar-add'),
    remove: expand('backspace'),
    deadline: expand('stopwatch-play'),
    reminder: expand('lightbulb'),
    event: expand('ticket'),
    allDay: expand('sun'),
    leftArrow: expand('round-alt-arrow-left'),
    loader: expand('refresh'),
}
export const getOrdinal = (n: number) => {
    if (n % 100 >= 11 && n % 100 <= 13) return `th` // special case for 11th, 12th & 13th
    switch (n % 10) {
        case 1: return `st`
        case 2: return `nd`
        case 3: return `rd`
        default: return `th`
    }
}
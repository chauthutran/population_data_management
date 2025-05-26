export const formatNumber = (n: any) => {
    if(isNumber(n)) {
        const num = typeof n === 'string' ? parseFloat(n) : n;
        return new Intl.NumberFormat('en-US').format(num); // "1,234,567"
    }
    
    return n;
}

export const roundNumber = (value: number, decimalPlaces: number | null): number => {
    const places = decimalPlaces ?? 1; // use nullish coalescing for safety
    const factor = Math.pow(10, places);
    return Math.round(value * factor) / factor;
}

const isNumber = (value: any) => !isNaN(parseFloat(value));

export const formatNumber = (n: any) => {
    if(isNumber(n)) {
        const num = typeof n === 'string' ? parseFloat(n) : n;
        return new Intl.NumberFormat('en-US').format(num); // "1,234,567"
    }
    
    return n;
}

const isNumber = (value: any) => !isNaN(parseFloat(value));

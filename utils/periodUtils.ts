import { IPeriod, ISerializePeriod } from '@/types/definations';

export const generatePeriodsByType = (
    periodType: string,
    year: number,
): ISerializePeriod[] => {
    return periodType === 'Yearly'
        ? generateYears(year)
        : generateMonthsInYear(year);
};

export const getCurrentYear = () => {
    return new Date().getFullYear();
};

export const generatePeriodsByCode = (codes: string[]): ISerializePeriod[] => {
    const result: ISerializePeriod[] = [];
    for (var i = 0; i < codes.length; i++) {
        const period = serializePeriod(generatePeriodByCode(codes[i]));
        result.push(period);
    }
    return result;
};
/**
 *
 * @param code
 *          For monthly period, code should be "YYYYMM", such as 202501 for "Jan 2025".
 *          For yearly period, code should be "YYYY", such as 2025 for "2025".
 */
export const generatePeriodByCode = (code: string): IPeriod => {
    if (code.length == 6) {
        // Monthy period
        const year = code.substring(0, 4);
        const month = code.substring(4, 8);
        const monthIdx = parseInt(month) - 1;

        // Start Date for the first day of the month
        const startDate = new Date(`${year}-${month}-01T00:00:00`);

        // Create endDate by moving to the next month and subtracting 1 millisecond
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0); // Sets it to the last day of the previous month
        endDate.setHours(23, 59, 59, 999); // Set time to the end of the day

        return {
            name: `${MONTHS[monthIdx]} ${year}`,
            code,
            startDate,
            endDate,
        } as IPeriod;
    }

    return {
        name: code,
        code: code,
        startDate: new Date(`${code}-01-01T00:00:00`),
        endDate: new Date(`${code}-12-31T23:59:59.999`),
    } as IPeriod;
};

export const serializePeriod = (period: IPeriod): ISerializePeriod => {
    return {
        ...period,
        startDate: period.startDate.toISOString(),
        endDate: period.endDate.toISOString(),
    } as ISerializePeriod;
};

// Use for Fetching from the Database
export const deserializePeriod = (period: ISerializePeriod): IPeriod => {
    return {
        ...period,
        startDate: new Date(period.startDate), // Convert back to Date
        endDate: new Date(period.endDate), // Convert back to Date
    };
};

export const sortPeriods = (periods: ISerializePeriod[]) => {
    return [...periods].sort((a, b) => a.code.localeCompare(b.code));
};

// ==================================================================================
// Supportive methods

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const generateMonthsInYear = (year: number): ISerializePeriod[] => {
    const periods: ISerializePeriod[] = [];

    for (var i = 0; i < 12; i++) {
        let month = i + 1;
        const monthStr = (month + '').padStart(2, '0');
        const code = `${year}${monthStr}`;

        const period: ISerializePeriod = serializePeriod(
            generatePeriodByCode(code),
        );
        periods.push(period);
    }

    return periods.reverse();
};

const generateYears = (endYear: number): ISerializePeriod[] => {
    const periods: ISerializePeriod[] = [];

    const startYear = endYear - 10;
    for (var year = startYear; year <= endYear; year++) {
        const period: ISerializePeriod = serializePeriod(
            generatePeriodByCode(`${year}`),
        );
        periods.push(period);
    }

    return periods.reverse();
};

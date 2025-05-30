import { IPeriod, ISerializePeriod, JSONObject } from '@/types/definations';

export const generatePeriodsByType = (
    periodType: string,
    year: number,
): ISerializePeriod[] => {
    return periodType === 'Yearly'
        ? generateYears(year)
        : generateMonthsInYear(year);
};

export const generatePeriodsByDateRange = (start: string, end: string, periodType: string): IPeriod[] => {
    const result: IPeriod[] = [];
    
    let { startDate: cursor, endDate } = normalizeWitDateRangeInterval({from: start, to: end, type: periodType});
  
    while (cursor <= endDate) {
        const year  = cursor.getFullYear();
        let code: string, periodStart: Date, periodEnd: Date;
    
        if (periodType === "Monthly") {
            const month = cursor.getMonth() + 1; // 1–12
            code = `${year}${String(month).padStart(2, "0")}`;
            periodStart = new Date(year, month - 1, 1);
            // last day of this month:
            periodEnd = new Date(year, month, 0);
            // advance cursor to start of next month:
            cursor = new Date(year, month, 1);
        } else {
            // yearly
            code = `${year}`;
            periodStart = new Date(year, 0, 1);
            periodEnd   = new Date(year, 11, 31);
            // advance cursor to Jan 1 next year
            cursor = new Date(year + 1, 0, 1);
        }
    
        // only include this period if it overlaps [start,end] at all
        if (periodEnd >= new Date(start) && periodStart <= endDate) {
            const period = generatePeriodByCode(code);
            result.push(period);
        }
    }
      
    return result;
}

const normalizeWitDateRangeInterval = ({from, to, type}: JSONObject): JSONObject => {
    // witInterval: { from:{...}, to:{ grain:"year", value:"YYYY-01-01..." }, type:"interval" }
    const startDate = new Date(from);
    
    let endDate = new Date(to);
    if (type === "Yearly") { // subtract 1 because 'to' is start of next year
        endDate.setFullYear(endDate.getFullYear() - 1);
    }
    else if (type === "Monthly") {
        endDate.setMonth(endDate.getMonth() - 1);
    }
  
    return { startDate, endDate };
  }
  
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
    // Monthy period
    if (isMonthlyPeriod(code)) {
        const { year, month } = extractYearAndMonthFromCode(code);
        const monthIdx = parseInt(month!) - 1;

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

export const getNextPeriod = (code: string): IPeriod => {
    let { year, month } = extractYearAndMonthFromCode(code);
    // For Monthly period
    if( month != null ) {
        if( eval(month) === 12 ) {
            year = String(Number(year) + 1);
        }
        else {
            month = String(Number(month) + 1);
            month = month.padStart(2, '0');
        }
    }
    else {
        year = String(Number(year) + 1);
        month = "";
    }
    
    return generatePeriodByCode(year + month);
}


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

const formatDate = (d: Date) => {
    return d.toISOString().slice(0, 10);
}

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

const isMonthlyPeriod = (code: string): boolean => {
    return (code.length == 6);
}

const extractYearAndMonthFromCode = (code: string ): Record<string, string | null> => {
    const year = code.substring(0, 4);
    let month = null;
    if( isMonthlyPeriod(code) ) {
        month = code.substring(4, 8);
    }
    
    return { year, month: month};
}
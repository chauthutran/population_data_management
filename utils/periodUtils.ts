import { IPeriod, ISerializePeriod } from "@/types/definations";

export const generatePeriodsByType = (periodType: string, year: number): ISerializePeriod[] => {
    return (periodType === "Yearly") ? generateMonthsInYear(year) : generateYears(year);
}

export const getCurrentYear = () => {
    return (new Date()).getFullYear();
}

export const serializePeriod = (period: IPeriod): ISerializePeriod => {
    return {
        ...period,
        startDate: period.startDate.toISOString(),
        endDate: period.endDate.toISOString(),
    } as ISerializePeriod;
}

// Use for Fetching from the Database
export const deserializePeriod = (period: ISerializePeriod): IPeriod => {
    return {
        ... period,
        startDate: new Date(period.startDate),// Convert back to Date
        endDate: new Date(period.endDate), // Convert back to Date
    }
}


const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const generateMonthsInYear = (year: number): ISerializePeriod[] => {
    const periods: ISerializePeriod[] = [];
    
    for( var i=0; i<12; i++) {
        const name = `${MONTHS[i]} ${year}`;
        
        let month = i + 1;
        const monthStr = (month + "").padStart(2, "0");
        
        // Start Date for the first day of the month
        const startDate = new Date(`${year}-${monthStr}-01T00:00:00`);
        
        // Create endDate by moving to the next month and subtracting 1 millisecond
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0); // Sets it to the last day of the previous month
        endDate.setHours(23, 59, 59, 999); // Set time to the end of the day
        
        const period: ISerializePeriod = {
            name,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        }
        
        periods.push(period);
    }
    
    return periods;
}

const generateYears = (endYear: number): ISerializePeriod[] => {
    const periods: ISerializePeriod[] = [];
    
    const startYear = endYear - 10;
    for (var year=startYear; year<=endYear; year++) {
        const period: ISerializePeriod = {
            name: `${year}`,
            startDate: new Date(`${year}-01-01T00:00:00`).toISOString(),
            endDate: new Date(`${year}-12-31T23:59:59.999`).toISOString()
        }
        
        periods.push(period);
    }
    
    return periods;
}
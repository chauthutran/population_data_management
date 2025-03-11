"use server";

import Period from "@/libs/db/schemas/PeriodSchema";
import { IPeriod } from "@/types/definations";
import { generatePeriodByCode } from "@/utils/periodUtils";

export const getOrCreatePeriod = async (code: string): Promise<IPeriod> => {
    let periodDbObj = Period.findOne({code});
    
    if (!periodDbObj) {
        const payload = generatePeriodByCode(code);
        periodDbObj = await Period.create(payload);
    }
    
    return periodDbObj;
}
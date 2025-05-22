'use server';

import Period from '@/libs/db/schemas/PeriodSchema';
import { IPeriod } from '@/types/definations';
import { generatePeriodByCode } from '@/utils/periodUtils';

export const getOrCreatePeriod = async (code: string): Promise<IPeriod> => {
    let periodDbObj = await Period.findOne({ code });
    if (!periodDbObj) {
        const periodObj = generatePeriodByCode(code);
        periodDbObj = await Period.create(periodObj);
    }

    // console.log('DB: ', periodDbObj._id);
    return periodDbObj;
};

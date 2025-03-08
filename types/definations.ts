export type JSONObject = { [key: string]: any };

export type IOrgUnit = {
    _id: string;
    name: string;
    parent: string | null;
    level: number;
}

export type IPeriodType = {
    _id: string;
    name: string;
}

export type IDataElement = {
    _id: string;
    name: string;
    shortName: string;
}

export type IPeriod = {
    name: string;
    startDate: Date;
    endDate: Date;
}

export type IDataSet = {
    _id: string;
    name: string;
    dataElements: IDataElement[];
    periodType: IPeriodType;
    orgUnits: IOrgUnit[];
}
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

// Used for Database Layer (IPeriod type)
export type IPeriod = {
    _id?: string;
    code: string;
    name: string;
    startDate: Date;
    endDate: Date;
}

// Used for UI Layer / Redux Layer (ISerializePeriod type)
export type ISerializePeriod = {
    _id?: string;
    code: string;
    name: string;
    startDate: string;
    endDate: string;
}

export type IDataSet = {
    _id: string;
    name: string;
    dataElements: IDataElement[];
    periodType: IPeriodType;
    orgUnits: IOrgUnit[];
}

export type IUser = {
    _id: string;
    username: string;
}

export type IApprovalData = {
    _id: string;
    dataSet: IDataSet,
    period: IPeriod,
    approvedBy: IUser,
    approvedDate: Date,
    acceptedBy: IUser,
    acceptedDate: Date,
}

export type IDataValue = {
    _id: string,
    dataElement: IDataElement,
    period: IPeriod,
    orgUnit: IOrgUnit,
    value: string,
}
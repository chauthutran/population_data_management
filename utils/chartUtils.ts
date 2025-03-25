import { IChartAxist, IChartData, IDataElement, ISerializePeriod, JSONObject } from "@/types/definations";
import { post } from "./apiClient";
import { CHART_AXIST_DATA_ELEMENTS, CHART_AXIST_ORGUNITS, CHART_AXIST_PERIODS } from "@/constants";
import { sortPeriods } from "./periodUtils";
import { sortList } from "./arrayUtils";

export const retrieveAndTransformData = async (periodCodes: string[], dataElementIds: string[], orgUnitId: string, orgUnitLevel: number): Promise<JSONObject[]> => {
    const payload = {
        periods: periodCodes,
        dataElements: dataElementIds,
        orgUnit: orgUnitId,
        orgUnitLevel: orgUnitLevel
    }

    return await post<JSONObject[], any>("/api/charts", payload);
}

// Transform data

export const transformData = (
    data: JSONObject[], 
    axisX: IChartAxist[], 
    axisY: IChartAxist[], 
    orgUnits: JSONObject[], 
    dataElements: IDataElement[], 
    periods: ISerializePeriod[]
): IChartData => {
    
    const sortedPeriods = sortPeriods(periods);
    const sortedOrgUnits = sortList(orgUnits, "name");
    const sortedDataElements = sortList(dataElements, "name");
    
    const xIds = axisX.map(item => item._id);
    const yIds = axisY.map(item => item._id);

    if (xIds.length === 1 && xIds.includes(CHART_AXIST_ORGUNITS._id) 
        && yIds.length === 1 && yIds.includes(CHART_AXIST_PERIODS._id)) {
        return transformData_OuX_PeY(data, sortedOrgUnits, sortedPeriods);
    }
    if (xIds.length === 1 && xIds.includes(CHART_AXIST_ORGUNITS._id) 
        && yIds.length === 1 && yIds.includes(CHART_AXIST_DATA_ELEMENTS._id)) {
        return transformData_OuX_DeY(data, sortedOrgUnits, sortedDataElements);
    }
    if (xIds.length === 1 && xIds.includes(CHART_AXIST_ORGUNITS._id) 
        && yIds.length === 2 && yIds.includes(CHART_AXIST_DATA_ELEMENTS._id) && yIds.includes(CHART_AXIST_PERIODS._id)) {
        return transformData_OuX_DeAndPeY(data, sortedOrgUnits, sortedDataElements, sortedPeriods)
    }
    
    
    if (xIds.length === 1 && xIds.includes(CHART_AXIST_PERIODS._id) 
        && yIds.length === 1 && yIds.includes(CHART_AXIST_DATA_ELEMENTS._id)) {
        return transformData_PeX_DeY(data, sortedPeriods, sortedDataElements)
    }
    if (xIds.length === 1 && xIds.includes(CHART_AXIST_PERIODS._id) 
        && yIds.length === 1 && yIds.includes(CHART_AXIST_ORGUNITS._id)) {
        return transformData_PeX_OuY(data, sortedOrgUnits, sortedPeriods)
    }
    if (xIds.length === 1 && xIds.includes(CHART_AXIST_PERIODS._id) 
        && yIds.length == 2 && yIds.length == 2 && yIds.includes(CHART_AXIST_DATA_ELEMENTS._id) && yIds.includes(CHART_AXIST_ORGUNITS._id)) {
        return transformData_PeX_OuAndDeY(data, sortedOrgUnits, sortedDataElements, sortedPeriods)
    }
    
    
    if (xIds.length === 1 && xIds.includes(CHART_AXIST_DATA_ELEMENTS._id) 
        && yIds.length === 1 && yIds.includes(CHART_AXIST_ORGUNITS._id)) {
        return transformData_DeX_OuY(data, sortedOrgUnits, sortedDataElements);
    }
    if (xIds.length === 1 && xIds.includes(CHART_AXIST_DATA_ELEMENTS._id) 
        && yIds.length === 1 && yIds.includes(CHART_AXIST_PERIODS._id)) {
        return transformData_DeX_PeY(data, sortedDataElements, sortedPeriods);
    }
    if (xIds.length === 1 && xIds.includes(CHART_AXIST_DATA_ELEMENTS._id) 
        && yIds.length === 2 && yIds.includes(CHART_AXIST_ORGUNITS._id) && yIds.includes(CHART_AXIST_PERIODS._id)) {
        return transformData_DeX_OuAndPeY(data, sortedOrgUnits, sortedDataElements, sortedPeriods);
    }
    
    
    if (xIds.length === 2 && xIds.includes(CHART_AXIST_ORGUNITS._id) && xIds.includes(CHART_AXIST_DATA_ELEMENTS._id) 
        && yIds.length == 1 && yIds.includes(CHART_AXIST_PERIODS._id)) {
        return transformData_OuAndDeX_PeY(data, sortedOrgUnits, sortedDataElements, sortedPeriods)
    }
    if (xIds.length === 2 && xIds.includes(CHART_AXIST_ORGUNITS._id) && xIds.includes(CHART_AXIST_PERIODS._id) 
        && yIds.length === 2 && yIds.includes(CHART_AXIST_DATA_ELEMENTS._id)) {
        return transformData_OuAndPeX_DeY(data, sortedOrgUnits, sortedDataElements, sortedPeriods);
    } 
    if (xIds.length === 1 && xIds.includes(CHART_AXIST_DATA_ELEMENTS._id) && xIds.includes(CHART_AXIST_PERIODS._id) 
        && yIds.length === 1 && yIds.includes(CHART_AXIST_ORGUNITS._id)) {
        return transformData_DeAndPeX_OuY(data, sortedOrgUnits, sortedDataElements, sortedPeriods);
    }

    return {chartData:[], axisY: []} as IChartData;
}

// OrgUnits in Axis X

/**
* convert data to [
* 		{
    * 		orgUnit: '<OrgUnit Name>',
    * 		<period 1>: sum(DE-Value1, DE-Value2, ... ),
    * 		<period 2>: sum(DE-Value1, DE-Value2, ... ),
    * 		...
* 		}
* ]
*/
const transformData_OuX_PeY = (data: JSONObject[], orgUnits: JSONObject[], periods: ISerializePeriod[]): IChartData => {
    const result: JSONObject[] = [];
    
    for( var i=0; i<orgUnits.length; i++ ) {
        const orgUnitData = orgUnits[i];
        const item: JSONObject = { axisX: orgUnitData.name };
        
        const dataValuesByOU = getDataValuesByOrgUnit(data, orgUnitData);
        for( var j=0; j<periods.length; j++ ) {
            const period = periods[j];
            const dataValuesByDE = getDataValuesByPeriod(dataValuesByOU, period);
            const total = dataValuesByDE.reduce((sum, dataValue) => sum + (dataValue.value || 0), 0);
            
            item[period.name] = total;
        }
        result.push(item);
    }
    
    return { chartData: result, axisY: periods.map((item) => item.name) };
}


/**
* convert data to [
* 		{
    * 		orgUnit: '<OrgUnit Name>',
    * 		<DE 1>: sum(Period-Value1, Period-Value2, ... ),
    * 		<DE 2>: sum(Period-Value1, Period-Value2, ... ),
* 		    ...
* 		}
* ]
*/
const transformData_OuX_DeY = (data: JSONObject[], orgUnits: JSONObject[], dataElements: IDataElement[]): IChartData => {
    const result: JSONObject[] = [];
    for( var i=0; i<orgUnits.length; i++ ) {
        const orgUnitData = orgUnits[i];
        const item: JSONObject = { axisX: orgUnitData.name };
        
        const dataValuesByOU = getDataValuesByOrgUnit(data, orgUnitData);
        for( var j=0; j<dataElements.length; j++ ) {
            const dataElement = dataElements[j];
            const dataValuesByDE = getDataValuesByDataElement(dataValuesByOU, dataElement);
            const total = sumValues(dataValuesByDE);
            
            item[dataElement.name] = total;
        }
            
        result.push(item);
    }
    
    return { chartData: result, axisY: dataElements.map((item) => item.name) };
}


/**
* convert data to [
* 		{
    * 		axisX: '<OrgUnit Name>',
    * 		<DE 1 - Period 1>: value1,
    * 		<DE 2 - Period 1>: value2,
* 		    ...
* 		}
* ]
*/
const transformData_OuX_DeAndPeY = (data: JSONObject[], orgUnits: JSONObject[], dataElements: IDataElement[], periods: ISerializePeriod[]): IChartData => {
    const result: JSONObject[] = [];
    
    const axisYList = mergeArray("dataElement", dataElements, "period", periods);
    
    for( var i=0; i<orgUnits.length; i++ ) {
        const orgUnitData = orgUnits[i];
        const item: JSONObject = { axisX: orgUnitData.name };
        
        const dataValuesByOU = getDataValuesByOrgUnit(data, orgUnitData);
        for( var j=0; j<axisYList.length; j++ ) {
            const axisYItem = axisYList[j];
            const dataValuesByDE = getDataValuesByDE_Period(dataValuesByOU, axisYItem["period"], axisYItem["dataElement"]);
            const total = sumValues(dataValuesByDE);
            
            const axisYName = `${axisYItem["period"].name}-${axisYItem["dataElement"].name}`;
            item[axisYName] = total;
        }
            
        result.push(item);
    }
    
    return { chartData: result, axisY: axisYList.map((item) => `${item["period"].name}-${item["dataElement"].name}`) };
}

// -------------- Periods in Axis X

/**
* convert data to [
* 		{
    * 		axisX: '<Period name>',
    * 		<orgUnit 1>: sum(DE1-Value1, DE2-Value2),
    * 		<orgUnit 2>: sum(DE1-Value3, DE2-Value4),
* 		    ...
* 		}
* ]
*/
const transformData_PeX_OuY = (data: JSONObject[], orgUnits: JSONObject[], periods: ISerializePeriod[]): IChartData => {
    const result: JSONObject[] = [];
    for( var i=0; i<periods.length; i++ ) {
        const period = periods[i];
        const item: JSONObject = { axisX: period.name };
        
        const dataValuesByPeriod = getDataValuesByPeriod(data, period);
        for( var j=0; j<orgUnits.length; j++ ) {
            const orgUnitData = orgUnits[j];
            const dataValuesByOU = getDataValuesByOrgUnit(dataValuesByPeriod, orgUnitData);
            const total = dataValuesByOU.reduce((sum, dataValue) => sum + (dataValue.value || 0), 0);
            
            item[orgUnitData.name] = total;
        }
            
        result.push(item);
    }
    
    return { chartData: result, axisY: orgUnits.map((item) => item.name) };
}

/**
* convert data to [
* 		{
    * 		axisX: '<Period name>',
    * 		<DE 1>: sum(OU1-Value1, OU1-Value2),
    * 		<DE 2>: sum(OU1-Value3, OU1-Value4),
* 		    ...
* 		}
* ]
*/
const transformData_PeX_DeY = (data: JSONObject[], periods: ISerializePeriod[], dataElements: IDataElement[]): IChartData => {
    const result: JSONObject[] = [];
    for( var i=0; i<periods.length; i++ ) {
        const period = periods[i];
        const item: JSONObject = { axisX: period.name };
        
        const dataValuesByPeriod = getDataValuesByPeriod(data, period);
        for( var j=0; j<dataElements.length; j++ ) {
            const dataElement = dataElements[j];
            const dataValuesByDE = getDataValuesByDataElement(dataValuesByPeriod, dataElement);
            const total = dataValuesByDE.reduce((sum, dataValue) => sum + (dataValue.value || 0), 0);
            
            item[period.name] = total;
        }
            
        result.push(item);
    }
    
    return { chartData: result, axisY: periods.map((item) => item.name) };
}

/**
* convert data to [
* 		{
    * 		period: '<Period name>',
    * 		<OU 1-DE 1>: value1,
    * 		<OU 1-DE 2>: value2,
    * 		<OU 2-DE 1>: value3,
* 		    ...
* 		}
* ]
*/
const transformData_PeX_OuAndDeY = (data: JSONObject[], orgUnits: JSONObject[], dataElements: IDataElement[], periods: ISerializePeriod[]): IChartData => {
    const result: JSONObject[] = [];
    const axisYList = mergeArray("orgUnit", orgUnits, "dataElement", dataElements);
    
    for( var i=0; i<periods.length; i++ ) {
        const period = periods[i];
        const item: JSONObject = { axisX: period.name };
        
        const dataValuesByPeriod = getDataValuesByPeriod(data, period);
        console.log("=== axisYList : ", axisYList)
        for( var j=0; j<axisYList.length; j++ ) {
            const axisYItem = axisYList[j];
            const dataValuesByOU_PE = getDataValuesByOU_DE(dataValuesByPeriod, axisYItem["orgUnit"], axisYItem["dataElement"]);
            const total = sumValues(dataValuesByOU_PE);
            
            const axisYName = `${axisYItem["orgUnit"].name}-${axisYItem["dataElement"].name}`;
            item[axisYName] = total;
        }
            
        result.push(item);
    }
    
    return { chartData: result, axisY: axisYList.map((item) => `${item["orgUnit"].name}-${item["dataElement"].name}`) };
}


// Data Element in Axis X

/**
* convert data to [
* 		{
    * 		dataElement: '<DE name>',
    * 		<OU 1>: sum(Period1 - value1, Period2 - value2, ...),
    * 		<OU 2>: sum(Period1 - value3, Period2 - value4, ...),
* 		    ...
* 		}
* ]
*/
const transformData_DeX_OuY = (data: JSONObject[], orgUnits: JSONObject[], dataElements: IDataElement[]): IChartData => {
    const result: JSONObject[] = [];
    
    for( var i=0; i<dataElements.length; i++ ) {
        const dataElement = dataElements[i];
        const item: JSONObject = { axisX: dataElement.name };
        
        const dataValuesByDE = getDataValuesByDataElement(data, dataElement);
        for( var j=0; j<orgUnits.length; j++ ) {
            const orgUnitData = orgUnits[j];
            const dataValuesByOU = getDataValuesByOrgUnit(dataValuesByDE, orgUnitData);
            const total = dataValuesByOU.reduce((sum, dataValue) => sum + (dataValue.value || 0), 0);
            
            item[orgUnitData.name] = total;
        }
            
        result.push(item);
    }
    
    return { chartData: result, axisY: orgUnits.map((item) => item.name) };
}

/**
* convert data to [
* 		{
    * 		dataElement: '<DE name>',
    * 		<Period 1>: sum(OU 1 - value1, OU 2 - value2, ...), // the same DE and period, sum values of orgUnits
    * 		<Period 2>: sum(OU 1 - value3, OU 2 - value4, ...),
* 		    ...
* 		}
* ]
*/
const transformData_DeX_PeY = (data: JSONObject[], dataElements: IDataElement[], periods: ISerializePeriod[]): IChartData => {
    const result: JSONObject[] = [];
    
    for( var i=0; i<dataElements.length; i++ ) {
        const dataElement = dataElements[i];
        const item: JSONObject = { axisX: dataElement.name };
        
        const dataValuesByDE = getDataValuesByDataElement(data, dataElement);
        for( var j=0; j<periods.length; j++ ) {
            const period = periods[j];
            const dataValuesByOU = getDataValuesByPeriod(dataValuesByDE, period);
            const total = dataValuesByOU.reduce((sum, dataValue) => sum + (dataValue.value || 0), 0);
            
            item[period.name] = total;
        }
            
        result.push(item);
    }
    
    return { chartData: result, axisY: periods.map((item) => item.name) };
}

/**
* convert data to [
* 		{
    * 		dataElement: '<DE name>',
    * 		<Period 1 - OU 1>: value1
    * 		<Period 2 - OU 2>: value2
* 		    ...
* 		}
* ]
*/
const transformData_DeX_OuAndPeY = (data: JSONObject[], orgUnits: JSONObject[], dataElements: IDataElement[], periods: ISerializePeriod[]) : IChartData=> {
    const result: JSONObject[] = [];
    const axisYList = mergeArray("orgUnit", orgUnits, "period", periods);
    
    for( var i=0; i<dataElements.length; i++ ) {
        const dataElement = dataElements[i];
        const item: JSONObject = { axisX: dataElement.name };
        
        const dataValuesByPeriod = getDataValuesByDataElement(data, dataElement);
        for( var j=0; j<axisYList.length; j++ ) {
            const axisYItem = axisYList[j];
            const dataValuesByOU_PE = getDataValuesByOU_Period(dataValuesByPeriod, axisYItem["orgUnit"], axisYItem["period"]);
            const total = sumValues(dataValuesByOU_PE);
            
            const axisYName = `${axisYItem["orgUnit"].name}-${axisYItem["period"]}`;
            item[axisYName] = total;
        }
            
        result.push(item);
    }
    
    return { chartData: result, axisY: axisYList.map((item) => `${item["orgUnit"].name}-${item["period"].name}`)  };
}

// OrgUnits and DatElements in Axis X

/**
* convert data to [
* 		{
    * 		<OU1-DE1>: '<OU Name - DE name>',
    * 		<Period 1>: value1
    * 		<Period 2>: value2
* 		    ...
* 		}
* ]
*/
const transformData_OuAndDeX_PeY = (data: JSONObject[], orgUnits: JSONObject[], dataElements: IDataElement[], periods: ISerializePeriod[]): IChartData => {
    const result: JSONObject[] = [];
    
    const axisXList = mergeArray("orgUnit", orgUnits, "dataElement", dataElements);
 console.log("=== axisXList : ", axisXList);   
    for( var i=0; i<axisXList.length; i++ ) {
        const axisXItem = axisXList[i];
        
        const item: JSONObject = { axisX: `${axisXItem["orgUnit"].name} - ${axisXItem["dataElement"].name}` };
        
        const dataValuesByPeriod = getDataValuesByOU_DE(data, axisXItem["orgUnit"], axisXItem["dataElement"]);
        for( var j=0; j<periods.length; j++ ) {
            const period = periods[j];
            const dataValuesByPE = getDataValuesByPeriod(dataValuesByPeriod, period);
            const total = sumValues(dataValuesByPE);
            
            item[period.name] = total;
        }
            
        result.push(item);
    }
    
    return { chartData: result, axisY: periods.map((item) => item.code) };
}

// OrgUnits and Periods in Axis X
/**
* convert data to [
* 		{
    * 		<OU1-PE1>: '<OU Name - PE name>',
    * 		<DE 1>: value1
    * 		<DE 2>: value2
* 		    ...
* 		}
* ]
*/
const transformData_OuAndPeX_DeY = (data: JSONObject[], orgUnits: JSONObject[], dataElements: IDataElement[], periods: ISerializePeriod[]): IChartData => {
    const result: JSONObject[] = [];
    
    const axisXList = mergeArray("orgUnit", orgUnits, "period", periods);
    
    for( var i=0; i<axisXList.length; i++ ) {
        const axisXItem = axisXList[i];
        
        const item: JSONObject = { axisX: `${axisXItem["orgUnit"].name} - ${axisXItem["period"].name}` };
        
        const dataValuesByOU_PE = getDataValuesByOU_Period(data, axisXItem["orgUnit"], axisXItem["period"]);
        for( var j=0; j<dataElements.length; j++ ) {
            const dataElement = dataElements[j];
            const dataValuesByDE = getDataValuesByDataElement(dataValuesByOU_PE, dataElement);
            const total = sumValues(dataValuesByDE);
            
            item[dataElement.name] = total;
        }
            
        result.push(item);
    }
    
    return { chartData: result, axisY: periods.map((item) => item.code) };
}

// DatElements and Periods in Axis X
/**
* convert data to [
* 		{
    * 		<DE1-PE1>: '<DE Name - PE name>',
    * 		<OU 1>: value1
    * 		<OU 2>: value2
* 		    ...
* 		}
* ]
*/
const transformData_DeAndPeX_OuY = (data: JSONObject[], orgUnits: JSONObject[], dataElements: IDataElement[], periods: ISerializePeriod[]): IChartData => {
    const result: JSONObject[] = [];
    
    const axisXList = mergeArray("dataElement", orgUnits, "period", periods);
    
    for( var i=0; i<axisXList.length; i++ ) {
        const axisXItem = axisXList[i];
        
        const item: JSONObject = { axisX: `${axisXItem["dataElement"].name} - ${axisXItem["period"].name}` };
        
        const dataValuesByOU_PE = getDataValuesByDE_Period(data, axisXItem["dataElement"], axisXItem["period"]);
        for( var j=0; j<orgUnits.length; j++ ) {
            const orgUnitData = orgUnits[j];
            const dataValuesByOU = getDataValuesByOrgUnit(dataValuesByOU_PE, orgUnitData);
            const total = sumValues(dataValuesByOU);
            
            item[orgUnitData.name] = total;
        }
            
        result.push(item);
    }
    
    return { chartData: result, axisY: orgUnits.map((item) => item.name) };
}

const getDataValuesByOrgUnit = (data: JSONObject[], orgUnitData: JSONObject) => {
    return data.filter((dataValue: JSONObject) => dataValue.orgUnit === orgUnitData._id);
}

const getDataValuesByDataElement = (data: JSONObject[], dataElement: IDataElement) => {
    return data.filter((dataValue: JSONObject) => dataValue.dataElement._id === dataElement._id);
}

const getDataValuesByPeriod = (data: JSONObject[], period: ISerializePeriod) => {
    return data.filter((dataValue: JSONObject) => dataValue.period.code === period.code);
}

const sumValues = (data: JSONObject[]): number => {
    return data.reduce((sum, dataValue) => sum + (dataValue.value || 0), 0);
}

const getDataValuesByOU_Period = (data: JSONObject[], orgUnit: JSONObject, period: ISerializePeriod) => {
    return data.filter((dataValue: JSONObject) => dataValue.orgUnit === orgUnit._id && dataValue.period.code === period.code);
}

const getDataValuesByDE_Period = (data: JSONObject[], period: ISerializePeriod, dataElement: IDataElement) => {
    return data.filter((dataValue: JSONObject) => dataValue.dataElement._id === dataElement._id && dataValue.period.code === period.code);
}

const getDataValuesByOU_DE = (data: JSONObject[], orgUnit: JSONObject, dataElement: IDataElement) => {
    return data.filter((dataValue: JSONObject) => dataValue.orgUnit === orgUnit._id && dataValue.dataElement._id === dataElement._id);
}

const mergeArray = (key1: string, list1: any[], key2: string, list2: any[]): JSONObject[] => {
    return list1.flatMap(data1 => 
        list2.map(data2 => ({
            [key1]: data1,
            [key2]: data2
        }))
    );
}

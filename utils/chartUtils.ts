import { IDataElement, IOrgUnit, ISerializePeriod, JSONObject } from "@/types/definations";
import { post } from "./apiClient";

export const retrieveAndTransformData = async (periods: ISerializePeriod[], dataElements: IDataElement[], orgUnit: IOrgUnit, orgUnitLevel: JSONObject): Promise<JSONObject[]> => {

    const payload = {
                periods: periods.map((item) => item.code),
                dataElements: dataElements.map((item) => item._id),
                orgUnit: orgUnit._id,
                orgUnitLevel: orgUnitLevel._id
            }

    return await post<JSONObject[], any>("/api/charts", payload);
}

// Transform data


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
const transformData_OuX_PeY = (data: JSONObject[]) => {
    // Step 1: Initialize an empty object to hold the grouped data
    const groupedData: JSONObject = {};

    // Step 2: Process each entry in the data
    data.forEach(entry => {
        const { orgUnitName, period, value } = entry;
        const year = period.code; // The year (e.g., 2021, 2022)

        // If the orgUnitName doesn't exist in groupedData, create it
        if (!groupedData[orgUnitName]) {
            groupedData[orgUnitName] = { orgunit: orgUnitName };
        }

        // If the year doesn't exist for the orgUnit, initialize it with 0
        if (!groupedData[orgUnitName][year]) {
            groupedData[orgUnitName][year] = 0;
        }

        // Add the current value to the year-specific value for this orgUnit
        groupedData[orgUnitName][year] += value;
    });

    // Step 3: Convert the grouped data object into an array
    return Object.values(groupedData);
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
const transformData_OuX_DeY = (data: JSONObject[]) => {
    
}

/**
* convert data to [
* 		{
    * 		orgUnit: '<OrgUnit Name>',
    * 		<DE 1 - Period 1>: value1,
    * 		<DE 2 - Period 1>: value2,
* 		    ...
* 		}
* ]
*/
const transformData_OuX_DeAndPeY = (data: JSONObject[]) => {
    
}


// -------------- Periods in Axis X

/**
* convert data to [
* 		{
    * 		period: '<Period name>',
    * 		<orgUnit 1>: sum(DE1-Value1, DE2-Value2),
    * 		<orgUnit 2>: sum(DE1-Value3, DE2-Value4),
* 		    ...
* 		}
* ]
*/
const transformData_PeX_OuY = (data: JSONObject[]) => {
    
}

/**
* convert data to [
* 		{
    * 		period: '<Period name>',
    * 		<DE 1>: sum(OU1-Value1, OU1-Value2),
    * 		<DE 2>: sum(OU1-Value3, OU1-Value4),
* 		    ...
* 		}
* ]
*/
const transformData_PeX_DeY = (data: JSONObject[]) => {
    
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
const transformData_PeX_OuAndDeY = (data: JSONObject[]) => {
    
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
const transformData_DeX_OuY = (data: JSONObject[]) => {
    
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
const transformData_DeX_PeY = (data: JSONObject[]) => {
    
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
const transformData_DeX_OuAndPeY = (data: JSONObject[]) => {
    
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
const transformData_OuAndDeX_PeY = (data: JSONObject[]) => {
    
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
const transformData_OuAndPeX_DeY = (data: JSONObject[]) => {
    
}

// DatElements and Periods in Axis X
/**
* convert data to [
* 		{
    * 		<DE1-PE1>: '<DE Name - PE name>',
    * 		<PE 1>: value1
    * 		<PE 2>: value2
* 		    ...
* 		}
* ]
*/
const transformData_DeAndPeX_OuY = (data: JSONObject[]) => {
    
}
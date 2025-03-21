import { AiOutlineLineChart } from "react-icons/ai";
import { CHART_AXIST_ORGUNITS, CHART_AXIST_PERIODS, CHART_TYPE_LIST_LINE, ORG_UNIT_LEVEL_DISTRICT } from ".";


// ======================================================================
// For Data Entry & Approval

export const initDataSet = {
    "_id":"67d1a4f5f12c4a0015a5b301",
    "name":"Yearly Population Data",
    "dataElements":[
        {
            "_id":"60c72b2f9c29f80015e5f72a",
            "name":"Total Population",
            "shortName":"total_population",
            "description":"The total number of people residing in the organizational unit. It represents the complete population count for a given time period."
        },
        {
            "_id":"60c72b2f9c29f80015e5f72b",
            "name":"Population Growth Rate",
            "shortName":"pop_growth_rate",
            "description":"The rate at which the population of the organizational unit is growing, expressed as a percentage over a specific time period (monthly or yearly)."
        },
        {
            "_id":"60c72b2f9c29f80015e5f72c",
            "name":"Population Density",
            "shortName":"pop_density",
            "description":"The number of people per unit of area (e.g., per square kilometer) within the organizational unit."
        },
        {
            "_id":"60c72b2f9c29f80015e5f72d",
            "name":"Male Population",
            "shortName":"male_population",
            "description":"The total number of male individuals residing in the organizational unit."
        },
        {
            "_id":"60c72b2f9c29f80015e5f72e",
            "name":"Female Population",
            "shortName":"female_population",
            "description":"The total number of female individuals residing in the organizational unit."
        }
    ],
    "periodType": {
        "_id":"67cae24cf09193badd6f8c72",
        "name":"Yearly"
    },
    "orgUnits":[
        {
            "_id":"65f123000000000000000009",
            "name":"District A1","code":"DTR-A1",
            "parent":"65f123000000000000000004",
            "level":4},
        {
            "_id":"65f123000000000000000010",
            "name":"District B-1",
            "code":"DTR-B1",
            "parent":"65f123000000000000000005",
            "level":4
        }
    ]
};

export const initPeriod = {
    "_id": "60c72b2f9c29f80015e5f761",
    "name": "2024",
    "code": "2024",
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-12-31T23:59:59.999Z"
}

export const orgUnitDistrictA1 = {
    "_id":"65f123000000000000000009",
    "name": "District A1",
    "code": "DTR-A1",
    "parent": "65f123000000000000000004",
    "level": 4
};


// ======================================================================
// For chart
export const orgUnitRoot = {
    "_id": "65f123000000000000000001",
    "name": "DEMO Country",
    "code": "HQ-001",
    "parent": null,
    "level": 1
};
export const initOrgUnitLevel = ORG_UNIT_LEVEL_DISTRICT; // district level

export const initDataElements = [{
    "_id": "60c72b2f9c29f80015e5f72d",
    "name": "Male Population",
    "shortName": "male_population",
    "description": "The total number of male individuals residing in the organizational unit."
},
{
    "_id": "60c72b2f9c29f80015e5f72e",
    "name": "Female Population",
    "shortName": "female_population",
    "description": "The total number of female individuals residing in the organizational unit."
}];
export const initPeriods = [
    {
        "_id": "60c72b2f9c29f80015e5f761",
        "name": "2024",
        "code": "2024",
        "startDate": "2024-01-01T00:00:00.000Z",
        "endDate": "2024-12-31T23:59:59.999Z"
    },
    {
        "_id": "60c72b2f9c29f80015e5f760",
        "name": "2023",
        "code": "2023",
        "startDate": "2023-01-01T00:00:00.000Z",
        "endDate": "2023-12-31T23:59:59.999Z"
    },
    {
        "_id": "67d786c2513fb5c0b1303f65",
        "name": "2022",
        "code": "2022",
        "startDate": "2021-12-31T15:00:00.000Z",
        "endDate": "2022-12-31T14:59:59.999Z"
      },
      {
        "_id": "67d786fc513fb5c0b1303f7c",
        "name": "2021",
        "code": "2021",
        "startDate":"2020-12-31T15:00:00.000Z",
        "endDate": "2021-12-31T14:59:59.999Z"
      },
      {
        "_id": "67d78708513fb5c0b1303f93",
        "name": "2020",
        "code": "2020",
        "startDate": "2019-12-31T15:00:00.000Z",
        "endDate": "2020-12-31T14:59:59.999Z"
      },
      {
        "_id": "67d78710513fb5c0b1303faa",
        "name": "2019",
        "code": "2019",
        "startDate": "2018-12-31T15:00:00.000Z",
        "endDate": "2019-12-31T14:59:59.999Z"
      },
      {
        "_id": "67d78717513fb5c0b1303fc1",
        "name": "2018",
        "code": "2018",
        "startDate": "2017-12-31T15:00:00.000Z",
        "endDate": "2018-12-31T14:59:59.999Z",
      }
];
export const initChartX = [CHART_AXIST_PERIODS];
export const initChartY = [CHART_AXIST_ORGUNITS];
export const initChartType = CHART_TYPE_LIST_LINE;

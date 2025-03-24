import { IChartAxist, JSONObject } from "@/types/definations";

export const PAGE_INTRO = {name: "PAGE_INTRO", title: "Intro Page", icon: "🏠"};
export const PAGE_LOGIN = {name: "PAGE_LOGIN", title: "Login", icon: "AiOutlineBarChart"};
export const PAGE_DASHBOARD = {name: "PAGE_DASHBOARD", title: "Dashboard", icon: "MdDashboard"};
export const PAGE_DATA_ENTRY = {name: "PAGE_DATA_ENTRY", title: "Data Entry", icon: "FcDataSheet"};
export const PAGE_APPROVALS = {name: "PAGE_APPROVALS", title: "Approvals", icon: "FcApproval"};
export const PAGE_CHARTS = {name: "PAGE_CHARTS", title: "Charts", icon: "FcComboChart"};


export const DATA_APPROVED = "APPROVED";
export const DATA_UNAPPROVED = "UNAPPROVED";
export const DATA_ACCEPTED = "ACCEPTED";

export const CHART_AXIST_ORGUNITS: IChartAxist = {_id: "orgUnit", name: "OrgUnit"};
export const CHART_AXIST_DATA_ELEMENTS: IChartAxist = {_id: "dataElement", name: "Data Element"};
export const CHART_AXIST_PERIODS: IChartAxist = {_id: "periods", name: "Periods"};


export const ORG_UNIT_LEVEL_DISTRICT = { _id: 4, name: "District" };
export const ORG_UNIT_LEVELS: JSONObject[] = [
    { _id: 1, name: "Country" },
    { _id: 2, name: "Region" },
    { _id: 3, name: "Province" },
    ORG_UNIT_LEVEL_DISTRICT
]


export const CHART_TYPE_LIST_LINE = { name: "Line", icon: "AiOutlineLineChart" };
export const CHART_TYPE_LIST = [
    CHART_TYPE_LIST_LINE,
    { name: "Bar", icon: "AiOutlineBarChart" },
    { name: "Pie", icon: "AiOutlinePieChart" },
    { name: "Heatmap", icon: "AiOutlinePieChart" },
] as const; // Marks this as immutable;


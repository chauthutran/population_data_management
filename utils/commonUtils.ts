import { JSONObject } from './../types/definations';

export const cloneObject = (obj: JSONObject | JSONObject[]) => {
    return JSON.parse(JSON.stringify(obj));
};

import {ILocation} from "./ILocation";
import {IAqi} from "./IAqi";

/**
 * The current object is repeated in other API endpoints and therefore requires a separate interface.
 */
export interface ICurrentSub {
    lat_updated_epoch: number,
    last_updated: string,
    temp_c: string,
    temp_f: string,
    is_day: number,
    condition: {
        text: string,
        icon: string,
        code: number
    },
    wind_mph: number,
    wind_kph: number,
    wind_degree: number,
    wind_dir: string,
    pressure_mb: number,
    pressure_in: number,
    precip_mm: string,
    precip_in: string,
    humidity: number,
    cloud: number,
    feelslike_c: number,
    feelslike_f: number,
    vis_km: number,
    vis_miles: number,
    uv: number,
    gust_mph: number,
    gust_kph: number,
    air_quality?: IAqi
}

/**
 * The final interface for the current.json endpoint.
 */
export interface ICurrent {
    location: ILocation,
    current: ICurrentSub
}
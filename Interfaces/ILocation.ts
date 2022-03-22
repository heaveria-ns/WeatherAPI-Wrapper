/**
 * The location object is used in multiple API endpoints and therefore gets its own interface.
 */
export interface ILocation {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime_epoch: number,
    localtime: string
}
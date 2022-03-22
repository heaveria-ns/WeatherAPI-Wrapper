/**
 * The AQI object is used in multiple different API endpoints and therefore gets its own interface.
 */
export interface IAqi {
    co: number,
    no2: number,
    o3: number,
    so2: number,
    pm2_5: number,
    pm10: number,
    usEpaIndex: number,
    gbDefraIndex: number
}
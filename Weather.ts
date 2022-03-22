import {IAstronomy} from "./Interfaces/IAstronomy";

const fetch = require('node-fetch')
import {ICurrent} from "./Interfaces/ICurrent";
import {IForecast} from "./Interfaces/IForecast";

/**
 * Error is to be used when known parameters are improperly used and would result in an error when fetching data.
 */
export class WeatherFormatError extends Error {
    constructor(message: string) {
        super(message);

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Error is to be used when a returned HTTPS request from the API has an error.
 */
export class WeatherResponseError extends Error {
    constructor(message: string) {
        super(message);

        this.name = this.constructor.name;
    }
}

/**
 * An API wrapper for https://weatherapi.com.
 */
export class Weather {
    protected _key: string;
    protected _version: string = 'v1'

    /**
     * Initialize the Weather class via the "new" keyword and feed it your API key. DO NOT SHARE your API key with anyone.
     * @param apiKey - An API key can be obtained for free at https://weatherapi.com.
     */
    constructor(apiKey: string) {
        this._key = apiKey;
    }

    /**
     * Sends a request to the current.json endpoint and returns the result as a JSON object.
     * @param location
     * @param aqi
     */
    public async getCurrent(location: string, aqi: boolean = true): Promise<ICurrent> {
        if (typeof(aqi) != 'boolean') throw new WeatherFormatError(`The AQI parameter should be a boolean, not a ${typeof(aqi)}.`)

        return (await fetch(
            `https://api.weatherapi.com/${this._version}/current.json?key=${this._key}&q=${location}&aqi=${aqi ? 'yes' : 'no'}`)
        ).json();
    }

    /**
     * Sends a request to the forecast.json endpoint and returns the result as a JSON object.
     * @param location
     * @param days
     * @param aqi
     * @param alerts
     */
    public async getForecast(location: string, days: number = 10, aqi: boolean = true, alerts: boolean = true): Promise<IForecast> {
        if (days > 10 || days < 1) throw new WeatherFormatError(`API only forecasts between 1-10 days.`)
        if (typeof(aqi) != 'boolean') throw new WeatherFormatError(`The AQI parameter should be a boolean, not a ${typeof(aqi)}.`)
        if (typeof(alerts) != 'boolean') throw new WeatherFormatError(`The alerts parameter should be a boolean, not a ${typeof(alerts)}.`)

        return (await fetch(
            `https://api.weatherapi.com/${this._version}/forecast.json
            ?key=${this._key}
            &q=${location}
            &days=${days}
            &aqi=${aqi ? 'yes' : 'no'}
            &alerts=${alerts ? 'yes' : 'no'}`
        )).json()
    }

    /**
     *
     * @param location
     * @param dt
     */
    public async getAstronomy(location: string, dt?: string): Promise<IAstronomy> {
        return (await fetch(
            `https://api.weatherapi.com/${this._version}/astronomy.json
            ?key=${this._key}
            &q=${location}
            &dt=${dt ? dt : Weather.getCurrentTime()}`
        )).json()
    }

    /**
     * Logs a table to the console with the severity and associated µgm^-3 listed.
     * Information was retrieved from https://www.weatherapi.com/docs/.
     */
    public displayUkDefraIndexTable() {
        const a = [ 'Severity', 'Low',  'Low',   'Low',   'Moderate', 'Moderate', 'Moderate', 'High',  'High',  'High',  'Very High' ]
        const b = [ 'µgm^-3',   '0-11', '12-23', '24-35', '36-41',    '42-47',    '48-53',    '54-58', '59-64', '65-70', '71']
        console.table({a,b})
    }

    public displayUsEpaIndexTable() {
        const number = [ 'Level', 1, 2, 3, 4, 5, 6 ]
        const a = [ 'Meaning', 'Good', 'Moderate', 'Unhealthy for sensitive group', 'Unhealthy', 'Very Unhealthy', 'Hazardous' ];
        console.table({ number, a })
    }

    private static getCurrentTime() {
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        return yourDate.toISOString().split('T')[0]
    }
}
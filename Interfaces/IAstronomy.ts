/**
 * The astro object is repeated in other API endpoints and therefore requires a separate interface.
 */
import {ILocation} from "./ILocation";

export interface IAstro {
    sunrise: string,
    sunset: string,
    moonrise: string,
    moonset: string,
    moon_phase: string,
    moon_illumination: string
}

/**
 * The final interface for the astronomy.json endpoint.
 */
export interface IAstronomy {
    location: ILocation,
    astronomy: {
        astro: IAstro
    }
}
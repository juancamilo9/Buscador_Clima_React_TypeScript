export function convertKelvinToCelsius(kelvin: number): number {
    const result =  kelvin - 273.15;
    return parseInt(result.toString())
}
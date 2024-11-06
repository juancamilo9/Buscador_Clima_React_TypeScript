
import axios from "axios";
import { InferOutput, number, object, parse, string } from 'valibot';
import { SearchType } from "../types";
//import {z} from 'zod'
import { useMemo, useState } from "react";

// type guards
// const isWeatherResult = (weather: unknown): weather is Weather => {
//     return(
//         Boolean(weather) &&
//         typeof weather === "object" && 
//         typeof (weather as Weather).name === "string" &&
//         typeof (weather as Weather).main.temp === "number" &&
//         typeof (weather as Weather).main.temp_max === "number" &&
//         typeof (weather as Weather).main.temp_min === "number"
//     )
// }

// Zod
//const Weather = z.object({
//    name:z.string(),
//    main:z.object({
//        temp:z.number(), 
//        temp_max: z.number(),
//        temp_min: z.number(),
//    })
//})

//type Weather = z.infer<typeof Weather>

// valibot
const schemaWeather = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number(),
    })
})

export type Weather = InferOutput<typeof schemaWeather>

export default function useWeather() {

    const initialState = {
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0,
        }
    }

    const [weather, setWeather] = useState<Weather>(initialState)

    const [loading, setLoading] = useState(false)

    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_APPI_KEY
        setLoading(true)
        setWeather(initialState)
        try {
            // generamos la url para un llamado a la api Geo
            const callGeoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            // consultamos a la api para obtener una respuesta
            const { data } = await axios(callGeoUrl)

            // obtenemos la latitud y la longitud de la respesuta para poder llamar nuevametne a la api
            const lat = data[0].lat
            const lon = data[0].lon

            const callCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            // reasignamos el valor de data para que no tenga problemas con el data antes creado
            // type guards
            // const { data: weatherResult } = await axios(callCurrentWeather)
            // const result = isWeatherResult(weatherResult)
            // if(result){
            //     weatherResult.name
            // }

            // Zod

            //const { data: weatherResult } = await axios(callCurrentWeather)
            //const result = Weather.safeParse(weatherResult)

            // Valibot
            const { data: weatherResult } = await axios(callCurrentWeather)
            const result = parse(schemaWeather, weatherResult)
            if(typeof result === 'object'){
                setWeather(result)
            }
            console.log(weather)

        } catch (error) {
            console.log('Ocurrio algo inesperado:', error)
        } finally{
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(()=>weather.name,[weather])

    return {
        weather,
        loading,
        fetchWeather,
        hasWeatherData
    }
}
import { SearchType } from "../types"
import axios from "axios"

export default function useWeather() {
    
    const fetchWeather=async (search:SearchType) =>{
        const appId = import.meta.env.VITE_APPI_KEY
        try {
            // generamos la url para un llamado a la api Geo
            const callGeoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            
            // consultamos a la api para obtener una respuesta
            const {data} = await axios(callGeoUrl)

            // obtenemos la latitud y la longitud de la respesuta para poder llamar nuevametne a la api
            const lat = data[0].lat
            const lon = data[0].lon

            const callCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            // reasignamos el valor de data para que no tenga problemas con el data antes creado
            const {data:weatherResult} = await axios(callCurrentWeather)
            console.log(weatherResult) 
        } catch (error) {
            console.log('Ocurrio algo inesperado:' ,error)
        }
    }
    
    return{
        fetchWeather
    }
}
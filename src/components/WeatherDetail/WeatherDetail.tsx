import { Weather } from '../../hooks/useWeather';
import { convertKelvinToCelsius } from '../../utils/index';
import styles from './WeatherDetail.module.css'


type WeatherDetailProps = {
    weather: Weather
}

export const WeatherDetail = ({ weather }: WeatherDetailProps) => {

    const { name, main } = weather

    return (
        <div className={styles.container}>
            <h2>Clima de: <span>{name}</span></h2>
            <p className={styles.temp}>{convertKelvinToCelsius(main.temp)}&deg;C</p>
            <div className={styles.container_temp}>
                <p>Max: <span>{convertKelvinToCelsius(main.temp_max)}&deg;C</span></p>
                <p>Min: <span>{convertKelvinToCelsius(main.temp_min)}&deg;C</span></p>
            </div>
        </div>
    )
}
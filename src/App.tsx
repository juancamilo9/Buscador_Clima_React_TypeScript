import styles from './App.module.css'
import Alert from './components/Alert/Alert'
import Form from './components/Form/Form'
import { Loading } from './components/Loading/Loading'
import { WeatherDetail } from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'

function App() {

  const { weather,loading,notFound, fetchWeather,hasWeatherData } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather}></Form>
        {notFound&&<Alert>Ciudad no encontrada</Alert>}
        {loading&& <Loading/>}
        {hasWeatherData&& <WeatherDetail weather={weather}/>}
      </div>
    </>
  )
}

export default App

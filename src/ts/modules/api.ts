import { isLoader } from './ui_elements'
import { CONFIG } from './config'
import { ERROR } from './config'
import { API } from './config'
import { WeatherData, ForecastData } from './types'

const fetchWeatherData = async <T extends WeatherData | ForecastData>(
  server: string,
  city: string
) => {
  const url = `${server}?q=${city}&appid=${CONFIG.API_KEY}`
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? ERROR.API.DATA_NOT_FOUND
          : `${ERROR.API.ERR_REQUEST} ${response.status}`
      )
    }
    return (await response.json()) as T
  } catch (error) {
    console.error(error)
    throw error
  }
}


export const getWeatherData = async (
  server: string,
  city: string,
  onSuccess: (data: WeatherData | ForecastData) => void
) => {
  try {
    isLoader(true)
    let data: WeatherData | ForecastData

    if (server === API.URL_WEATHER) {
      data = await fetchWeatherData<WeatherData>(server, city)
    } else if (server === API.URL_FORECAST) {
      data = await fetchWeatherData<ForecastData>(server, city)
    } else {
      throw new Error(ERROR.API.ERR_REQUEST)
    }

    onSuccess(data)
  } catch (error) {
    console.error(error)
  } finally {
    isLoader(false)
  }
}

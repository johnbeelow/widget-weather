export type WeatherData = {
  name: string
  main: {
    temp: number
    feels_like: number
  }
  weather: {
    icon: string
  }[]
  sys: {
    sunrise: number
    sunset: number
  }
}

export type ForecastItem = {
  dt: number
  main: { temp: number; feels_like: number }
  weather: { icon: string }[]
}[]

export type ForecastData = {
  list: ForecastItem
}

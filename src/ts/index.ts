import { getWeatherData } from './modules/api'
import { API } from './modules/config'
import {
  convertKelvinToCelsius,
  convertUnixToTime,
  isToday
} from './modules/utils'
import { UI_ELEMENTS, CREATE_ELEMENT, TOGGLE_LIKE } from './modules/ui_elements'
import {
  addCityFavorite,
  deleteCityFavorite,
  setCurrentCity,
  getCurrentCity,
  isCityExist,
  getCityFavoriteList
} from './modules/storage'
import { WeatherData, ForecastItem, ForecastData } from './modules/types'

const updateWeatherInfo = (data: WeatherData) => {
  const { name: selectedCity, main, weather, sys } = data
  const { temp, feels_like } = main
  const [{ icon }] = weather
  const { sunrise, sunset } = sys

  const convertTemp = convertKelvinToCelsius(temp)
  const imgWeather = `${API.URL_IMG}/${icon}${API.IMG_SIZE_2X}`
  const feelLike = convertKelvinToCelsius(feels_like)
  const sunriseTime = convertUnixToTime(sunrise)
  const sunsetTime = convertUnixToTime(sunset)

  UI_ELEMENTS.INFO_CITY.textContent = selectedCity
  UI_ELEMENTS.INFO_TEMPERATURE.textContent = convertTemp
  UI_ELEMENTS.INFO_IMG.setAttribute('src', `${imgWeather}`)
  UI_ELEMENTS.WEATHER_INFO.children[0].textContent = `Ощущается: ${feelLike}`
  UI_ELEMENTS.WEATHER_INFO.children[1].textContent = `Восход: ${sunriseTime}`
  UI_ELEMENTS.WEATHER_INFO.children[2].textContent = `Закат: ${sunsetTime}`

  UI_ELEMENTS.INFO_LIKE.removeEventListener('click', handleLikeClick)
  UI_ELEMENTS.INFO_LIKE.addEventListener('click', handleLikeClick)
}

const updateInfoPanel = (data: WeatherData) => {
  updateWeatherInfo(data)
  setCurrentCity(data.name)
}

const createWeatherListRecursive = (
  weatherData: ForecastItem,
  container: HTMLDivElement
) => {
  if (!weatherData.length) return

  const [data, ...rest] = weatherData
  const { dt, main, weather } = data
  const { temp, feels_like } = main
  const [{ icon }] = weather

  const divContainerTempInfo = CREATE_ELEMENT.DIV()
  const divTimeInfoUp = CREATE_ELEMENT.DIV()
  const spanTime = CREATE_ELEMENT.SPAN()
  const divTimeInfoDown = CREATE_ELEMENT.DIV()
  const divTimeInfoDownText = CREATE_ELEMENT.DIV()
  const spanTemp = CREATE_ELEMENT.SPAN()
  const spanFeelsLike = CREATE_ELEMENT.SPAN()
  const divTimeInfoDownImg = CREATE_ELEMENT.DIV()
  const imgTimeInfo = CREATE_ELEMENT.IMG()

  const time = convertUnixToTime(dt)
  const temperature = convertKelvinToCelsius(temp)
  const feelLike = convertKelvinToCelsius(feels_like)
  const imgWeather = `${API.URL_IMG}/${icon}${API.IMG_SIZE_2X}`

  container.appendChild(divContainerTempInfo)
  divContainerTempInfo.appendChild(divTimeInfoUp)
  divTimeInfoUp.appendChild(spanTime)
  divContainerTempInfo.appendChild(divTimeInfoDown)
  divTimeInfoDown.appendChild(divTimeInfoDownText)
  divTimeInfoDownText.appendChild(spanTemp)
  divTimeInfoDownText.appendChild(spanFeelsLike)
  divTimeInfoDown.appendChild(divTimeInfoDownImg)
  divTimeInfoDownImg.appendChild(imgTimeInfo)

  divContainerTempInfo.classList.add('container_temp_info_time')
  divTimeInfoUp.classList.add('temp_info_time_up')
  divTimeInfoUp.id = 'temp_info_time'
  divTimeInfoDown.classList.add('temp_info_time_down')
  divTimeInfoDownText.classList.add('temp_info_time_down_text')
  divTimeInfoDownText.id = 'temp_info_time_down_text'
  divTimeInfoDownImg.classList.add('temp_info_time_down_img')

  spanTime.textContent = time
  spanTemp.textContent = `Temperature: ${temperature}`
  spanFeelsLike.textContent = `Feels like: ${feelLike}`
  imgTimeInfo.src = imgWeather

  createWeatherListRecursive(rest, container)
}

const updateWeatherList = (data: ForecastData) => {
  UI_ELEMENTS.TEMP_INFO_LIST.replaceChildren()
  const todayData = data.list.filter((item) => isToday(item.dt))
  createWeatherListRecursive(todayData, UI_ELEMENTS.TEMP_INFO_LIST)
}

const createCityList = (city: string) => {
  const divContainer = CREATE_ELEMENT.DIV()
  const textCity = CREATE_ELEMENT.P()
  const buttonDelete = CREATE_ELEMENT.BUTTON()
  const svg = CREATE_ELEMENT.SVG()
  const path = CREATE_ELEMENT.PATH()

  UI_ELEMENTS.FAVORITE_CITY_LIST.appendChild(divContainer)
  divContainer.appendChild(textCity)
  divContainer.appendChild(buttonDelete)
  buttonDelete.appendChild(svg)
  svg.appendChild(path)

  divContainer.classList.add('favorite_city_container')
  textCity.classList.add('favorite_city')
  textCity.textContent = city
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svg.setAttribute('width', '24')
  svg.setAttribute('height', '24')
  svg.setAttribute('fill', 'currentColor')
  svg.setAttribute('class', 'delete_city_button')
  svg.setAttribute('viewBox', '0 0 384 512')
  path.setAttribute(
    'd',
    'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z'
  )

  textCity.addEventListener('click', () => {
    setCurrentCity(city)
    checkLikeDisplay()
    repeatRequest()
  })

  buttonDelete.addEventListener('click', () => {
    deleteCityFavorite(city)
    updateCityList()
    checkLikeDisplay()
  })
}

const updateCityListRecursive = (
  cityList: { name: string }[],
  index: number = 0
) => {
  if (index >= cityList.length) return
  createCityList(cityList[index].name)
  updateCityListRecursive(cityList, index + 1)
}

const updateCityList = () => {
  UI_ELEMENTS.FAVORITE_CITY_LIST.replaceChildren()
  const cityFavoriteList = getCityFavoriteList()
  updateCityListRecursive(cityFavoriteList)
}

const checkLikeDisplay = () => {
  const currentCity = getCurrentCity()
  isCityExist(currentCity) ? TOGGLE_LIKE.ACTIVE() : TOGGLE_LIKE.INACTIVE()
}

const handleLikeClick = () => {
  const cityName = getCurrentCity()
  const isExist = isCityExist(cityName)

  isExist ? deleteCityFavorite(cityName) : addCityFavorite(cityName)

  checkLikeDisplay()
  updateCityList()
}

const renderWeather = (data: WeatherData) => {
  updateInfoPanel(data)
  updateCityList()
  checkLikeDisplay()
}

const renderForecast = (data: ForecastData) => {
  updateWeatherList(data)
}

const repeatRequest = () => {
  const city = getCurrentCity()
  getWeatherData(API.URL_WEATHER, city, (data) => renderWeather(data as WeatherData))
  getWeatherData(API.URL_FORECAST, city, (data) => renderForecast(data as ForecastData))
}

repeatRequest()

UI_ELEMENTS.SECTOR_INPUT.addEventListener('submit', (event) => {
  event.preventDefault()
  setCurrentCity(UI_ELEMENTS.INPUT_CITY.value)
  repeatRequest()
  UI_ELEMENTS.INPUT_CITY.value = ''
})

export const API = {
  URL_WEATHER: 'http://api.openweathermap.org/data/2.5/weather',
  URL_FORECAST: 'https://api.openweathermap.org/data/2.5/forecast',
  URL_IMG: 'http://openweathermap.org/img/wn',
  IMG_SIZE_2X: '@2x.png'
}

export const CONFIG = {
  DEFAULT_CITY: 'Krasnodar',
  API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f'
}

export const ERROR = {
  STORAGE: {
    PARSE_PROBLEM: 'Проблема с получением данных из localStorage'
  },
  API: {
    DATA_NOT_FOUND: 'Данные не найдены',
    ERR_REQUEST: 'Ошибка запроса:'
  }
}

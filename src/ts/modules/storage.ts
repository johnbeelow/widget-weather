import { CONFIG } from './config'
import { checkInput } from './utils'
import { ERROR } from './config'
import Cookies from 'js-cookie'

type Storage = {
  saveFavoriteList: (favoriteList: Set<string>) => void
  getFavoriteList: () => Set<string>
}

type Cookie = {
  saveCurrentCity: (currentCity: string) => void
  getCurrentCity: () => string
}

const storage: Storage = {
  saveFavoriteList(favoriteList) {
    localStorage.setItem(
      'favoriteCityWeather',
      JSON.stringify([...favoriteList])
    )
  },
  getFavoriteList() {
    try {
      const storageList = localStorage.getItem('favoriteCityWeather')
      return new Set(JSON.parse(storageList || '[]'))
    } catch (error) {
      console.error(ERROR.STORAGE.PARSE_PROBLEM, error)
      return new Set()
    }
  }
}

const cookie: Cookie = {
  saveCurrentCity(currentCity) {
    Cookies.set('currentCityWeather', currentCity, { expires: 1 })
  },
  getCurrentCity() {
    try {
      const storageCity = Cookies.get('currentCityWeather')
      return storageCity || CONFIG.DEFAULT_CITY
    } catch (error) {
      console.error(ERROR.STORAGE.PARSE_PROBLEM, error)
      return CONFIG.DEFAULT_CITY
    }
  }
}

const cityFavoriteList = new Set(storage.getFavoriteList())
let currentCity = cookie.getCurrentCity()

export const isCityExist = (name: string) => cityFavoriteList.has(name)

export const addCityFavorite = (name: string) => {
  cityFavoriteList.add(name)
  storage.saveFavoriteList(cityFavoriteList)
}

export const deleteCityFavorite = (name: string) => {
  cityFavoriteList.delete(name)
  storage.saveFavoriteList(cityFavoriteList)
}

export const setCurrentCity = (newCity: string) => {
  if (!checkInput(newCity)) return
  currentCity = newCity
  cookie.saveCurrentCity(newCity)
}

export const getCurrentCity = () => currentCity
export const getCityFavoriteList = () =>
  [...cityFavoriteList].map((name) => ({ name }))

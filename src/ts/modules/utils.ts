const { format } = require('date-fns')

const isInputValid = (str: string) => !str || str.trim() === ''

const isInputNumber = (number: number) => isNaN(number)

const isString = (value: unknown): value is string => typeof value === 'string'

const isNumber = (value: unknown): value is number => typeof value === 'number'

export const checkInput = (value: number | string) => {
  if (isString(value)) {
    return !isInputValid(value)
  }
  if (isNumber(value)) {
    return isInputNumber(value)
  }
  return false
}

export const convertKelvinToCelsius = (temperature: number) =>
  `${Math.round(temperature - 273.15)}`

export const convertUnixToTime = (time: number) =>
  format(new Date(time * 1000), 'HH:mm')

export const isToday = (data: number) => {
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)
  const startOfDayUnix = Math.floor(startOfDay.getTime() / 1000)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)
  const endOfDayUnix = Math.floor(endOfDay.getTime() / 1000)

  if (data >= startOfDayUnix && data <= endOfDayUnix) return true
}

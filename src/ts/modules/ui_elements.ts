export const CREATE_ELEMENT = {
  DIV: (): HTMLDivElement => document.createElement('div'),
  P: (): HTMLParagraphElement => document.createElement('p'),
  SPAN: (): HTMLSpanElement => document.createElement('span'),
  BUTTON: (): HTMLButtonElement => document.createElement('button'),
  IMG: (): HTMLImageElement => document.createElement('img'),
  SVG: (): SVGSVGElement => document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  PATH: (): SVGPathElement => document.createElementNS('http://www.w3.org/2000/svg', 'path'),
};

export const UI_ELEMENTS = {
  SECTOR_INPUT: document.getElementById('sector_input') as HTMLFormElement,
  INPUT_CITY: document.getElementById('input_city') as HTMLInputElement,
  LOADER: document.getElementById('loader') as HTMLDivElement,
  LOADER_BACKGROUND: document.getElementById('loader-background') as HTMLDivElement,
  INFO_TEMPERATURE: document.getElementById('info_temperature') as HTMLDivElement,
  INFO_IMG: document.getElementById('info_img') as HTMLImageElement,
  INFO_CITY: document.getElementById('info_city') as HTMLDivElement,
  INFO_LIKE: document.getElementById('info_like') as HTMLDivElement,
  FAVORITE_CITY_LIST: document.getElementById('list_locations') as HTMLDivElement,
  WEATHER_INFO: document.getElementById('container_weather_info') as HTMLDivElement,
  TEMP_INFO_LIST: document.getElementById('container_temp_info_list') as HTMLDivElement,
  TEMP_INFO_TIME: document.getElementById('temp_info_time') as HTMLDivElement,
  TEMP_INFO_TEXT: document.getElementById('temp_info_time_down_text') as HTMLDivElement,
  TEMP_INFO_IMG: document.getElementById('info_list_img') as HTMLImageElement,
}

export const isLoader = (show: boolean) => {
  const loader = UI_ELEMENTS.LOADER
  const loaderBackground = UI_ELEMENTS.LOADER_BACKGROUND

  if (show) {
    loader.style.display = 'block'
    loaderBackground.style.display = 'block'
  }
  if (!show) {
    loader.style.display = 'none'
    loaderBackground.style.display = 'none'
  }
}

export const TOGGLE_LIKE = {
  ACTIVE: () => {
    UI_ELEMENTS.INFO_LIKE.classList.remove('inactive_like_city')
    UI_ELEMENTS.INFO_LIKE.classList.add('active_like_city')
  },
  INACTIVE: () => {
    UI_ELEMENTS.INFO_LIKE.classList.remove('active_like_city')
    UI_ELEMENTS.INFO_LIKE.classList.add('inactive_like_city')
  }
}

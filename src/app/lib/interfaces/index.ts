export interface Coord {
    lat: number
    lon: number
  }
  
  export interface Forecast {
    date: Date
    temp: number
    wind: number
    description: string
    icon: string
    humidity?: number
    minTemp?: number
    maxTemp?: number
    feelsLike?: number
  }
  
  export interface CityAutoComplete {
    name: string
    state: string
    country: string
    coord: Coord
  }
  
  export interface City {
    id: number
    name: string
    currentWeather: Forecast
    hourlyForecast: Forecast[] | null
    coord: Coord
    isLoading: boolean
  }
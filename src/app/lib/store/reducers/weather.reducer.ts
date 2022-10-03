import { Action, createReducer, on } from '@ngrx/store';
import { City, CityAutoComplete } from '../../interfaces';
import { setCityForecast, setCitiesWeather, setCitiesNames, addCityWeather, setSliderPosition, setLoading } from '../actions/weather.actions';


export const reducerKey = 'weather';

export interface WeatherState {
  initialCities: string[]
  sliderPosition: number
  cities: City[];
  citiesAutoComplete: CityAutoComplete[]
}

export const initialState: WeatherState = {
  initialCities: [
    'Amsterdam',
    'Montreal',
    'Tunis',
    'Seoul',
    'Sydney'
  ],
  sliderPosition: 0,
  cities: [],
  citiesAutoComplete: []
};

//Always creating new state from old state to avoid state mutation
const weatherReducer = createReducer(
  initialState,
  on(setCitiesWeather, (state, { payload }) => ({ ...state, cities: payload })),
  on(addCityWeather, (state, { payload }) => {
    const newState = { ...state, sliderPosition: 0 }
    const item = state.cities.find(city => city.id === payload.id)
    if(!item) newState.cities = [payload, ...state.cities]
    return (newState)
  }),
  on(setCityForecast, (state, { payload }) => {
    const { id, forecast } = payload
    //Assign new item to avoid state mutation on nested items
    const newCitiesState = state.cities.map(city => city.id === id ? {...city, hourlyForecast: forecast } : city)
    return ({ ...state, cities: newCitiesState })
  }),
  //This will be called on every forecast call to show loading state for specific item
  on(setLoading, (state, { id }) => {
    const newCitiesState = state.cities.map(city => city.id === id ? {...city, isLoading: true } : city)
    return ({ ...state, cities: newCitiesState })
  }),
  on(setCitiesNames, (state, { payload }) => ({ ...state, citiesAutoComplete: payload })),
  on(setSliderPosition, (state, { payload }) => ({ ...state, sliderPosition: payload })),
);

export const reducer = (state: WeatherState | undefined, action: Action) => {
  return weatherReducer(state, action);
}


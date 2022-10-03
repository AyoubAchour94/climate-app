import { createAction, props } from '@ngrx/store';
import { City, CityAutoComplete, Forecast } from '../../interfaces';


export const fetchCitiesWeather = createAction(
    '[Weather] Fetch Cities Weather',
    props<{ cities: string[] }>()
);

export const setCitiesWeather = createAction(
    '[Weather] Set Cities Weather',
    props<{ payload: City[] }>()
);

export const fetchCityForecast = createAction(
    '[Weather] Fetch City Forecast',
    props<{ id: number, lat: number, lon: number }>()
);

export const setCityForecast = createAction(
    '[Weather] Set City Forecast',
    props<{ payload: { id: number, forecast: Forecast[] }}>()
);

export const fetchCitiesNames = createAction(
    '[Weather] Fetch Cities Names',
    props<{ query: string }>()
);

export const setCitiesNames = createAction(
    '[Weather] Set Cities Names',
    props<{ payload: CityAutoComplete[] }>()
);

export const fetchCityWeatherByCoord = createAction(
    '[Weather] Fetch City Weather By Coord',
    props<{ lat: number, lon: number }>()
);

export const addCityWeather = createAction(
    '[Weather] Add City Weather',
    props<{ payload: City }>()
);

export const setSliderPosition = createAction(
    '[Weather] Set Slider Position',
    props<{ payload: number }>()
);

export const setLoading = createAction(
    '[Weather] Set Data Loading',
    props<{ id: number }>()
);

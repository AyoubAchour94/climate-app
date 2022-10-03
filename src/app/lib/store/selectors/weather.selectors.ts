import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectWeatherState = (state: AppState) => state.weather;

export const getinitialCities = createSelector(
    selectWeatherState,
    state => state.initialCities
);

export const getCitiesWeather = createSelector(
    selectWeatherState,
    state => state.cities
);

export const getCitiesNames = createSelector(
    selectWeatherState,
    state => state.citiesAutoComplete
);

export const getSliderPosition = createSelector(
    selectWeatherState,
    state => state.sliderPosition
);


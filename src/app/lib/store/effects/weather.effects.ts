import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchCitiesWeather, setCitiesWeather, setCityForecast, fetchCityForecast, fetchCitiesNames, setCitiesNames, fetchCityWeatherByCoord, addCityWeather, setLoading } from '../actions/weather.actions';
import { map, mergeMap, catchError, debounceTime, switchMap, concatMap } from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';
import { WeatherService } from '../../services/weather.service';
import { concat, EMPTY, of } from 'rxjs';
import { GeocodingService } from '../../services/geocoding.service';

@Injectable()
export class WeatherEffects {
  constructor(private actions$: Actions, private weatherService: WeatherService, private geocodingService: GeocodingService) {}

  getCitiesWeather$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchCitiesWeather),
        mergeMap(({ cities }) => this.weatherService.getCitiesWeather(cities)
        .pipe(
            map(cities => (setCitiesWeather({ payload: cities}))),
            catchError(() => EMPTY)
        )
        )
      )
  );

  getCityWeather$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchCityWeatherByCoord),
        mergeMap(({ lat, lon }) => this.weatherService.getWeatherByCoord(lat, lon)
        .pipe(
            map((city) => (addCityWeather({ payload: city }))),
            catchError(() => EMPTY)
        )
        )
      )
  );

  getcitiesNames$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchCitiesNames),
        debounceTime(300),
        switchMap(({ query }) => this.geocodingService.getCitiesByName(query)
        .pipe(
            map(({ cities }) => (setCitiesNames({ payload: cities }))),
            catchError(() => EMPTY)
        )
        )
      )
  );
  

  getCityForecast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchCityForecast),
        concatMap(({ id, lat, lon }) => concat(
          of(setLoading({ id })),
          this.weatherService.getForecastByCityGeoCord(id, lat, lon)
            .pipe(
              map(forecast => setCityForecast({ payload: forecast })),
              catchError(() => EMPTY)
            )
          )
        )
      )
  );
}
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';

import { WeatherEffects } from './weather.effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { fetchCitiesWeather, fetchCityForecast, setCitiesWeather, setCityForecast, setLoading } from '../actions/weather.actions';
import { WeatherService } from '../../services/weather.service';
import { City, Forecast } from '../../interfaces';

const cities = ['Amsterdam', 'Montreal', 'Tunis', 'Seoul', 'Sydney']
const fakeCities = [
  { name: 'Amsterdam' } as City,
  { name: 'Montreal' } as City,
  { name: 'Tunis' } as City,
  { name: 'Seoul' } as City,
  { name: 'Sydney' } as City
]

const fakeCityForecast = [
  { date: new Date(), temp: 15 } as Forecast
]

const fakeCityDetails = {
  id: 2759794,
  lat: 52.374,
  lon: 4.8897,
}

describe('WeatherEffects', () => {
  let actions$: Observable<any>;
  let service: WeatherService;
  let effects: WeatherEffects;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherEffects,
        provideMockActions(() => actions$)
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(WeatherService);
    effects = TestBed.get<WeatherEffects>(WeatherEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should call setCitiesWeather on action fetchCitiesWeather',  () => {

    const action = fetchCitiesWeather({ cities });
    const completion = setCitiesWeather({ payload: fakeCities });

    // mock the service to prevent an HTTP request to return an array of customers
    spyOn(service, 'getCitiesWeather').and.returnValue(
      cold('--a', { a: fakeCities })
    );
    actions$ = hot('--a--', { a: action });
    const expected = cold('----b', { b: completion });
    expect(
      effects.getCitiesWeather$
    ).toBeObservable(expected)
  });

  it('should call setCityForecast on action fetchCityForecast',  () => {

    const action = fetchCityForecast(fakeCityDetails);
    const completion = setCityForecast({ payload: { id: fakeCityDetails.id, forecast: fakeCityForecast}})

    const initialCall = setLoading({ id: fakeCityDetails.id })

    // mock the service to prevent an HTTP request to return an array of customers
    spyOn(service, 'getForecastByCityGeoCord').and.returnValue(
      cold('-a', { a: { id: fakeCityDetails.id, forecast: fakeCityForecast}})
    );
    actions$ = hot('--a--', { a: action });
    const expected = cold('--ab', { a: initialCall, b: completion });
    expect(
      effects.getCityForecast$
    ).toBeObservable(expected)
  });
});

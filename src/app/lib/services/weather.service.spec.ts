import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { cityMapper } from '../utils';
import { WeatherService } from './weather.service';



const fakeCityWeatherData = {
  id: 123,
  name: 'paris',
  dt: 1234,
  coord: {
    lat: 123,
    lon: 456
  },
  main: {
    temp: 15,
    humidity: 99,
    temp_min: 12,
    temp_max: 17,
    feels_like: 16
  },
  wind: {
    speed: 12.6
  },
  weather: [{
    description: 'sunny',
    icon: '001'
  }]
}

const fakeCityForecast = {
  id: 123,
  name: 'paris',
  dt: 1234,
  coord: {
    lat: 123,
    lon: 456
  },
  main: {
    temp: 15,
    humidity: 99,
    temp_min: 12,
    temp_max: 17,
    feels_like: 16
  },
  wind: {
    speed: 12.6
  },
  weather: [{
    description: 'sunny',
    icon: '001'
  }]
}

const fakeForecastResponse = {
  list: [fakeCityWeatherData]
}

describe('WeatherService', () => {
  let service: WeatherService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new WeatherService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#getCitiesByName should return value from observable', (done: DoneFn) => {
    const expectedCities = cityMapper(fakeCityWeatherData)

    httpClientSpy.get.and.returnValue(of(fakeCityWeatherData));

    service.getWeatherByCityName('paris').subscribe({
      next: cities => {
        expect(cities)
          .toEqual(expectedCities);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('#getWeatherByCoord should return value from observable', (done: DoneFn) => {
    const expectedCities = cityMapper(fakeCityWeatherData)

    httpClientSpy.get.and.returnValue(of(fakeCityWeatherData));

    service.getWeatherByCoord(123, 456).subscribe({
      next: cities => {
        expect(cities)
          .toEqual(expectedCities);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('#getForecastByCityGeoCord should return value from observable', (done: DoneFn) => {
    const expectedCities = {
      id: 12,
      forecast: [{
        date: new Date(fakeCityWeatherData?.dt * 1000),
        temp: fakeCityWeatherData.main.temp,
        wind: fakeCityWeatherData?.wind?.speed,
        description: fakeCityWeatherData?.weather[0]?.description,
        icon: fakeCityWeatherData?.weather[0]?.icon,
      }]
    }

    httpClientSpy.get.and.returnValue(of(fakeForecastResponse));

    service.getForecastByCityGeoCord(12, 123, 456).subscribe({
      next: cities => {
        expect(cities)
          .toEqual(expectedCities);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });
});

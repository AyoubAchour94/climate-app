import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';
import { cityMapper } from '../utils';
import { Forecast } from '../interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiUrl = environment.WeatherURL;

  constructor(private http: HttpClient) {}

  //Fetch City weather with a given name
  getWeatherByCityName(name: string) {
    return this.http.get<any>(`${this.apiUrl}/weather`, { params: {
      q: name,
      units: 'metric'
    }}).pipe(map(cityMapper))
  }

  //Fetch City weather with a given coordinates
  getWeatherByCoord(lat: number, lon: number) {
    return this.http.get<any>(`${this.apiUrl}/weather`, { params: {
      lat,
      lon,
      units: 'metric'
    }}).pipe(map(cityMapper))
  }

  //Bulk Fetch for multiple cities in parallel (used for inital state)
  getCitiesWeather(cities: string[]) {
    return forkJoin(
      cities.map(city => this.getWeatherByCityName(city))
    )
  }

  //Fetch weather conditions for the next hours by coordinates
  getForecastByCityGeoCord(id: number,lat: number, lon: number) {
    return this.http.get<any>(`${this.apiUrl}/forecast`, { params: {
      cnt: 5,
      lat,
      lon,
      units: 'metric'
    }}).pipe(map((payload: any): {id:number, forecast: Forecast[]}=> ({
      id,
      forecast: payload?.list.map((item: any) => ({
        date: new Date(item?.dt * 1000),
        temp: item?.main?.temp,
        wind: item?.wind?.speed,
        description: item?.weather[0]?.description,
        icon: item?.weather[0]?.icon,
    }))
    }))); 
  }
}

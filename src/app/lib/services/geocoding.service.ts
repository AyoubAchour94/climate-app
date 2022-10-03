import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CityAutoComplete } from '../interfaces';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  apiUrl = environment.GeocodingURL;

  constructor(private http: HttpClient) {}

  //Fetch Cities names and coordinates from given query
  getCitiesByName(query: string): Observable<{ cities: CityAutoComplete[] }> {
    return this.http.get<any>(`${this.apiUrl}`, { params: {
      q: query,
      limit: 5
    }}).pipe(map((cities: any) => ({
      cities: cities.map((city: any) => ({
        name: city?.name,
        state: city?.state || '',
        country: city?.country || '',
        coord: {
          lat: city?.lat,
          lon: city?.lon
        }
      }))
    })))
  }
}

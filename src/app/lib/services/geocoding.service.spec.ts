import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { GeocodingService } from './geocoding.service';

const fakeCityData: any = {
  name: 'paris',
  state: 'paris',
  country: 'france',
  lat: 1234,
  lon: 5678
}

describe('GeocodingService', () => {
  let service: GeocodingService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GeocodingService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('#getCitiesByName should return value from observable', (done: DoneFn) => {
    const expectedCities = { cities: [{
      name: fakeCityData.name,
      state: fakeCityData.state,
      country: fakeCityData.country,
      coord: {
        lat: fakeCityData.lat,
        lon: fakeCityData.lon
      }
    }] };

    httpClientSpy.get.and.returnValue(of([fakeCityData]));

    service.getCitiesByName('paris').subscribe({
      next: cities => {
        expect(cities)
          .withContext('expected cities')
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

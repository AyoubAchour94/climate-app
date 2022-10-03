import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { GeocodingService } from '../services';

import { MainInterceptor } from './main.interceptor';


describe('MainInterceptor', () => {
  let backend: HttpTestingController;
  let client: HttpClient;
  let router: Router;
  let service: GeocodingService

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
      ],
      providers: [ 
        MainInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MainInterceptor,
          multi: true,
        }
      ]
    }).compileComponents();

    client = TestBed.get(HttpClient);
    backend = TestBed.get(HttpTestingController);
    service = TestBed.inject(GeocodingService);

    
  });

  afterEach(() => {
    backend.verify();
  });

  it('should find appid in http request parameters', ()=> {
    service.getCitiesByName('paris').subscribe(res => {
      expect(res).toBeTruthy()
    })
    const httpReq = backend.expectOne(`${environment.GeocodingURL}?q=paris&limit=5&appid=f5508140ae4891a95d50645c150b187e&units=metric`);
    expect(httpReq.request.params.has('appid')).toEqual(true)
  })
});

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { City } from 'src/app/lib/interfaces';
import { fetchCitiesWeather, fetchCityForecast, setSliderPosition } from '../../lib/store/actions/weather.actions';
import { AppState } from '../../lib/store/reducers';
import { getCitiesWeather, getinitialCities, getSliderPosition } from '../../lib/store/selectors/weather.selectors';

//Carousel Initial configuration
const carouselConfig: OwlOptions = {
  loop: true,
  autoplay: true,
  center: true,
  //Number of items showing in screen depending on screen pixels
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    940: {
      items: 3
    }
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cities$: Observable<City[]>;
  sliderPosition$: Observable<number>;
  config: OwlOptions;
  citiesNames$: Observable<string[]>;

  constructor(private store: Store<AppState>) {
    this.cities$ = store.select(getCitiesWeather)
    this.sliderPosition$ = store.select(getSliderPosition)
    this.citiesNames$ = store.select(getinitialCities)
    this.config = carouselConfig
  }


  //Updating the slider position so that whenever the carousel re-renders
  //it goes back to last registred position instead of initial position
  onSlideChange = (event: SlidesOutputData) => {
    this.store.dispatch(setSliderPosition({ payload: event.startPosition || 0 }))
    this.config = {
      ...this.config,
      startPosition: event.startPosition
    }
  }

  //Optimizing re-renders on dom for *ngFor elements
  //Only changes item that match this condition will re-render
  trackByFn(index: number, item: City) {
    return item.id;
  }

  ngOnInit(): void {
    //Updating startPosition from store to trigger reset to initial slider on adding a new item
    this.sliderPosition$.subscribe(res =>  (this.config = { ...this.config, startPosition: res }))
    //Fetching initial Cities weather conditions
    this.citiesNames$.subscribe(res =>  {
      this.store.dispatch(fetchCitiesWeather({ cities: res }))
    })
  }

}

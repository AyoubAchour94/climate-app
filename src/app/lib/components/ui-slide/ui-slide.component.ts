import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { City } from '../../interfaces';
import { fetchCityForecast } from '../../store/actions/weather.actions';
import { AppState } from '../../store/reducers';

@Component({
  selector: 'app-ui-slide',
  templateUrl: './ui-slide.component.html',
  styleUrls: ['./ui-slide.component.scss']
})
export class UiSlideComponent {
  @Input() city: City | null = null

  constructor(private store: Store<AppState>) {
  }

  onClick = (city: City | null) => {
    this.store.dispatch(fetchCityForecast({
      id: city?.id || 0,
      lat: city?.coord.lat || 0,
      lon: city?.coord.lon || 0
    }))
  }

}

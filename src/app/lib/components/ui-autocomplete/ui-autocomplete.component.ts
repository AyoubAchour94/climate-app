import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CityAutoComplete } from '../../interfaces';
import { fetchCitiesNames, fetchCityWeatherByCoord } from '../../store/actions/weather.actions';
import { AppState } from '../../store/reducers';
import { getCitiesNames } from '../../store/selectors/weather.selectors';

@Component({
  selector: 'app-ui-autocomplete',
  templateUrl: './ui-autocomplete.component.html',
  styleUrls: ['./ui-autocomplete.component.scss']
})
export class UiAutocompleteComponent implements OnInit {
  cities$: Observable<CityAutoComplete[]>;
  cities: CityAutoComplete[] = []
  isDirty: boolean = false
  query: string = ''

  constructor(private store: Store<AppState>) {
    this.cities$ = store.select(getCitiesNames)
  }

  ngOnInit() {
    this.cities$.subscribe((res: CityAutoComplete[]) => {
      this.cities = res
    })
  }

  isAutocomplete() {
    return this.isDirty && this.cities.length > 0 && this.query !== ''
  }

  onChange(event: any) {
    this.isDirty = true
    const query = event.target.value
    this.query = query
    this.store.dispatch(fetchCitiesNames({ query }))
  }

  onSelectionChange(city: CityAutoComplete) {
    this.isDirty = false
    this.query = ''
    this.store.dispatch(fetchCityWeatherByCoord({ lat: city.coord.lat, lon: city.coord.lon }))
  }

}

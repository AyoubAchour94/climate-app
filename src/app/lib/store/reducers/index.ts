import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as weatherReducer from './weather.reducer';

//Root Store architecture
export interface AppState {
  [weatherReducer.reducerKey]: weatherReducer.WeatherState;
}

export const reducers: ActionReducerMap<AppState> = {
  [weatherReducer.reducerKey]: weatherReducer.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

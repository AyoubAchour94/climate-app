import { City, Forecast } from '../../interfaces';
import { setCitiesWeather, setCityForecast } from '../actions/weather.actions';
import { reducer } from './weather.reducer';

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

const initialCities = [
    'Amsterdam',
    'Montreal',
    'Tunis',
    'Seoul',
    'Sydney'
]

describe('Weather reducer', () => {
    it('should set cities weather properly', () => {
        const expected = { cities: fakeCities, citiesAutoComplete: [], sliderPosition: 0 ,  initialCities};
        const action = setCitiesWeather({ payload: fakeCities })
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should set city forecast properly', () => {
        const intialState = [...fakeCities, { id: fakeCityDetails.id } as City]
        const expected = {
            cities: [
                ...fakeCities,
                {
                    id: fakeCityDetails.id,
                    hourlyForecast: fakeCityForecast
                } as City
            ],
            citiesAutoComplete: [],
            sliderPosition: 0,
            initialCities
        };
        const action = setCityForecast({ payload: { id: fakeCityDetails.id, forecast: fakeCityForecast } })
        expect(reducer({ cities: intialState, citiesAutoComplete: [], sliderPosition: 0, initialCities }, action)).toEqual(expected);
    });
});
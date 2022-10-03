import { City } from '../../interfaces';
import { WeatherState } from '../reducers/weather.reducer';
import { getCitiesWeather, getinitialCities, getSliderPosition } from './weather.selectors';

const fakeCities = [
    { name: 'Amsterdam' } as City,
    { name: 'Montreal' } as City,
    { name: 'Tunis' } as City,
    { name: 'Seoul' } as City,
    { name: 'Sydney' } as City
]

const sliderPosition = 0

const initialCities = [
    'Amsterdam',
    'Montreal',
    'Tunis',
    'Seoul',
    'Sydney'
]

const weatherSate: WeatherState = {
    cities: fakeCities,
    citiesAutoComplete: [],
    sliderPosition,
    initialCities
}

describe('Weather reducer', () => {
    it('should get cities', () => {
        expect(getCitiesWeather.projector(weatherSate)).toEqual(fakeCities);
    });
    it('should get slider position', () => {
        expect(getSliderPosition.projector(weatherSate)).toEqual(sliderPosition);
    });
    it('should get intial cities', () => {
        expect(getinitialCities.projector(weatherSate)).toEqual(initialCities);
    });
});
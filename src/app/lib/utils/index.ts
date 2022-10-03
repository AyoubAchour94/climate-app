//Custom function that calculate brightness level from given tempeture
export const tempToBrightness = (temp: number) => {
    const maxBrightness = 200 //Maximum brightness as reference
    const minTempRef = 5 //Minimum temperature as reference
    const maxTempRef = 40 //Maximum temperature as reference
    const brightness = maxBrightness * ((temp-minTempRef)/(maxTempRef - minTempRef))
    return brightness
}

//Custom mapper from Api format to App format
export const cityMapper = (city: any) => ({
    id: city?.id,
    name: city?.name,
    currentWeather: {
      date: new Date(city?.dt * 1000),
      description: city?.weather[0]?.description,
      temp: city?.main?.temp,
      wind: city?.wind?.speed,
      icon: city?.weather[0]?.icon,
      humidity: city?.main?.humidity,
      minTemp: city?.main?.temp_min,
      maxTemp: city?.main?.temp_max,
      feelsLike: city?.main?.feels_like
    },
    coord: city?.coord,
    hourlyForecast: null,
    isLoading: false
})

//Converting HSL to RGB (used just for testing background style)
export const HSLToRGB = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `rgb(${255 * f(0)}, ${255 * f(8)}, ${255 * f(4)})`
};
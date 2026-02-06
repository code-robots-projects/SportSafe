import { Coordinates, WeatherData } from '../types';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeatherForSchool = async (coordinates: Coordinates, schoolId: string): Promise<WeatherData> => {
  // Use South Africa timezone to determine the "Current App Day"
  // This ensures that until 23:59:59 in South Africa, we are looking at 'Today'
  const options: Intl.DateTimeFormatOptions = { 
    timeZone: 'Africa/Johannesburg', 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  };
  const formatter = new Intl.DateTimeFormat('en-CA', options); // en-CA returns YYYY-MM-DD
  const today = formatter.format(new Date());
  
  // Cache key includes the date, so at midnight SAST, it automatically looks for a new forecast
  const cacheKey = `weather_v4_${schoolId}_${today}_1230`;

  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached) as WeatherData;
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const params = new URLSearchParams({
      latitude: coordinates.lat.toString(),
      longitude: coordinates.lng.toString(),
      hourly: 'temperature_2m,relative_humidity_2m,apparent_temperature,shortwave_radiation',
      timezone: 'Africa/Johannesburg',
      forecast_days: '1',
    });

    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) throw new Error(`Weather API Error: ${response.statusText}`);

    const data = await response.json();
    
    // We sample indices 12 (12:00) and 13 (13:00) to represent the 12:30 SAST midday slot
    const idx1 = 12;
    const idx2 = 13;

    // Safety margin: Take the higher values between 12:00 and 13:00
    const temp = Math.max(data.hourly.temperature_2m[idx1], data.hourly.temperature_2m[idx2]);
    const hum = data.hourly.relative_humidity_2m[idx1];
    const appTemp = Math.max(data.hourly.apparent_temperature[idx1], data.hourly.apparent_temperature[idx2]);
    
    // UV Estimation: Shortwave radiation / 25 is a common heuristic for UV index
    const rad = data.hourly.shortwave_radiation[idx1];
    const estimatedUV = Math.min(15, parseFloat((rad / 25).toFixed(1)));

    const result: WeatherData = {
      temperature: temp,
      humidity: hum,
      apparentTemperature: appTemp,
      uvIndex: estimatedUV,
      timestamp: `${today}T12:30:00`,
    };

    localStorage.setItem(cacheKey, JSON.stringify(result));
    return result;
  } catch (error) {
    console.error("Weather fetch failed:", error);
    throw error;
  }
};
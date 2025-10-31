import { WeatherData } from "@/types"

// Open meteo api
const OPEN_METEO_API = process.env.NEXT_PUBLIC_OPEN_METEO_API



export async function getWeatherByCoordinates(
  latitude: number,
  longitude: number,
  cityName: string,
  countryName: string,
): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${OPEN_METEO_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl&timezone=auto`,
    )

    if (!response.ok) throw new Error("Failed to fetch weather")

    const data = await response.json()
    const current = data.current

    return {
      city: cityName,
      country: countryName,
      temperature: Math.round(current.temperature_2m),
      description: getWeatherDescription(current.weather_code),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      pressure: current.pressure_msl,
      feelsLike: Math.round(current.apparent_temperature),
      icon: getWeatherIcon(current.weather_code),
      timestamp: Date.now(), 
    }
  } catch (error) {
    console.error("Weather API error:", error)
    throw error
  }
}

export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Foggy",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with hail",
  }
  return descriptions[code] || "Unknown"
}

function getWeatherIcon(code: number): string {
  if (code === 0) return "☀️"
  if (code === 1 || code === 2) return "🌤️"
  if (code === 3) return "☁️"
  if (code === 45 || code === 48) return "🌫️"
  if (code >= 51 && code <= 55) return "🌧️"
  if (code >= 61 && code <= 65) return "🌧️"
  if (code >= 71 && code <= 77) return "❄️"
  if (code >= 80 && code <= 82) return "🌧️"
  if (code >= 85 && code <= 86) return "❄️"
  if (code >= 95 && code <= 99) return "⛈️"
  return "🌤️"
}

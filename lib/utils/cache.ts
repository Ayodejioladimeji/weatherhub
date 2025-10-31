
import { Note, WeatherData } from "@/types"

const WEATHER_CACHE_KEY = "weather_cache"
const FAVORITES_CACHE_KEY = "favorites_cache"
const NOTES_CACHE_KEY = "notes_cache"
const REMOVED_CITIES_CACHE_KEY = "removed_cities_cache"
const CACHE_DURATION = 30 * 60 * 1000

export function saveWeatherCache(data: Record<string, WeatherData>) {
  try {
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving weather cache:", error)
  }
}

export function loadWeatherCache(): Record<string, WeatherData> {
  try {
    const data = localStorage.getItem(WEATHER_CACHE_KEY)
    return data ? JSON.parse(data) : {}
  } catch (error) {
    console.error("Error loading weather cache:", error)
    return {}
  }
}

export function saveFavoritesCache(favorites: any[]) {
  try {
    localStorage.setItem(FAVORITES_CACHE_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.error("Error saving favorites cache:", error)
  }
}

export function loadFavoritesCache() {
  try {
    const data = localStorage.getItem(FAVORITES_CACHE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error loading favorites cache:", error)
    return []
  }
}

export function saveNotesCache(notes: Note[]) {
  try {
    localStorage.setItem(NOTES_CACHE_KEY, JSON.stringify(notes))
  } catch (error) {
    console.error("Error saving notes cache:", error)
  }
}

export function loadNotesCache(): Note[] {
  try {
    const data = localStorage.getItem(NOTES_CACHE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error loading notes cache:", error)
    return []
  }
}

export function saveRemovedCitiesCache(cities: string[]) {
  try {
    localStorage.setItem(REMOVED_CITIES_CACHE_KEY, JSON.stringify(cities))
  } catch (error) {
    console.error("Error saving removed cities cache:", error)
  }
}

export function loadRemovedCitiesCache(): string[] {
  try {
    const data = localStorage.getItem(REMOVED_CITIES_CACHE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error loading removed cities cache:", error)
    return []
  }
}

export function isCacheExpired(timestamp: number): boolean {
  return Date.now() - timestamp > CACHE_DURATION
}

export function removeWeatherFromCache(city: string, country: string) {
  try {
    const cache = loadWeatherCache()
    const cacheKey = `${city},${country}`
    delete cache[cacheKey]
    saveWeatherCache(cache)
  } catch (error) {
    console.error("Error removing weather from cache:", error)
  }
}
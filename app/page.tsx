"use client"

import { useEffect, useState, useCallback } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setDefaultCities, removeCity } from "@/lib/slices/citiesSlice"
import { addFavorite, removeFavorite } from "@/lib/slices/favoritesSlice"
import { setWeatherData, removeWeatherData } from "@/lib/slices/weatherSlice"
import { getWeatherByCoordinates } from "@/lib/api/weather"
import {
  saveWeatherCache,
  saveFavoritesCache,
  saveRemovedCitiesCache,
  isCacheExpired,
  removeWeatherFromCache,
} from "@/lib/utils/cache"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { LocationButton } from "@/components/location-button"
import { CityCard } from "@/components/city-card"
import { Button } from "@/components/ui/button"
import type { City } from "@/types"
import { getLargestCities } from "@/lib/api/largest-cities"
import HomeSkeleton from "@/components/skeleton/home-skeleton"

export default function Home() {
  const dispatch = useAppDispatch()
  const weather = useAppSelector((state) => state.weather)
  const favorites = useAppSelector((state) => state.favorites)
  const cities = useAppSelector((state) => state.cities)
  const [loading, setLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(true)
  const [wasOffline, setWasOffline] = useState(false)
  const [fetchedCities, setFetchedCities] = useState<City[]>([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        setIsOnline(navigator.onLine)

        // Only fetch fresh data if online
        if (!navigator.onLine) {
          setLoading(false)
          return
        }

        // Fetch largest cities
        try {
          const citiesFromAPI = await getLargestCities(15)
          setFetchedCities(citiesFromAPI)
          dispatch(setDefaultCities(citiesFromAPI))

          // Fetch fresh weather for all cities if cache is expired
          for (const city of citiesFromAPI) {
            const cacheKey = `${city.city},${city.country}`
            const weatherData = weather.data[cacheKey]

            if (weatherData && !isCacheExpired(weatherData.timestamp)) continue

            try {
              const weatherResponse = await getWeatherByCoordinates(
                city.latitude,
                city.longitude,
                city.city,
                city.country,
              )
              dispatch(setWeatherData(weatherResponse))
            } catch (error) {
              console.error(`Failed to fetch weather for ${city.city}:`, error)
            }
          }
        } catch (error) {
          console.error("Failed to fetch largest cities:", error)
          setFetchedCities([])
        }
      } catch (error) {
        console.error("Error initializing app:", error)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [dispatch, weather.data])

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setWasOffline(true)
    }
    const handleOffline = () => {
      setIsOnline(false)
      setWasOffline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Persist weather cache
  useEffect(() => {
    saveWeatherCache(weather.data)
  }, [weather.data])

  // Persist favorites cache
  useEffect(() => {
    saveFavoritesCache(favorites.cities)
  }, [favorites.cities])

  // Persist removed cities cache
  useEffect(() => {
    saveRemovedCitiesCache(Array.from(cities.removedCities))
  }, [cities.removedCities])

  const handleRemoveCity = useCallback(
    (cityKey: string) => {
      const [city, country] = cityKey.split(",")
      if (city && country) {
        dispatch(removeCity(cityKey))
        dispatch(removeWeatherData({ city, country }))
        removeWeatherFromCache(city, country)
      }
    },
    [dispatch],
  )

  const handleToggleFavorite = useCallback(
    (city: string, country: string) => {
      const isFavorite = favorites.cities.some((c) => c.city === city && c.country === country)
      if (isFavorite) {
        dispatch(removeFavorite({ city, country }))
      } else {
        dispatch(addFavorite({ city, country, addedAt: Date.now() }))
      }
    },
    [dispatch, favorites.cities],
  )

  const handleRefreshWeather = async () => {
    setRefreshing(true)
    try {
      if (fetchedCities.length === 0) {
        const citiesFromAPI = await getLargestCities(15)
        setFetchedCities(citiesFromAPI)
        dispatch(setDefaultCities(citiesFromAPI))
      } else {
        // Refresh weather for current cities
        for (const city of fetchedCities) {
          try {
            const weatherResponse = await getWeatherByCoordinates(
              city.latitude,
              city.longitude,
              city.city,
              city.country,
            )
            dispatch(setWeatherData(weatherResponse))
          } catch (error) {
            console.error(`Failed to fetch weather for ${city.city}:`, error)
          }
        }
      }
      setWasOffline(false)
    } catch (error) {
      console.error("Error refreshing weather:", error)
    } finally {
      setRefreshing(false)
    }
  }

  const visibleCities = fetchedCities.filter((city) => !cities.removedCities.has(`${city.city},${city.country}`))

  const favoritesList = visibleCities.filter((city) =>
    favorites.cities.some((fav) => fav.city === city.city && fav.country === city.country),
  )

  const otherCities = visibleCities.filter(
    (city) => !favorites.cities.some((fav) => fav.city === city.city && fav.country === city.country),
  )

  const displayCities = isOnline
    ? [...favoritesList, ...otherCities]
    : Object.values(weather.data).map((w: any) => ({
      city: w.city,
      country: w.country,
      latitude: 0,
      longitude: 0,
    }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <SearchBar />
            </div>
            <LocationButton />
          </div>
          {wasOffline && isOnline && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-green-800">Welcome back online!</p>
              </div>
              <p className="text-sm text-green-700">
                Click the button below to get the latest and updated weather information.
              </p>
              <Button
                onClick={handleRefreshWeather}
                disabled={refreshing}
                className="bg-green-700 hover:bg-green-800 text-white"
                size="sm"
              >
                {refreshing ? "Updating weather..." : "Refresh Weather Data"}
              </Button>
            </div>
          )}
          {!isOnline && !wasOffline && (
            <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
              You are currently offline. Showing cached weather data.
            </div>
          )}
        </div>

        {loading ? (
          <HomeSkeleton />
        ) : displayCities.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayCities.map((city) => {
              const cacheKey = `${city.city},${city.country}`
              const weatherData = weather.data[cacheKey]
              const isFavorite = favorites.cities.some((fav) => fav.city === city.city && fav.country === city.country)

              return weatherData ? (
                <CityCard
                  key={cacheKey}
                  weather={weatherData}
                  isFavorite={isFavorite}
                  onRemove={() => handleRemoveCity(cacheKey)}
                  onToggleFavorite={() => handleToggleFavorite(city.city, city.country)}
                />
              ) : null
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No cities to display. All cities have been removed.</p>
            <Button
              onClick={async () => {
                try {
                  const citiesFromAPI = await getLargestCities(15)
                  setFetchedCities(citiesFromAPI)
                  dispatch(setDefaultCities(citiesFromAPI))
                } catch (error) {
                  console.error("Error resetting cities:", error)
                }
              }}
              className="bg-green-800 hover:bg-green-700"
            >
              Reset Cities
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

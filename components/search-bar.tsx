"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2 } from "lucide-react"
import { searchCities } from "@/lib/api/location"
import { getWeatherByCoordinates } from "@/lib/api/weather"
import { useAppDispatch } from "@/lib/hooks"
import { setWeatherData, setWeatherError } from "@/lib/slices/weatherSlice"
import { useRouter } from "next/navigation"
import { CityResult } from "@/types"


function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<CityResult[]>([])
  const [showResults, setShowResults] = useState(false)

  const dispatch = useAppDispatch()
  const router = useRouter()

  // Debounced query
  const debouncedQuery = useDebounce(query.trim(), 600)

  //  search when debounced query changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!debouncedQuery) {
        setResults([])
        setShowResults(false)
        return
      }

      setLoading(true)
      try {
        const cities = await searchCities(debouncedQuery)
        setResults(cities)
        setShowResults(true)
      } catch (error) {
        dispatch(setWeatherError("Failed to search cities"))
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
  }, [debouncedQuery, dispatch])

  const handleSelectCity = useCallback(
    async (city: CityResult) => {
      try {
        const weather = await getWeatherByCoordinates(city.latitude, city.longitude, city.city, city.country)
        dispatch(setWeatherData(weather))
        router.push(`/city/${city.city}/${city.country}`)
        setQuery("")
        setShowResults(false)
        setResults([])
      } catch {
        dispatch(setWeatherError("Failed to fetch weather"))
      }
    },
    [dispatch, router]
  )

  const showDropdown = useMemo(() => showResults && results.length > 0, [showResults, results.length])

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-green-300 focus:border-green-600 focus:ring-green-600"
        />
        <Button disabled={loading} className="bg-green-800 hover:bg-green-700 text-white">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-[400px] overflow-auto">
          {results.map((city) => (
            <button
              key={city.latitude}
              onClick={() => handleSelectCity(city)}
              className="w-full px-4 py-2 text-left hover:bg-green-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="font-medium text-green-900">{city.city}</div>
              <div className="text-sm text-green-600">{city.country}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}



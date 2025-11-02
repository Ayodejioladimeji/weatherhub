"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { removeFavorite } from "@/lib/slices/favoritesSlice"
import { CityCard } from "@/components/city-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FavoriteCity } from "@/types"

const Favorites = () => {
  const dispatch = useAppDispatch()
  const weather = useAppSelector((state) => state.weather)
  const favorites = useAppSelector((state) => state.favorites)

  const handleRemoveCity = (cityKey: string) => {
    const [city, country] = cityKey.split(",")
    dispatch(removeFavorite({ city, country }))
  }

  const handleToggleFavorite = (city: string, country: string) => {
    dispatch(removeFavorite({ city, country }))
  }

  const favoriteCities = favorites.cities
    .map((fav:FavoriteCity) => {
      const cacheKey = `${fav.city},${fav.country}`
      return {
        ...fav,
        weather: weather.data[cacheKey],
        cacheKey,
      }
    })
    .filter((item) => item.weather)
    .sort((a, b) => a.city.localeCompare(b.city))


  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="outline" className="mb-6 gap-2 border-green-300 hover:bg-green-50 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-green-900 mb-8">Favorite Cities</h1>

        {favoriteCities.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteCities.map((item) => (
              <CityCard
                key={item.cacheKey}
                weather={item.weather}
                isFavorite={true}
                onRemove={() => handleRemoveCity(item.cacheKey)}
                onToggleFavorite={() => handleToggleFavorite(item.city, item.country)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No favorite cities yet.</p>
            <Link href="/">
              <Button className="bg-green-800 hover:bg-green-700">Add Favorites</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export default Favorites
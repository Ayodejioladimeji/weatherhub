"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Heart } from "lucide-react"
import Link from "next/link"
import { WeatherData } from "@/types"

interface CityCardProps {
  weather: WeatherData
  isFavorite: boolean
  onRemove: () => void
  onToggleFavorite: () => void
}

export function CityCard({ weather, isFavorite, onRemove, onToggleFavorite }: CityCardProps) {
  return (
    <Link href={`/city/${weather.city}/${weather.country}`}>
      <Card className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 p-6 transition-all hover:shadow-md cursor-pointer border-green-200">
        <div className="absolute right-2 top-2 flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.preventDefault()
              onToggleFavorite()
            }}
            className="h-8 w-8 p-0 hover:bg-green-200"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.preventDefault()
              onRemove()
            }}
            className="h-8 w-8 p-0 hover:bg-red-100"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-bold text-green-900">{weather.city}</h3>
            <p className="text-sm text-green-700">{weather.country}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-green-800">{weather.temperature}°C</div>
            <div className="text-4xl">{weather.icon}</div>
          </div>

          <div className="space-y-1 text-sm text-green-700">
            <p className="capitalize">{weather.description}</p>
            <p>Feels like {weather.feelsLike}°C</p>
            <p>Humidity: {weather.humidity}%</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}

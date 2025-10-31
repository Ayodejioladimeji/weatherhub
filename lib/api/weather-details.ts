import { getWeatherByCoordinates } from "./weather"
import { City } from "@/types"

const GEONAMES_API = process.env.NEXT_PUBLIC_GEONAMES_API
const GEONAMES_USERNAME = process.env.NEXT_PUBLIC_GEONAMES_USERNAME

if (!GEONAMES_USERNAME) throw new Error("Missing GeoNames username")


export async function getWeatherDetails(city: string, country: string) {
    try {
        const response = await fetch(
            `${GEONAMES_API}/searchJSON?q=${encodeURIComponent(city)}&country=${encodeURIComponent(
                country
            )}&maxRows=1&username=${GEONAMES_USERNAME}`,
            { cache: "no-store" }
        )

        if (!response.ok) throw new Error(`GeoNames request failed: ${response.status}`)

        const data = await response.json()
        if (!data.geonames || data.geonames.length === 0) {
            return null
        }

        const location = data.geonames[0]

        const cityData: City = {
            city: location.name,
            country: location.countryName || "Unknown",
            latitude: Number(location.lat),
            longitude: Number(location.lng),
        }

        // Using existing function to fetch weather by coordinates
        const weatherData = await getWeatherByCoordinates(
            cityData.latitude,
            cityData.longitude,
            cityData.city,
            cityData.country
        )

        return weatherData
    } catch (error) {
        console.error("GeoNames getWeatherDetails error:", error)
        throw error
    }
}

import { City } from "@/types"

const GEONAMES_API = process.env.NEXT_PUBLIC_GEONAMES_API
const GEONAMES_USERNAME = process.env.NEXT_PUBLIC_GEONAMES_USERNAME

if (!GEONAMES_USERNAME) throw new Error("Missing GeoNames username")

export async function getCityByCoordinates(latitude: number, longitude: number): Promise<City> {
    try {
        const response = await fetch(
            `${GEONAMES_API}/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=${GEONAMES_USERNAME}`,
            { cache: "no-store" }
        )

        if (!response.ok) throw new Error(`GeoNames reverse request failed: ${response.status}`)

        const data = await response.json()

        if (!data.geonames || data.geonames.length === 0) {
            return {
                city: "Unknown",
                country: "Unknown",
                latitude,
                longitude,
            }
        }

        const place = data.geonames[0]

        return {
            city: place.name || "Unknown",
            country: place.countryName || "Unknown",
            latitude,
            longitude,
        }
    } catch (error) {
        console.error("GeoNames reverse geocoding error:", error)
        throw error
    }
}

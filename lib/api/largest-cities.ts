import { City } from "@/types"

const GEONAMES_API = process.env.NEXT_PUBLIC_GEONAMES_API
const GEONAMES_USERNAME = process.env.NEXT_PUBLIC_GEONAMES_USERNAME

if (!GEONAMES_USERNAME) throw new Error("Missing GeoNames username")

export async function getLargestCities(limit = 15): Promise<City[]> {
    try {
        const response = await fetch(
            `${GEONAMES_API}/searchJSON?featureClass=P&orderby=population&maxRows=${limit}&username=${GEONAMES_USERNAME}`,
            { cache: "no-store" }
        )

        if (!response.ok) throw new Error(`GeoNames request failed: ${response.status}`)

        const data = await response.json()

        if (!data.geonames || data.geonames.length === 0) return []

        const cities:City[] = data.geonames.map((item: any) => ({
            city: item.name,
            country: item.countryName || "Unknown",
            latitude: Number(item.lat),
            longitude: Number(item.lng),
        }))

        // Sort alphabetically by city name
        return cities.sort((a, b) => a.city.localeCompare(b.city))
    } catch (error) {
        console.error("GeoNames getLargestCities error:", error)
        throw error
    }
}

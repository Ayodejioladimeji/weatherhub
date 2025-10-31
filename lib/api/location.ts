import { City } from "@/types"

const GEONAMES_API = process.env.NEXT_PUBLIC_GEONAMES_API

export async function searchCities(query: string): Promise<City[]> {
  const username = process.env.NEXT_PUBLIC_GEONAMES_USERNAME
  if (!username) throw new Error("Missing GeoNames username")

  try {
    const response = await fetch(
      `${GEONAMES_API}/searchJSON?q=${encodeURIComponent(query)}&maxRows=10&featureClass=P&orderby=relevance&username=${username}`,
      { cache: "no-store" }
    )

    if (!response.ok) throw new Error(`GeoNames request failed: ${response.status}`)

    const data = await response.json()

    if (!data.geonames || data.geonames.length === 0) return []

    return data.geonames.map((item: any) => ({
      city: item.name,
      country: item.countryName || "Unknown",
      latitude: item.lat ? Number(item.lat) : 0,
      longitude: item.lng ? Number(item.lng) : 0,
    }))
  } catch (error) {
    console.error("GeoNames API error:", error)
    throw error
  }
}

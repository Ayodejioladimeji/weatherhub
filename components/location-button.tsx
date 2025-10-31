"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, MapPin } from "lucide-react"
import { getCityByCoordinates } from "@/lib/api/city-coordinates"
import { showError, showLoading, showInfo, dismissToast } from "@/lib/utils/toast"

export function LocationButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleGetLocation = async () => {
    setLoading(true)
    let toastId: string | number | undefined

    try {
      if (!navigator.geolocation) {
        showError("Geolocation Not Supported", "Your browser doesn't support location services")
        setLoading(false)
        return
      }

      toastId = showLoading("Getting your location...")

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords

            if (toastId) dismissToast(toastId)

            const city = await getCityByCoordinates(latitude, longitude)

            showInfo("Location found", `Redirecting to ${city.city}, ${city.country}`)
            router.push(`/city/${encodeURIComponent(city.city)}/${encodeURIComponent(city.country)}`)
          } catch (err) {
            console.error("Error getting city:", err)
            if (toastId) dismissToast(toastId)
            showError("Location Error", "Failed to get city information. Please try again.")
            setLoading(false)
          }
        },
        (err) => {
          console.error("Geolocation error:", {
            code: err.code,
            message: err.message,
          })

          if (toastId) dismissToast(toastId)

          if (err.code === err.PERMISSION_DENIED) {
            showError(
              "Location Permission Denied",
              "Please enable location access in your browser settings. For localhost, you may need to use HTTPS or allow it in developer settings.",
            )
            
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            showError(
              "Location Unavailable",
              "Your device location could not be determined. Check if location services are enabled.",
            )
          } else if (err.code === err.TIMEOUT) {
            showError(
              "Location Timeout",
              "Request took too long. Check your internet connection and location permissions.",
            )
          } else {
            showError("Location Error", "Unable to retrieve your location. Please try again.")
          }
          setLoading(false)
        },
        {
          enableHighAccuracy: false,
          timeout: 15000, // 15 seconds
          maximumAge: 300000, // 5 minutes cache
        },
      )
    } catch (err) {
      console.error("Unexpected error:", err)
      if (toastId) dismissToast(toastId)
      showError("Unexpected Error", "An error occurred while getting your location")
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleGetLocation} disabled={loading} className="bg-green-800 hover:bg-green-700 text-white gap-2">
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
      {loading ? "Getting location..." : "My Location"}
    </Button>
  )
}

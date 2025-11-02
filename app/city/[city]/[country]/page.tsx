import WeatherDetails from "@/components/layout/weather-details"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Weather Hub - City Weather Details",
  description:
    "Detailed weather insights for your selected city, including temperature, humidity, wind speed, and more.",
}

const WeatherPage = () => {
  return <WeatherDetails />
}

export default WeatherPage

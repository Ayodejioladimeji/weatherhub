import Home from "@/components/layout/home"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Weather Hub - Live Global Weather Dashboard",
  description:
    "Get real-time weather updates, forecasts, and insights for cities across the world. Stay informed even offline with smart caching.",
}


const Homepage = () => {
  return <Home />
}

export default Homepage

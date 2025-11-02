import Favorites from "@/components/layout/favorites"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Weather Hub - Favorite Cities",
  description:
    "View and manage your favorite cities to quickly access their live weather updates and forecasts anytime.",
}

const FavoritePage = () => {
  return <Favorites />
}

export default FavoritePage

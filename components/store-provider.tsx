"use client"

import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { loadWeatherFromCache } from "@/lib/slices/weatherSlice"
import { loadFavoritesFromCache } from "@/lib/slices/favoritesSlice"
import { loadNotesFromCache } from "@/lib/slices/notesSlice"
import { loadRemovedCitiesFromCache } from "@/lib/slices/citiesSlice"
import {
    loadWeatherCache,
    loadFavoritesCache,
    loadNotesCache,
    loadRemovedCitiesCache,
} from "@/lib/utils/cache"

export function Store({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const cachedWeather = loadWeatherCache()
            const cachedFavorites = loadFavoritesCache()
            const cachedNotes = loadNotesCache()
            const cachedRemovedCities = loadRemovedCitiesCache()

            // Dispatch cache data to Redux store
            store.dispatch(loadWeatherFromCache(cachedWeather))
            store.dispatch(loadFavoritesFromCache(cachedFavorites))
            store.dispatch(loadNotesFromCache(cachedNotes))
            store.dispatch(loadRemovedCitiesFromCache(cachedRemovedCities))
            setLoading(false)
        } catch (error) {
            console.error("Error hydrating store:", error)
        }
    }, [])

    if(loading) return

    return <Provider store={store}>{children}</Provider>
}

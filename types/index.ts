export interface City {
    city: string
    country: string
    latitude: number
    longitude: number
}

export interface WeatherData {
    city: string
    country: string
    temperature: number
    description: string
    humidity: number
    windSpeed: number
    pressure: number
    feelsLike: number
    icon: string
    timestamp: number
}

export interface Note {
    id: string
    city: string
    country: string
    content: string
    createdAt: number
    updatedAt: number
}

export interface NotesState {
    notes: Note[]
}


export interface FavoriteCity {
    city: string
    country: string
    addedAt: number
}

export interface FavoritesState {
    cities: FavoriteCity[]
}

export type CityResult = {
    city: string
    country: string
    latitude: number
    longitude: number
}
import { FavoriteCity, FavoritesState } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"



const initialState: FavoritesState = {
  cities: [],
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteCity>) => {
      const exists = state.cities.some((c) => c.city === action.payload.city && c.country === action.payload.country)
      if (!exists) {
        state.cities.push(action.payload)
        state.cities.sort((a, b) => a.city.localeCompare(b.city))
      }
    },
    removeFavorite: (state, action: PayloadAction<{ city: string; country: string }>) => {
      state.cities = state.cities.filter(
        (c) => !(c.city === action.payload.city && c.country === action.payload.country),
      )
    },
    loadFavoritesFromCache: (state, action: PayloadAction<FavoriteCity[]>) => {
      state.cities = action.payload
    },
  },
})

export const { addFavorite, removeFavorite, loadFavoritesFromCache } = favoritesSlice.actions
export default favoritesSlice.reducer

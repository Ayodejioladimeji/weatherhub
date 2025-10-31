import { configureStore } from "@reduxjs/toolkit"
import { enableMapSet } from "immer"
import weatherReducer from "./slices/weatherSlice"
import favoritesReducer from "./slices/favoritesSlice"
import notesReducer from "./slices/notesSlice"
import citiesReducer from "./slices/citiesSlice"

enableMapSet()

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    notes: notesReducer,
    cities: citiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["cities.removedCities"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { City } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

 

interface CitiesState {
  defaultCities: City[]
  removedCities: Set<string>
  loading: boolean
}

const initialState: CitiesState = {
  defaultCities: [],
  removedCities: new Set(),
  loading: false,
}

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setDefaultCities: (state, action: PayloadAction<City[]>) => {
      state.defaultCities = action.payload
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.removedCities.add(action.payload)
    },
    restoreCity: (state, action: PayloadAction<string>) => {
      state.removedCities.delete(action.payload)
    },
    setCitiesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    loadRemovedCitiesFromCache: (state, action: PayloadAction<string[]>) => {
      state.removedCities = new Set(action.payload)
    },
  },
})

export const { setDefaultCities, removeCity, restoreCity, setCitiesLoading, loadRemovedCitiesFromCache } =
  citiesSlice.actions

export default citiesSlice.reducer

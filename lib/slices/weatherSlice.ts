import { WeatherData } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"



export interface WeatherState {
  data: Record<string, WeatherData> 
  loading: boolean
  error: string | null
  lastUpdated: Record<string, number>
}

const initialState: WeatherState = {
  data: {},
  loading: false,
  error: null,
  lastUpdated: {},
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherLoading: (state) => {
      state.loading = true
      state.error = null
    },
    setWeatherData: (state, action: PayloadAction<WeatherData>) => {
      const cityKey = `${action.payload.city},${action.payload.country}`
      state.data[cityKey] = action.payload
      state.lastUpdated[cityKey] = Date.now()
      state.loading = false
    },
    setWeatherError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    clearWeatherError: (state) => {
      state.error = null
    },
    loadWeatherFromCache: (state, action: PayloadAction<Record<string, WeatherData>>) => {
      state.data = action.payload
    },
    removeWeatherData: (state, action: PayloadAction<{ city: string; country: string }>) => {
      const cityKey = `${action.payload.city},${action.payload.country}`
      delete state.data[cityKey]
      delete state.lastUpdated[cityKey]
    },
  },
})

export const { setWeatherLoading, setWeatherData, setWeatherError, clearWeatherError, loadWeatherFromCache, removeWeatherData } =
  weatherSlice.actions

export default weatherSlice.reducer

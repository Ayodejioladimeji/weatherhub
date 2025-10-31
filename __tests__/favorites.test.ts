import { configureStore } from "@reduxjs/toolkit"
import favoritesReducer, { addFavorite, removeFavorite } from "@/lib/slices/favoritesSlice"

describe("Favorites Slice", () => {
  it("should add a favorite city", () => {
    const store = configureStore({
      reducer: { favorites: favoritesReducer },
    })

    store.dispatch(addFavorite({ city: "London", country: "UK", addedAt: Date.now() }))
    const state = store.getState().favorites
    expect(state.cities).toHaveLength(1)
    expect(state.cities[0].city).toBe("London")
  })

  it("should remove a favorite city", () => {
    const store = configureStore({
      reducer: { favorites: favoritesReducer },
    })

    store.dispatch(addFavorite({ city: "London", country: "UK", addedAt: Date.now() }))
    store.dispatch(removeFavorite({ city: "London", country: "UK" }))
    const state = store.getState().favorites
    expect(state.cities).toHaveLength(0)
  })

  it("should not add duplicate favorites", () => {
    const store = configureStore({
      reducer: { favorites: favoritesReducer },
    })

    store.dispatch(addFavorite({ city: "London", country: "UK", addedAt: Date.now() }))
    store.dispatch(addFavorite({ city: "London", country: "UK", addedAt: Date.now() }))
    const state = store.getState().favorites
    expect(state.cities).toHaveLength(1)
  })
})

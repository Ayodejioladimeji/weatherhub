import { getWeatherDescription } from "@/lib/api/weather"

describe("Weather API", () => {
  it("should return correct weather description for code 0", () => {
    const description = getWeatherDescription(0)
    expect(description).toBe("Clear sky")
  })

  it("should return correct weather description for code 3", () => {
    const description = getWeatherDescription(3)
    expect(description).toBe("Overcast")
  })

  it("should return unknown for invalid code", () => {
    const description = getWeatherDescription(999)
    expect(description).toBe("Unknown")
  })
})

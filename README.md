# Weather Hub - Production Ready

A modern, offline-capable weather application built with Next.js 16, Redux Toolkit, and TypeScript. Features real-time weather updates, offline caching, favorite cities management, and weather notes.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [API Integration](#api-integration)
- [Offline Support](#offline-support)
- [User Experience](#user-experience)

## Features

### Core Features
- **Real-time Weather Data**: Fetches current weather using Open-Meteo API
- **Offline Support**: Seamless experience with automatic caching and offline detection
- **Favorite Cities**: Save and manage your favorite cities
- **Weather Notes**: Add notes and observations for specific cities
- **Geolocation**: Automatic location detection for weather in your area
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Toast Notifications**: User-friendly feedback for all actions

### Advanced Features
- **Smart Caching**: 30-minute cache expiration
- **Offline Persistence**: All data persists to localStorage
- **Smooth Transitions**: Welcome back online messages with refresh capability
- **Production Error Handling**: Comprehensive validation and error management
- **Type-Safe**: Full TypeScript implementation for reliability

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd weather-app
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
Create a `.env.local` file:
\`\`\`
NEXT_PUBLIC_OPEN_METEO_API=https://api.open-meteo.com/v1/forecast
NEXT_PUBLIC_GEONAMES_API=https://secure.geonames.org
NEXT_PUBLIC_GEONAMES_USERNAME=layobright
\`\`\`

4. Run development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

\`\`\`
weather-app/
├── app/
│   ├── layout.tsx           # Root layout with Redux provider and Sonner toaster
│   ├── page.tsx            # Home page wrapper
│   ├── globals.css         # Global styles and Tailwind config
│   └── (pages)/
│       ├── city/[city]/[country]/page.tsx    # Dynamic city details page
│       └── favorites/page.tsx                 # Favorites page
│
├── components/
│   ├── skeleton/
│   │   ├── home-skeleton.tsx        # Main home page loading state
│   │   ├── weather-skeleton.tsx        # Weather details page loading state
│   ├── ui/                 # shadcn UI components
│   ├── header.tsx          # Navigation header
│   ├── search-bar.tsx      # City search with autocomplete
│   ├── location-button.tsx # Geolocation button
│   ├── city-card.tsx       # Weather card component
│   └── store-provider           # store provider for cached date
│   └── theme-provider           # theme providder
│
├── lib/
│   ├── store.ts            # Redux store configuration
│   ├── hooks.ts            # Custom Redux hooks
│   ├── slices/
│   │   ├── weatherSlice.ts     # Weather state management
│   │   ├── favoritesSlice.ts   # Favorites state management
│   │   ├── notesSlice.ts       # Notes state management
│   │   └── citiesSlice.ts      # Cities state management
│   ├── api/
│   │   ├── location.ts          # Location API calls
│   │   ├── weather.ts          # Weather API calls
│   │   ├── weather-details.ts  # Detailed weather fetching
│   │   ├── largest-cities.ts   # Top cities fetching
│   │   └── city-coordinates.ts    # City search API
│   └── utils/
│       ├── cache.ts       # localStorage management
│       ├── toast.ts       # Sonner toast utilities
│
├── types.ts                # TypeScript type definitions
├── tsconfig.json          # TypeScript config
├── next.config.mjs        # Next.js config
└── package.json           # Dependencies
\`\`\`

## Technology Stack

### Core Framework
- **Next.js 16**: React framework with App Router for modern routing
- **React 19**: Latest React with Server Components support
- **TypeScript**: Type-safe JavaScript for reliability

### State Management
- **Redux Toolkit**: Predictable state container
  - Automatically includes Immer for immutable updates
  - Serializable state checks for debugging

### UI & Styling
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Sonner**: Toast notification library

### APIs & Data
- **Open-Meteo**: Free weather API (no authentication required)
- **GeoNames**: Reverse geocoding for location names
- **localStorage**: Browser storage for offline persistence

### Development
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting

## API Integration

### Open-Meteo Weather API
Fetches current weather data without requiring authentication.

**Endpoint**: `https://api.open-meteo.com/v1/forecast`

**Key Features**:
- Current weather conditions
- Hourly and daily forecasts
- Temperature, humidity, wind speed, pressure
- Weather icons and descriptions
- Timezone-aware responses

### GeoNames Reverse Geocoding
Converts coordinates to city and country names.

**Endpoint**: `https://secure.geonames.org/findNearbyPlacesJSON`

**Usage**:
- Lookup city names from GPS coordinates
- Search for cities by name
- Get city coordinates

### Usage Example
\`\`\`typescript
// Fetch weather by coordinates
const weather = await getWeatherByCoordinates(
  latitude,
  longitude,
  cityName,
  countryName
)

// Search for cities
const results = await searchCities("New York")

// Get largest cities
const cities = await getLargestCities(15)
\`\`\`

## Offline Support

### How It Works

1. **Automatic Caching**: All weather data is cached to localStorage
2. **Cache Expiration**: 30-minute default cache
3. **Offline Detection**: App detects online/offline status automatically
4. **Graceful Degradation**: Shows cached data when offline
5. **Smooth Reconnection**: Welcome back message when reconnected

### Cache Management

\`\`\`typescript
// Save to cache
saveWeatherCache(weatherData)

// Load from cache
const cached = loadWeatherCache()

// Check if cache is expired
if (isCacheExpired(timestamp)) {
  // Fetch fresh data
}

// Clear cache entry
removeWeatherFromCache(city, country)
\`\`\`

### localStorage Keys
- `weather_cache`: Cached weather data
- `favorites_cache`: User's favorite cities
- `notes_cache`: User's weather notes
- `removed_cities_cache`: Removed city IDs

## User Experience

### Online Flow
1. User opens app
2. Cached data loads instantly
3. Fresh data fetches in background
4. UI updates with new information
5. User can add/remove favorites and notes

### Offline Flow
1. User goes offline
2. App shows offline indicator
3. Cached weather data displays
4. Add/remove/favorite actions still work
5. Changes sync when back online

### Coming Back Online
1. App detects connection restored
2. Shows "Welcome back online!" message
3. User can click "Refresh Weather Data"
4. Fresh weather updates with latest info
5. Cached data remains visible throughout

### Error Handling
- **Location Denied**: Toast notification with instructions
- **API Failures**: Gracefully falls back to cached data
- **Network Errors**: Automatic retry with exponential backoff
- **Invalid Input**: Form validation before API calls

## Redux Store Architecture

### State Shape
\`\`\`typescript
{
  weather: {
    data: Record<"city,country", WeatherData>,
    loading: boolean,
    error: string | null,
    lastUpdated: Record<"city,country", timestamp>
  },
  favorites: {
    cities: Array<{city, country, addedAt}>
  },
  notes: {
    notes: Array<{id, city, country, content, timestamps}>
  },
  cities: {
    cities: City[],
    removedCities: Set<"city,country">
  }
}
\`\`\`

### Key Slices

**weatherSlice**: 
- Manages weather data for all cities
- Handles loading and error states
- Provides setWeatherData, removeWeatherData, loadWeatherFromCache

**favoritesSlice**:
- Manages user's favorite cities
- Persists to cache automatically
- Provides addFavorite, removeFavorite

**notesSlice**:
- Manages weather notes per city
- Timestamps for creation and updates
- Provides addNote, updateNote, deleteNote

**citiesSlice**:
- Manages default cities list
- Tracks removed cities with Set
- Provides setDefaultCities, removeCity

## Best Practices Implemented

### Performance
- Memoized callbacks with useCallback to prevent re-renders
- Lazy loading of components
- Efficient Redux selectors
- Cache to avoid redundant API calls

### Security
- Input validation on all API calls
- TypeScript for type safety
- Environment variable protection
- No sensitive data in localStorage

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly

### Code Quality
- Comprehensive error handling
- Detailed console logging for debugging
- Clean code organization by feature
- Type-safe implementations

### Location not working
1. Check browser location permissions
2. Ensure HTTPS or localhost (required for geolocation)
3. Check GeoNames credentials in environment variables
4. View console logs for specific error

### Cache not persisting
1. Check localStorage quota (usually 5-10MB)
2. Verify browser allows localStorage
3. Check browser privacy settings
4. Look for QuotaExceededError in console

### API not responding
1. Verify internet connection
2. Check if APIs are accessible from your location
3. Verify environment variables are set
4. Check browser console for CORS errors


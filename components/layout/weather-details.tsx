"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addNote, updateNote, deleteNote } from "@/lib/slices/notesSlice"
import { addFavorite, removeFavorite } from "@/lib/slices/favoritesSlice"
import { setWeatherData } from "@/lib/slices/weatherSlice"
import { saveNotesCache } from "@/lib/utils/cache"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Heart, Trash2, Plus, Edit2, X } from "lucide-react"
import type { Note } from "@/types"
import WeatherSkeleton from "@/components/skeleton/weather-skeleton"
import { getWeatherDetails } from "@/lib/api/weather-details"
import { ConfirmationDialog } from "@/components/confirmation-modal"

const WeatherDetails = () =>  {
  const params = useParams()
  const router = useRouter()

  const city = decodeURIComponent(params.city as string)
  const country = decodeURIComponent(params.country as string)

  const dispatch = useAppDispatch()
  const weather = useAppSelector((state) => state.weather)
  const favorites = useAppSelector((state) => state.favorites)
  const notes = useAppSelector((state) => state.notes)

  const [noteContent, setNoteContent] = useState("")
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean
    noteId: string | null
  }>({
    open: false,
    noteId: null,
  })

  const cacheKey = `${city},${country}`
  const weatherData = weather.data[cacheKey]
  const isFavorite = favorites.cities.some((fav) => fav.city === city && fav.country === country)
  const cityNotes = notes.notes.filter((n) => n.city === city && n.country === country)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!weatherData) {
          const data = await getWeatherDetails(city, country)
          if (data) {
            dispatch(setWeatherData(data))
          }
        }
      } catch (error) {
        console.error("Error fetching weather:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city, country, dispatch, weatherData])

  const handleAddNote = useCallback(() => {
    if (!noteContent.trim()) return

    if (editingNoteId) {
      const note = notes.notes.find((n: Note) => n.id === editingNoteId)
      if (note) {
        dispatch(
          updateNote({
            ...note,
            content: noteContent,
            updatedAt: Date.now(),
          }),
        )
      }
      setEditingNoteId(null)
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        city,
        country,
        content: noteContent,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      dispatch(addNote(newNote))
    }

    setNoteContent("")
  }, [noteContent, editingNoteId, notes.notes, city, country, dispatch])

  const handleEditNote = useCallback((note: Note) => {
    setNoteContent(note.content)
    setEditingNoteId(note.id)
  }, [])

  const handleDeleteNoteClick = useCallback((noteId: string) => {
    setDeleteConfirmation({
      open: true,
      noteId,
    })
  }, [])

  const handleConfirmDelete = useCallback(() => {
    if (deleteConfirmation.noteId) {
      dispatch(deleteNote(deleteConfirmation.noteId))
      setDeleteConfirmation({ open: false, noteId: null })
    }
  }, [deleteConfirmation.noteId, dispatch])

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFavorite({ city, country }))
    } else {
      dispatch(addFavorite({ city, country, addedAt: Date.now() }))
    }
  }, [isFavorite, city, country, dispatch])

  useEffect(() => {
    saveNotesCache(notes.notes)
  }, [notes.notes])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white"> 
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Button onClick={() => router.back()} variant="outline" className="mb-6 gap-2 hover:bg-gray-100">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {loading ? (
          <WeatherSkeleton />
        ) : (
          <>
            {weatherData ? (
              <>
                {/* Weather Card */}
                <Card className="mb-8 bg-gradient-to-br from-green-50 to-green-100 border-gray-200 p-8">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
                    <div>
                      <h1 className="text-2xl md:text-4xl font-bold text-green-900">{weatherData.city}</h1>
                      <p className="text-lg text-green-700">{weatherData.country}</p>
                    </div>
                    <Button
                      onClick={handleToggleFavorite}
                      variant="outline"
                      className="gap-2 border-gray-300 hover:bg-green-100 bg-transparent"
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                      {isFavorite ? "Favorited" : "Add to Favorites"}
                    </Button>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-6xl">{weatherData.icon}</div>
                        <div>
                          <div className="text-5xl font-bold text-green-800">{weatherData.temperature}°C</div>
                          <p className="text-lg text-green-700 capitalize">{weatherData.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-green-700">
                      <div className="flex justify-between">
                        <span>Feels Like:</span>
                        <span className="font-semibold">{weatherData.feelsLike}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Humidity:</span>
                        <span className="font-semibold">{weatherData.humidity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wind Speed:</span>
                        <span className="font-semibold">{weatherData.windSpeed} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pressure:</span>
                        <span className="font-semibold">{weatherData.pressure} hPa</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Notes Section */}
                <div className="space-y-6">
                  <h2 className="text-xl md:text-2xl font-bold text-green-900">Weather Notes</h2>

                  {/* Add/Edit Note Form */}
                  <Card className="border-gray-200 p-6">
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Add a note about the weather..."
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        className="min-h-24 border-gray-300 focus:border-gray-600 focus:ring-green-600"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddNote}
                          disabled={!noteContent.trim()}
                          className="flex-1 bg-green-800 hover:bg-green-700 text-white gap-2"
                        >
                          {editingNoteId ? (
                            <>
                              <Edit2 className="h-4 w-4" />
                              Update Note
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4" />
                              Add Note
                            </>
                          )}
                        </Button>
                        {editingNoteId && (
                          <Button
                            onClick={() => {
                              setEditingNoteId(null)
                              setNoteContent("")
                            }}
                            variant="outline"
                            className="border-gray-300 hover:bg-green-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>

                  {/* Notes List */}
                  {cityNotes.length > 0 ? (
                    <div className="space-y-3">
                      {cityNotes.map((note: Note) => (
                        <Card key={note.id} className="border-gray-100 p-4 shadow-xs">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-green-900">{note.content}</p>
                              <p className="text-xs text-green-600 mt-2">
                                {new Date(note.updatedAt).toLocaleDateString()} at{" "}
                                {new Date(note.updatedAt).toLocaleTimeString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditNote(note)}
                                className="border-gray-300 hover:bg-green-50"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteNoteClick(note.id)}
                                className="border-red-300 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="shadow-xs border-gray-100 p-6 text-center">
                      <p className="text-green-600">No notes yet. Add one to get started!</p>
                    </Card>
                  )}
                </div>
              </>
            ) : (
              <Card className="shadow-xs border-gray-100 p-6 text-center">
                <p className="text-green-700 text-lg font-medium">
                  Sorry, we couldn{"'"}t find weather details for <span className="font-semibold">{city}</span>,{" "}
                  <span className="font-semibold">{country}</span>.
                </p>
                <p className="text-green-500 mt-2 text-sm">
                  Try searching for another location or check your spelling.
                </p>
              </Card>
            )}
          </>
        )}
      </main>

      <ConfirmationDialog
        open={deleteConfirmation.open}
        title="Delete Note"
        description="Are you sure you want to delete this note? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmation({ open: false, noteId: null })}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
      />
    </div>
  )
}


export default WeatherDetails 
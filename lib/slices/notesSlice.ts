import { Note, NotesState } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"



const initialState: NotesState = {
  notes: [],
}

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload)
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((n) => n.id === action.payload.id)
      if (index !== -1) {
        state.notes[index] = action.payload
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((n) => n.id !== action.payload)
    },
    loadNotesFromCache: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload
    },
  },
})

export const { addNote, updateNote, deleteNote, loadNotesFromCache } = notesSlice.actions
export default notesSlice.reducer

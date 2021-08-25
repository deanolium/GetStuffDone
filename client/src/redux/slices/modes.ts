import { createSlice } from '@reduxjs/toolkit'

export enum Modes {
  View,
  Edit,
  Delete,
}

interface ModeState {
  mode: Modes
}

const initialState: ModeState = {
  mode: Modes.View,
}

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    enterViewMode(state) {
      state.mode = Modes.View
    },
    enterEditMode(state) {
      state.mode = Modes.Edit
    },
    enterDeleteMode(state) {
      state.mode = Modes.Delete
    },
  },
})

export const {
  enterEditMode,
  enterViewMode,
  enterDeleteMode,
} = modeSlice.actions
export default modeSlice.reducer

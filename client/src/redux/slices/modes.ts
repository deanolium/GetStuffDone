import { createSlice } from '@reduxjs/toolkit'

export enum Modes {
  View,
  Edit,
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
  },
})

export const { enterEditMode, enterViewMode } = modeSlice.actions
export default modeSlice.reducer

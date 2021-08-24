import { configureStore } from '@reduxjs/toolkit'
import modeReducer from './slices/modes'

const store = configureStore({
  reducer: {
    modes: modeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store

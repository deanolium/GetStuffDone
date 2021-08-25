import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMode } from '../../../redux/selectors/mode.selectors'
import {
  enterEditMode,
  enterViewMode,
  enterDeleteMode,
  Modes,
} from '../../../redux/slices/modes'

// TODO: Add Filtering
const MenuBar: FC = ({ children }) => {
  const mode = useSelector(selectMode)
  const dispatch = useDispatch()

  return (
    <header>
      <h1>{children}</h1>
      {mode !== Modes.View && (
        <button onClick={() => dispatch(enterViewMode())}>View Mode</button>
      )}
      {mode !== Modes.Edit && (
        <button onClick={() => dispatch(enterEditMode())}>Edit Mode</button>
      )}
      {mode !== Modes.Delete && (
        <button onClick={() => dispatch(enterDeleteMode())}>Delete Mode</button>
      )}
    </header>
  )
}

export default MenuBar

import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMode } from '../../../redux/selectors/mode.selectors'
import {
  enterEditMode,
  enterViewMode,
  Modes,
} from '../../../redux/slices/modes'

// TODO: Add delete mode functionality
// TODO: Add Filtering
const MenuBar: FC = ({ children }) => {
  const mode = useSelector(selectMode)
  const dispatch = useDispatch()

  let modeText
  let nextModeFunction: ActionCreatorWithoutPayload<string>

  switch (mode) {
    case Modes.View:
      modeText = 'View Mode'
      nextModeFunction = enterEditMode
      break

    case Modes.Edit:
      modeText = 'Edit Mode'
      nextModeFunction = enterViewMode
  }

  const setMode = () => {
    dispatch(nextModeFunction())
  }

  return (
    <header>
      <h1>{children}</h1>
      <button onClick={setMode}>{modeText}</button>
    </header>
  )
}

export default MenuBar

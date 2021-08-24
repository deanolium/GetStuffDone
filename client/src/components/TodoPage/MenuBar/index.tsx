import React, { FC } from 'react'

// TODO: Add delete mode functionality
// TODO: Add Filtering
const MenuBar: FC = ({ children }) => {
  return (
    <header>
      <h1>{children}</h1>
    </header>
  )
}

export default MenuBar

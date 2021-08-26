import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'

const calculateBoundingBoxes = (children: React.ReactNode) => {
  const boundingBoxes: { [key: string]: any } = {}

  React.Children.forEach(children, (child) => {
    const domNode = (child as any).ref?.current ?? null
    if (domNode === null) return
    const nodeBoundingBox = domNode.getBoundingClientRect()

    boundingBoxes[(child as any).key] = nodeBoundingBox
  })

  return boundingBoxes
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const AnimatePosition: FC = ({ children }) => {
  const [boundingBox, setBoundingBox] = useState<{ [key: string]: any }>({})
  const [prevBoundingBox, setPrevBoundingBox] = useState<{
    [key: string]: any
  }>({})
  const prevChildren = usePrevious<React.ReactNode>(children)

  useLayoutEffect(() => {
    const newBoundingBox = calculateBoundingBoxes(children)
    setBoundingBox(newBoundingBox)
  }, [children])

  useLayoutEffect(() => {
    if (prevChildren) {
      const prevBoundingBox = calculateBoundingBoxes(prevChildren)
      setPrevBoundingBox(prevBoundingBox)
    }
  }, [prevChildren])

  useLayoutEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length

    if (hasPrevBoundingBox) {
      React.Children.forEach(children, (child) => {
        const { ref, key } = child as any
        const domNode = ref.current
        const firstBox = prevBoundingBox[key]
        const lastBox = boundingBox[key]
        if (!firstBox || !lastBox) return

        const changeInX = firstBox.left - lastBox.left
        const changeInY = firstBox.top - lastBox.top

        if (changeInX || changeInY) {
          requestAnimationFrame(() => {
            // Before the DOM paints, invert child to old position
            domNode.style.transform = `translate(${changeInX}px, ${changeInY}px)`
            domNode.style.transition = 'transform 0s'

            requestAnimationFrame(() => {
              // After the previous frame, remove
              // the transistion to play the animation
              domNode.style.transform = ''
              domNode.style.transition = 'transform 500ms'
            })
          })
        }
      })
    }
  }, [boundingBox, prevBoundingBox, children])

  return <>{children}</>
}

export default AnimatePosition

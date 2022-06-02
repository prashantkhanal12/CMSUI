import {useCallback, useEffect, useState} from 'react'

const useContextMenu = () => {
  const [xPos, setXPos] = useState('0px')
  const [yPos, setYPos] = useState('0px')
  const [showMenu, setShowMenu] = useState(false)

  const handleContextMenu = useCallback(
    (e, isModal) => {
      e.preventDefault()
      let leftCursorPosition = e.pageX
      let topCursorPosition = e.pageY
      if (isModal) {
        const element: any = document.getElementById('mediaManager')
        const leftOffset = element.offsetLeft + 17
        const topOffset = element.offsetTop + 60
        leftCursorPosition = e.pageX - leftOffset
        topCursorPosition = e.pageY - topOffset
      }
      setXPos(`${leftCursorPosition}px`)
      setYPos(`${topCursorPosition}px`)
    },
    [setXPos, setYPos]
  )

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false)
  }, [showMenu])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.addEventListener('click', handleClick)
    }
  })

  return {xPos, yPos, showMenu, setShowMenu, handleContextMenu}
}

export default useContextMenu

import { useState } from "react"

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        You can use the app by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press History: {allClicks.join(' ')}
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  })
  const [allClicks, setAll] = useState([])

  const handleConstClick = (value) => () => {
    setClicks({left: value, right: value})
    setAll(allClicks.concat('C'))
  }

  const handleLeftClick = () => {
    setClicks({...clicks, left: clicks.left + 1})
    setAll(allClicks.concat('L'))
  }

  const handleRightClick = () => {
    setClicks({...clicks, right: clicks.right + 1})
    setAll(allClicks.concat('R'))
  }

  const resetClick = () => {
    setClicks({left: 0, right: 0})
    setAll([])
  }

  return (
    <div>
      {clicks.left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {clicks.right}
      <br />
      <Button handleClick={resetClick} text='reset' />
      <br />
      <Button handleClick={handleConstClick(1000)} text='constant' />
      <History allClicks={allClicks} />
    </div>
  )
}


export default App;
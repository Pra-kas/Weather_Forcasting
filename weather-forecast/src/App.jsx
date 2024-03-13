import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id='root'>
        <div className="header">
          <h1 className='title'>Weather Forecaster</h1>
          <input type="text"id="search" className='searchbar' />
          <input type="submit" value="submit" className='bar' />
        </div>
        

        <div className="item-container">
            <p>hi</p>
        </div>
      </div>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Cars from './Components/Cars/Cars'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className='App'>
           <Cars/>
        </div>
    </>
  )
}

export default App

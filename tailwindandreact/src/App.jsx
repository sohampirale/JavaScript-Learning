import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-red-500">
        <h1 className="text-green-300 text-5xl font-extrabold bg-yellow-300 p-8 rounded-full shadow-xl">
          Tailwind is Working!
        </h1>
      </div>
    </>

  )
}

export default App

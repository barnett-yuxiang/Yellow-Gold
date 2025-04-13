import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ColorMixer from './components/ColorMixer/index'
import ColorPalette from './components/ColorPalette'
import MixHistory from './components/MixHistory'

type SelectionMode = 'none' | 'colorA' | 'colorB';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('none')
  const [colorA, setColorA] = useState('')
  const [colorB, setColorB] = useState('')

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  const handleSelectColor = (hexColor: string) => {
    if (selectionMode === 'colorA') {
      setColorA(hexColor)
      setSelectionMode('none')
    } else if (selectionMode === 'colorB') {
      setColorB(hexColor)
      setSelectionMode('none')
    }
  }

  const handleSelectColorA = () => {
    setSelectionMode('colorA')
  }

  const handleSelectColorB = () => {
    setSelectionMode('colorB')
  }

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-yellow-300 via-pink-400 to-cyan-300 text-gray-800'}`}>
      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />

      <main className="container mx-auto p-4 flex flex-col h-[calc(100vh-80px)]">
        <ColorMixer
          colorA={colorA}
          colorB={colorB}
          onSelectColorA={handleSelectColorA}
          onSelectColorB={handleSelectColorB}
        />

        {/* Bottom Sections Container */}
        <div className="flex flex-col flex-1 overflow-hidden space-y-6 md:flex-row md:space-y-0 md:space-x-6">
          <ColorPalette
            onSelectColor={handleSelectColor}
            selectionMode={selectionMode}
          />
          <MixHistory />
        </div>
      </main>
    </div>
  )
}

export default App

import { useState } from 'react'
import ColorMixer from './components/ColorMixer'
import ColorPalette from './components/ColorPalette'
import MixHistory from './components/MixHistory'

function App() {
  const [mixHistory, setMixHistory] = useState([])
  const [activeInput, setActiveInput] = useState(null) // 'A' or 'B' or null
  const [colorA, setColorA] = useState(null)
  const [colorB, setColorB] = useState(null)
  
  const handleColorSelect = (color) => {
    if (activeInput === 'A') {
      setColorA(color)
    } else if (activeInput === 'B') {
      setColorB(color)
    }
    setActiveInput(null)
  }

  const handleSelectHistory = (record) => {
    setColorA(record.colorA);
    setColorB(record.colorB);
    // 不需要设置 result，因为它会在点击 Mix 后自动计算
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="
            font-['Segoe_Script','cursive'] 
            text-2xl 
            font-bold
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-pink-400 
            to-purple-500
            px-6
          ">
            Lorene's Color Palette
          </h2>
          <h1 className="text-4xl font-bold absolute left-1/2 -translate-x-1/2">
            ColorMix Buddy
          </h1>
        </div>
        
        <div className="space-y-8">
          <ColorMixer 
            colorA={colorA}
            colorB={colorB}
            activeInput={activeInput}
            onColorAClick={() => setActiveInput('A')}
            onColorBClick={() => setActiveInput('B')}
            onColorAChange={setColorA}
            onColorBChange={setColorB}
            onMixComplete={(result) => {
              setMixHistory(prev => [{
                colorA,
                colorB,
                result,
                timestamp: Date.now()
              }, ...prev])
            }}
          />
          
          <div className="grid grid-cols-2 gap-8">
            <ColorPalette 
              onSelectColor={handleColorSelect}
            />
            <MixHistory 
              history={mixHistory} 
              onSelectHistory={handleSelectHistory}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

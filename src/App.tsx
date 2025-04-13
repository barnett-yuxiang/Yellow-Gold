import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ColorMixer from './components/ColorMixer/index'
import ColorPalette from './components/ColorPalette'
import MixHistory, { MixRecord } from './components/MixHistory'
import { MixingAlgorithm } from './components/ColorMixer/ControlPanel'
import { v4 as uuidv4 } from 'uuid'

type SelectionMode = 'none' | 'colorA' | 'colorB';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('none')
  const [colorA, setColorA] = useState('')
  const [colorB, setColorB] = useState('')
  const [mixHistory, setMixHistory] = useState<MixRecord[]>([])
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<MixingAlgorithm>('additive')
  const [resultColor, setResultColor] = useState('')

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

  const handleMixComplete = (colorA: string, colorB: string, resultColor: string, algorithm: MixingAlgorithm) => {
    // Update the result color in the app state
    setResultColor(resultColor)

    const newRecord: MixRecord = {
      id: uuidv4(),
      colorA,
      colorB,
      resultColor,
      algorithm,
      timestamp: new Date()
    }

    // Add new record to the beginning of the array (most recent first)
    setMixHistory(prev => [newRecord, ...prev])
  }

  const handleLoadMixRecord = (record: MixRecord) => {
    // Batch update all states to reduce render cycles
    // Ensure all record data is completely loaded
    if (record) {
      // Clear selection mode to prevent conflicts with record loading
      setSelectionMode('none');

      // Update all states at once for consistency
      setColorA(record.colorA || '');
      setColorB(record.colorB || '');
      setSelectedAlgorithm(record.algorithm);
      setResultColor(record.resultColor || '');

      // Log the loaded record for debugging
      console.log('Loaded record:', record);
    }
  }

  const handleDeleteRecord = (id: string) => {
    // Filter out the record with the matching id
    setMixHistory(prev => prev.filter(record => record.id !== id))
  }

  const handleClearAllRecords = () => {
    // Clear all mix history records
    setMixHistory([]);
  }

  // Placeholder for future implementation
  const handleSyncFromServer = () => {
    // TODO: Implement synchronization from backend server
    console.log("Sync from server functionality will be implemented in the future");
  }

  // Placeholder for future implementation
  const handleUploadToServer = () => {
    // TODO: Implement upload to backend server
    console.log("Upload to server functionality will be implemented in the future");
  }

  const handleReset = () => {
    // Reset all colors and algorithm
    setColorA('')
    setColorB('')
    setResultColor('')
    setSelectedAlgorithm('additive')
  }

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-yellow-300 via-pink-400 to-cyan-300 text-gray-800'}`}>
      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />

      <main className="container mx-auto p-4 flex flex-col h-[calc(100vh-80px)]">
        <ColorMixer
          colorA={colorA}
          colorB={colorB}
          resultColor={resultColor}
          algorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
          onSelectColorA={handleSelectColorA}
          onSelectColorB={handleSelectColorB}
          onMixComplete={handleMixComplete}
          onReset={handleReset}
        />

        {/* Bottom Sections Container */}
        <div className="flex flex-col flex-1 overflow-hidden space-y-6 md:flex-row md:space-y-0 md:space-x-6">
          <ColorPalette
            onSelectColor={handleSelectColor}
            selectionMode={selectionMode}
          />
          <MixHistory
            mixRecords={mixHistory}
            onSelectColor={handleSelectColor}
            onLoadMixRecord={handleLoadMixRecord}
            onDeleteRecord={handleDeleteRecord}
            onClearAllRecords={handleClearAllRecords}
            onSyncFromServer={handleSyncFromServer}
            onUploadToServer={handleUploadToServer}
          />
        </div>
      </main>
    </div>
  )
}

export default App

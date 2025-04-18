import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ColorMixer from './components/ColorMixer/index'
import ColorPalette from './components/ColorPalette'
import MixHistory from './components/MixHistory/index'
import { MixRecord } from './components/MixHistory/types'
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

  // Implementation for syncing mix records from server
  const handleSyncFromServer = async (confirmed: boolean): Promise<boolean> => {
    // If not confirmed yet, just return true to keep the confirmation dialog open
    if (!confirmed) {
      return true;
    }

    try {
      // Call the sync API endpoint
      const response = await fetch('/api/sync-records');
      const result = await response.json();

      // Log the result
      console.log('Sync result:', result);

      if (result.success && Array.isArray(result.records)) {
        // Convert ISO date strings back to Date objects
        const records = result.records.map((record: {
          id: string;
          colorA: string;
          colorB: string;
          resultColor: string;
          algorithm: MixingAlgorithm;
          timestamp: string;
        }) => ({
          ...record,
          timestamp: new Date(record.timestamp)
        }));

        // Replace the current mix history with the fetched records
        setMixHistory(records);
        return true;
      } else {
        throw new Error(result.message || 'Failed to sync records');
      }
    } catch (error) {
      console.error('Error syncing records:', error);
      return false;
    }
  }

  // Implementation for uploading mix records to server
  const handleUploadToServer = async (confirmed: boolean): Promise<boolean> => {
    // If not confirmed yet, just return true to keep the confirmation dialog open
    if (!confirmed) {
      return true;
    }

    try {
      // Prepare records for upload (convert Date to ISO string for JSON serialization)
      const recordsToUpload = mixHistory.map(record => ({
        ...record,
        timestamp: record.timestamp.toISOString()
      }));

      // Call the upload API endpoint
      const response = await fetch('/api/upload-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordsToUpload),
      });

      const result = await response.json();

      // Log the result
      console.log('Upload result:', result);

      // Return true if successful, false otherwise
      return result.success === true;
    } catch (error) {
      console.error('Error uploading records:', error);
      return false;
    }
  }

  const handleReset = () => {
    // Reset all colors and algorithm
    setColorA('')
    setColorB('')
    setResultColor('')
    setSelectedAlgorithm('additive')
  }

  // Test database connection
  const handleTestConnection = async (): Promise<boolean> => {
    try {
      // Call the test-connection API endpoint
      const response = await fetch('/api/test-connection');
      const data = await response.json();

      // Log the response for debugging
      console.log('Database connection test:', data);

      // Return true if connection was successful
      return data.success === true;
    } catch (error) {
      console.error('Error testing database connection:', error);
      return false;
    }
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
            onTestConnection={handleTestConnection}
          />
        </div>
      </main>
    </div>
  )
}

export default App

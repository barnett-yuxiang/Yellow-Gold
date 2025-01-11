import { useState } from 'react'
import ColorBlock from './ColorBlock'

function ColorMixer({ 
  colorA, 
  colorB, 
  onColorAClick,
  onColorBClick,
  onColorAChange,
  onColorBChange,
  onMixComplete,
  activeInput
}) {
  const [result, setResult] = useState(null);

  const mixColors = () => {
    if (!colorA || !colorB) return;

    const mixed = {
      r: Math.round((colorA.r + colorB.r) / 2),
      g: Math.round((colorA.g + colorB.g) / 2),
      b: Math.round((colorA.b + colorB.b) / 2)
    };

    setResult(mixed);
    onMixComplete(mixed);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center relative">
        <div className="flex items-center gap-8">
          <div 
            className={`relative ${activeInput === 'A' ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
            onClick={onColorAClick}
          >
            <div className="flex flex-col items-center">
              <ColorBlock 
                color={colorA} 
                placeholder="Color A"
                onChange={onColorAChange}
              />
              {activeInput === 'A' && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-2 py-0.5 text-xs rounded-full">
                  Selecting
                </div>
              )}
            </div>
          </div>

          <span className="text-3xl mt-[-40px]">+</span>

          <div 
            className={`relative ${activeInput === 'B' ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
            onClick={onColorBClick}
          >
            <div className="flex flex-col items-center">
              <ColorBlock 
                color={colorB}
                placeholder="Color B"
                onChange={onColorBChange}
              />
              {activeInput === 'B' && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-2 py-0.5 text-xs rounded-full">
                  Selecting
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={mixColors}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 mt-[-40px]"
          >
            Mix
          </button>

          <span className="text-3xl mt-[-40px]">=</span>

          <div className="flex flex-col items-center">
            <ColorBlock 
              color={result}
              placeholder="Result"
              readOnly
            />
          </div>
        </div>

        <button
          onClick={() => {
            onColorAChange(null);
            onColorBChange(null);
            setResult(null);
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default ColorMixer 
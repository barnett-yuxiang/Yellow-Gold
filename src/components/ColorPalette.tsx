import { FC, useState } from 'react';
import { ColorInfo, predefinedColors } from '../data/colors';

type SelectionMode = 'none' | 'colorA' | 'colorB';

interface ColorPaletteProps {
  // Will be expanded as needed
  onSelectColor?: (color: string) => void;
  selectionMode?: SelectionMode;
}

const ColorPalette: FC<ColorPaletteProps> = ({ onSelectColor, selectionMode = 'none' }) => {
  const [hoveredColor, setHoveredColor] = useState<ColorInfo | null>(null);

  const handleColorClick = (color: ColorInfo) => {
    if (onSelectColor) {
      onSelectColor(color.hex);
    }
  };

  const getSelectionModeText = () => {
    if (selectionMode === 'colorA') {
      return '- Select Color A';
    } else if (selectionMode === 'colorB') {
      return '- Select Color B';
    }
    return '';
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 flex-1 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
        <span>Color Palette</span>
        {selectionMode !== 'none' && (
          <div className="flex items-center">
            <span className="text-sm text-blue-600 font-bold animate-pulse mr-2">
              {getSelectionModeText()}
            </span>
            <button
              onClick={() => onSelectColor && onSelectColor('')}
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded px-2 py-0.5 flex items-center justify-center transition-colors border border-blue-300"
              title="Cancel selection"
            >
              Cancel
            </button>
          </div>
        )}
      </h2>
      <div className="flex-1 overflow-auto border-2 border-dashed border-gray-300 rounded-lg p-4">
        <div className="grid grid-cols-6 gap-3 content-start">
          {predefinedColors.map((color, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div
                className={`w-full aspect-square rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${
                  selectionMode !== 'none' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => handleColorClick(color)}
                onMouseEnter={() => setHoveredColor(color)}
                onMouseLeave={() => setHoveredColor(null)}
              >
                {/* Information displayed directly on the color block */}
                {hoveredColor === color && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-1 bg-black/60 backdrop-blur-sm text-white text-xs animate-fadeIn transition-all duration-200 ease-in-out transform scale-100">
                    <div className="font-bold">{color.nameEn}</div>
                    <div>{color.nameZh}</div>
                    <div className="mt-1 font-mono text-xs">{color.hex}</div>
                    <div className="font-mono text-xs">{color.rgb}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColorPalette;
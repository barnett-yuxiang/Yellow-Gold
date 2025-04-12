import { FC, useState } from 'react';
import { ColorInfo, predefinedColors } from '../data/colors';

interface ColorPaletteProps {
  // Will be expanded as needed
  onSelectColor?: (color: string) => void;
}

const ColorPalette: FC<ColorPaletteProps> = ({ onSelectColor }) => {
  const [hoveredColor, setHoveredColor] = useState<ColorInfo | null>(null);

  const handleColorClick = (color: ColorInfo) => {
    if (onSelectColor) {
      onSelectColor(color.hex);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 flex-1 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
      <div className="flex-1 overflow-auto border-2 border-dashed border-gray-300 rounded-lg p-4">
        <div className="grid grid-cols-6 gap-3 content-start">
          {predefinedColors.map((color, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div
                className="w-full aspect-square rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
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
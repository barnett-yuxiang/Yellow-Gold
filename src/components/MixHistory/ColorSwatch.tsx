import { FC } from 'react';

interface ColorSwatchProps {
  color: string;
  showHex?: boolean;
  onSelectColor?: (color: string) => void;
}

const ColorSwatch: FC<ColorSwatchProps> = ({
  color,
  showHex = true,
  onSelectColor
}) => {
  // Helper function to format hex codes to uppercase with appropriate spacing
  const formatHexToUppercase = (hex: string) => {
    if (!hex) return '';
    // Keep the # prefix but convert the rest to uppercase
    if (hex.startsWith('#')) {
      return `#${hex.substring(1).toUpperCase()}`;
    } else {
      return `#${hex.toUpperCase()}`;
    }
  };

  return (
    <div className="flex items-center">
      <div
        className="w-8 h-8 rounded-md shadow-sm cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => onSelectColor && onSelectColor(color)}
        title="Click to use this color"
      />
      {showHex && (
        <div className="ml-1 mr-2 text-xs font-mono text-gray-600 hidden md:block">
          {formatHexToUppercase(color)}
        </div>
      )}
    </div>
  );
};

export default ColorSwatch;
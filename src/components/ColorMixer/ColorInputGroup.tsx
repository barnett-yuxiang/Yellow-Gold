import { FC } from 'react';
import { RandomColorIcon } from '../icons';

export interface ColorInputGroupProps {
  color: string;
  onChange: (value: string) => void;
  onRandomColor: () => void;
  label: string;
  placeholder: string;
  emptyColor: string;
  readOnly?: boolean;
}

// Utility function to determine text color based on background
export const getContrastColor = (hexColor: string) => {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  // Calculate brightness (weighted RGB)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? '#000000' : '#FFFFFF';
};

export const ColorInputGroup: FC<ColorInputGroupProps> = ({
  color,
  onChange,
  onRandomColor,
  label,
  placeholder,
  emptyColor,
  readOnly = false
}) => {
  const displayColor = color ? (color.startsWith('#') ? color : `#${color}`) : emptyColor;

  return (
    <div className="flex items-center">
      <div className="flex flex-col">
        <div
          className="w-24 h-24 rounded shadow-md mb-4 flex items-center justify-center"
          style={{ backgroundColor: displayColor }}
        >
          <span style={{ color: getContrastColor(displayColor) }} className="text-xs font-bold">{label}</span>
        </div>
        {readOnly ? (
          <div className="w-24 text-center border border-gray-300 rounded py-1 px-2 font-medium">
            {color || '-'}
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex items-center w-24 border border-gray-300 rounded py-1 px-2 bg-white">
              <span className="text-gray-500">#</span>
              <input
                type="text"
                value={color.startsWith('#') ? color.substring(1) : color}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-center border-none focus:outline-none p-0 m-0"
                placeholder={placeholder}
              />
            </div>
            <button
              onClick={onRandomColor}
              className="ml-2 bg-gray-100 border border-gray-300 rounded p-1 hover:bg-gray-200 transition-colors"
              title="Pick random primary color"
            >
              <RandomColorIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
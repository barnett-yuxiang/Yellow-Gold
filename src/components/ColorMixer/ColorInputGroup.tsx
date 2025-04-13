import { FC } from 'react';
import { RandomColorIcon } from '../icons';
import { getContrastColor } from './utils';

export interface ColorInputGroupProps {
  color: string;
  onChange: (value: string) => void;
  onRandomColor: () => void;
  label: string;
  placeholder: string;
  emptyColor: string;
  readOnly?: boolean;
}

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

  // Format the color code for display (uppercase for consistency)
  const formattedColor = color ?
    (color.startsWith('#') ? color.substring(1).toUpperCase() : color.toUpperCase()) :
    '';

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
          <div className="flex items-center w-24 border border-gray-300 rounded py-1 px-2 bg-gray-100">
            <span className="text-gray-500">#</span>
            <span className="w-full text-center font-medium">{formattedColor || '-'}</span>
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
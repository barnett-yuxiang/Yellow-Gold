import React, { FC } from 'react';
import { MixRecord } from './types';
import ColorSwatch from './ColorSwatch';

interface MixHistoryItemProps {
  record: MixRecord;
  onSelectColor?: (color: string) => void;
  onLoadMixRecord?: (record: MixRecord) => void;
  onDeleteRecord?: (id: string) => void;
}

const MixHistoryItem: FC<MixHistoryItemProps> = ({
  record,
  onSelectColor,
  onLoadMixRecord,
  onDeleteRecord
}) => {
  const handleLoadRecord = (e: React.MouseEvent) => {
    // Prevent event bubbling to avoid conflicts with other clicks
    e.stopPropagation();
    // Ensure data integrity before passing
    if (record && record.colorA && record.colorB && record.resultColor) {
      // Create a deep copy to avoid reference issues
      const recordCopy = {...record};
      onLoadMixRecord?.(recordCopy);
    } else {
      console.warn('Incomplete record data', record);
    }
  };

  return (
    <li className="py-3 px-4 hover:bg-gray-50">
      <div className="flex items-center">
        {/* Color A */}
        <ColorSwatch color={record.colorA} onSelectColor={onSelectColor} />

        {/* Plus sign */}
        <div className="mx-2 text-gray-500">+</div>

        {/* Color B */}
        <ColorSwatch color={record.colorB} onSelectColor={onSelectColor} />

        {/* Equals sign */}
        <div className="mx-2 text-gray-500">=</div>

        {/* Result Color */}
        <ColorSwatch color={record.resultColor} onSelectColor={onSelectColor} />

        {/* Algorithm badge and buttons */}
        <div className="ml-auto flex items-center">
          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
            {record.algorithm}
          </span>

          {/* Load mix button */}
          {onLoadMixRecord && (
            <button
              onClick={handleLoadRecord}
              className="ml-2 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              title="Load this mix into the Color Mixer"
            >
              Load
            </button>
          )}

          {/* Delete button */}
          {onDeleteRecord && (
            <button
              onClick={() => onDeleteRecord(record.id)}
              className="ml-2 text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              title="Delete this record"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default MixHistoryItem;
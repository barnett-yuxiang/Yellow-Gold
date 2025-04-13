import { FC } from 'react';
import { MixingAlgorithm } from './ColorMixer/ControlPanel';

// Interface for a mixing record
export interface MixRecord {
  id: string;
  colorA: string;
  colorB: string;
  resultColor: string;
  algorithm: MixingAlgorithm;
  timestamp: Date;
}

interface MixHistoryProps {
  mixRecords?: MixRecord[];
  onSelectColor?: (color: string) => void;
  onLoadMixRecord?: (record: MixRecord) => void;
  onDeleteRecord?: (id: string) => void;
  onClearAllRecords?: () => void;
  onSyncFromServer?: () => void;
  onUploadToServer?: () => void;
}

const MixHistory: FC<MixHistoryProps> = ({
  mixRecords = [],
  onSelectColor,
  onLoadMixRecord,
  onDeleteRecord,
  onClearAllRecords,
  onSyncFromServer,
  onUploadToServer
}) => {
  // Show only the most recent 20 records
  const recentRecords = mixRecords.slice(0, 20);
  const isEmpty = recentRecords.length === 0;

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
    <section className="bg-white rounded-lg shadow-lg p-6 flex-1 flex flex-col">
      {/* Header with title and controls */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Mix History</h2>

        {/* Controls area - can be expanded with more functionality later */}
        <div className="flex items-center space-x-2">
          {onSyncFromServer && (
            <button
              onClick={() => onSyncFromServer()}
              className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center"
              title="Sync history records from server"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Sync
            </button>
          )}

          {!isEmpty && onUploadToServer && (
            <button
              onClick={() => onUploadToServer()}
              className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors flex items-center"
              title="Upload history records to server"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload
            </button>
          )}

          {!isEmpty && onClearAllRecords && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all mix history records?')) {
                  onClearAllRecords();
                }
              }}
              className="text-xs px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center"
              title="Clear all history records"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto border-2 border-dashed border-gray-300 rounded-lg">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="text-gray-400 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No Mix History Yet</p>
            <p className="text-gray-400 text-sm mt-1">Start mixing colors to see your history here</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {recentRecords.map((record) => (
              <li key={record.id} className="py-3 px-4 hover:bg-gray-50">
                <div className="flex items-center">
                  {/* Color A */}
                  <div className="flex items-center">
                    <div
                      className="w-8 h-8 rounded-md shadow-sm cursor-pointer"
                      style={{ backgroundColor: record.colorA }}
                      onClick={() => onSelectColor && onSelectColor(record.colorA)}
                      title="Click to use this color"
                    />
                    <div className="ml-1 mr-2 text-xs font-mono text-gray-600 hidden md:block">
                      {formatHexToUppercase(record.colorA)}
                    </div>
                  </div>

                  {/* Plus sign */}
                  <div className="mx-2 text-gray-500">+</div>

                  {/* Color B */}
                  <div className="flex items-center">
                    <div
                      className="w-8 h-8 rounded-md shadow-sm cursor-pointer"
                      style={{ backgroundColor: record.colorB }}
                      onClick={() => onSelectColor && onSelectColor(record.colorB)}
                      title="Click to use this color"
                    />
                    <div className="ml-1 mr-2 text-xs font-mono text-gray-600 hidden md:block">
                      {formatHexToUppercase(record.colorB)}
                    </div>
                  </div>

                  {/* Equals sign */}
                  <div className="mx-2 text-gray-500">=</div>

                  {/* Result Color */}
                  <div className="flex items-center">
                    <div
                      className="w-8 h-8 rounded-md shadow-sm cursor-pointer"
                      style={{ backgroundColor: record.resultColor }}
                      onClick={() => onSelectColor && onSelectColor(record.resultColor)}
                      title="Click to use this color"
                    />
                    <div className="ml-1 text-xs font-mono text-gray-600">
                      {formatHexToUppercase(record.resultColor)}
                    </div>
                  </div>

                  {/* Algorithm badge */}
                  <div className="ml-auto flex items-center">
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                      {record.algorithm}
                    </span>

                    {/* Load mix button */}
                    {onLoadMixRecord && (
                      <button
                        onClick={(e) => {
                          // Prevent event bubbling to avoid conflicts with other clicks
                          e.stopPropagation();
                          // Ensure data integrity before passing
                          if (record && record.colorA && record.colorB && record.resultColor) {
                            // Create a deep copy to avoid reference issues
                            const recordCopy = {...record};
                            onLoadMixRecord(recordCopy);
                          } else {
                            console.warn('Incomplete record data', record);
                          }
                        }}
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
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MixHistory;
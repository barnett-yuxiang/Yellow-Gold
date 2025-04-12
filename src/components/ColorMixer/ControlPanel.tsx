import { FC } from 'react';

// Define color mixing algorithms
export type MixingAlgorithm = 'simple' | 'weighted' | 'subtractive';

export interface ControlPanelProps {
  algorithm: MixingAlgorithm;
  onAlgorithmChange: (algorithm: MixingAlgorithm) => void;
  onMixColors: () => void;
  onReset: () => void;
  isProcessing: boolean;
  canMix: boolean;
}

export const ControlPanel: FC<ControlPanelProps> = ({
  algorithm,
  onAlgorithmChange,
  onMixColors,
  onReset,
  isProcessing,
  canMix
}) => {
  return (
    <div className="flex justify-center items-center md:ml-auto h-full" style={{ minHeight: '170px' }}>
      <div className="flex flex-col items-start md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4 h-full justify-center">
        <div>
          <label
            htmlFor="algorithm-select"
            className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide border-l-4 border-blue-500 pl-2 py-0.5"
          >
            Mixing Algorithm
          </label>
          <select
            id="algorithm-select"
            value={algorithm}
            onChange={(e) => onAlgorithmChange(e.target.value as MixingAlgorithm)}
            className="appearance-none py-1.5 px-3 bg-white border border-gray-300 rounded-md text-center w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1em 1em",
              paddingRight: "2rem"
            }}
          >
            <option value="simple">Simple Average</option>
            <option value="weighted">Weighted Mix</option>
            <option value="subtractive">Subtractive Mix</option>
          </select>
        </div>

        <button
          onClick={onMixColors}
          disabled={isProcessing || !canMix}
          className={`py-1.5 px-3 text-white border rounded-md font-medium transition-colors w-28 text-sm shadow-sm ${
            !canMix
              ? 'bg-gray-400 border-gray-500 cursor-not-allowed'
              : 'bg-blue-500 border-blue-600 hover:bg-blue-600'
          }`}
        >
          Mix Colors
        </button>

        <button
          onClick={onReset}
          className="py-1.5 px-3 bg-gray-200 border border-gray-300 rounded-md font-medium hover:bg-gray-300 transition-colors w-24 text-sm shadow-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
import { FC, useState, useEffect } from 'react';
import { RandomColorIcon, PlusSign, EqualsSign } from './icons';

interface ColorMixerProps {
  // Props will be added as we develop the component
}

// Define color mixing algorithms
type MixingAlgorithm = 'simple' | 'weighted' | 'subtractive';

const ColorMixer: FC<ColorMixerProps> = () => {
  const [colorA, setColorA] = useState(''); // Empty initial value
  const [colorB, setColorB] = useState(''); // Empty initial value
  const [resultColor, setResultColor] = useState(''); // Empty initial value
  const [algorithm, setAlgorithm] = useState<MixingAlgorithm>('simple');
  const [isProcessing, setIsProcessing] = useState(false);

  // Default colors for placeholders
  const defaultColorA = '#FF0000';
  const defaultColorB = '#0000FF';
  const defaultAlgorithm: MixingAlgorithm = 'simple';
  const emptyColor = '#EEEEEE'; // Light gray for empty state

  // Primary colors array for random selection
  const primaryColors = [
    'FF0000', // Red
    '00FF00', // Green
    '0000FF', // Blue
    'FFFF00', // Yellow
    '00FFFF', // Cyan
    'FF00FF', // Magenta
  ];

  // Get a random primary color
  const getRandomPrimaryColor = () => {
    const randomIndex = Math.floor(Math.random() * primaryColors.length);
    return primaryColors[randomIndex];
  };

  // Set random color for input A
  const setRandomColorA = () => {
    setColorA(getRandomPrimaryColor());
  };

  // Set random color for input B
  const setRandomColorB = () => {
    setColorB(getRandomPrimaryColor());
  };

  // Mix the colors based on selected algorithm
  const mixColors = () => {
    if (!colorA || !colorB) {
      // Don't mix if either color is missing
      return;
    }

    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      // Ensure the colors have # prefix
      const colorAValue = colorA.startsWith('#') ? colorA : `#${colorA}`;
      const colorBValue = colorB.startsWith('#') ? colorB : `#${colorB}`;

      const colorAHex = colorAValue.replace('#', '');
      const colorBHex = colorBValue.replace('#', '');

      const rA = parseInt(colorAHex.substr(0, 2), 16);
      const gA = parseInt(colorAHex.substr(2, 2), 16);
      const bA = parseInt(colorAHex.substr(4, 2), 16);

      const rB = parseInt(colorBHex.substr(0, 2), 16);
      const gB = parseInt(colorBHex.substr(2, 2), 16);
      const bB = parseInt(colorBHex.substr(4, 2), 16);

      let rResult, gResult, bResult;

      switch (algorithm) {
        case 'simple':
          // Simple averaging
          rResult = Math.round((rA + rB) / 2);
          gResult = Math.round((gA + gB) / 2);
          bResult = Math.round((bA + bB) / 2);
          break;

        case 'weighted':
          // Weighted mixing (RGB perception weights: R=0.3, G=0.59, B=0.11)
          const weight = 0.7; // Weight for color A (70% A, 30% B)
          rResult = Math.round(rA * weight + rB * (1 - weight));
          gResult = Math.round(gA * weight + gB * (1 - weight));
          bResult = Math.round(bA * weight + bB * (1 - weight));
          break;

        case 'subtractive':
          // Subtractive color mixing (CMYK-like)
          rResult = Math.round(rA * rB / 255);
          gResult = Math.round(gA * gB / 255);
          bResult = Math.round(bA * bB / 255);
          break;
      }

      // Convert back to hex
      const resultHex = '#' +
        rResult.toString(16).padStart(2, '0') +
        gResult.toString(16).padStart(2, '0') +
        bResult.toString(16).padStart(2, '0');

      setResultColor(resultHex);
      setIsProcessing(false);
    }, 500);
  };

  // Reset to defaults
  const handleReset = () => {
    setColorA('');
    setColorB('');
    setResultColor('');
    setAlgorithm(defaultAlgorithm);
  };

  // Determine if text should be light or dark based on background color
  const getContrastColor = (hexColor: string) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    // Calculate brightness (weighted RGB)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 mb-6 flex-none">
      <h2 className="text-xl font-semibold mb-6">Color Mixer</h2>

      {/* Main container - Flex layout to keep everything in one row */}
      <div className="flex flex-col md:flex-row md:items-center w-full space-y-6 md:space-y-0 md:space-x-8 md:justify-center">
        {/* Left side - Color mixing area */}
        <div className="flex justify-center items-center h-full">
          <div className="flex items-start">
            {/* Color A Column */}
            <div className="flex items-center">
              <div className="flex flex-col">
                <div
                  className="w-24 h-24 rounded shadow-md mb-4 flex items-center justify-center"
                  style={{ backgroundColor: colorA ? (colorA.startsWith('#') ? colorA : `#${colorA}`) : emptyColor }}
                >
                  <span style={{ color: getContrastColor(colorA ? (colorA.startsWith('#') ? colorA : `#${colorA}`) : emptyColor) }}>Color A</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center w-24 border border-gray-300 rounded py-1 px-2 bg-white">
                    <span className="text-gray-500">#</span>
                    <input
                      type="text"
                      value={colorA.startsWith('#') ? colorA.substring(1) : colorA}
                      onChange={(e) => setColorA(e.target.value)}
                      className="w-full text-center border-none focus:outline-none p-0 m-0"
                      placeholder={defaultColorA.substring(1)}
                    />
                  </div>
                  <button
                    onClick={setRandomColorA}
                    className="ml-2 bg-gray-100 border border-gray-300 rounded p-1 hover:bg-gray-200 transition-colors"
                    title="Pick random primary color"
                  >
                    <RandomColorIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Plus Sign SVG */}
            <div className="mx-8 flex items-center justify-center" style={{ height: '125px' }}>
              <PlusSign />
            </div>

            {/* Color B Column */}
            <div className="flex items-center ml-8">
              <div className="flex flex-col">
                <div
                  className="w-24 h-24 rounded shadow-md mb-4 flex items-center justify-center"
                  style={{ backgroundColor: colorB ? (colorB.startsWith('#') ? colorB : `#${colorB}`) : emptyColor }}
                >
                  <span style={{ color: getContrastColor(colorB ? (colorB.startsWith('#') ? colorB : `#${colorB}`) : emptyColor) }}>Color B</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center w-24 border border-gray-300 rounded py-1 px-2 bg-white">
                    <span className="text-gray-500">#</span>
                    <input
                      type="text"
                      value={colorB.startsWith('#') ? colorB.substring(1) : colorB}
                      onChange={(e) => setColorB(e.target.value)}
                      className="w-full text-center border-none focus:outline-none p-0 m-0"
                      placeholder={defaultColorB.substring(1)}
                    />
                  </div>
                  <button
                    onClick={setRandomColorB}
                    className="ml-2 bg-gray-100 border border-gray-300 rounded p-1 hover:bg-gray-200 transition-colors"
                    title="Pick random primary color"
                  >
                    <RandomColorIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Equals Sign SVG */}
            <div className="mx-8 flex items-center justify-center" style={{ height: '125px' }}>
              <EqualsSign />
            </div>

            {/* Result Color Column */}
            <div className="flex items-center ml-8">
              <div className="flex flex-col">
                <div
                  className="w-24 h-24 rounded shadow-md mb-4 flex items-center justify-center"
                  style={{ backgroundColor: resultColor || emptyColor }}
                >
                  <span style={{ color: getContrastColor(resultColor || emptyColor) }}>Result Color</span>
                </div>
                <div className="w-24 text-center border border-gray-300 rounded py-1 px-2 font-medium">
                  {resultColor || '-'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Controls area */}
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
                onChange={(e) => setAlgorithm(e.target.value as MixingAlgorithm)}
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
              onClick={mixColors}
              disabled={isProcessing || !colorA || !colorB}
              className={`py-1.5 px-3 text-white border rounded-md font-medium transition-colors w-28 text-sm shadow-sm ${
                !colorA || !colorB
                  ? 'bg-gray-400 border-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 border-blue-600 hover:bg-blue-600'
              }`}
            >
              Mix Colors
            </button>

            <button
              onClick={handleReset}
              className="py-1.5 px-3 bg-gray-200 border border-gray-300 rounded-md font-medium hover:bg-gray-300 transition-colors w-24 text-sm shadow-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorMixer;
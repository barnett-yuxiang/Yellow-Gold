import { FC, useState, useEffect } from 'react';
import { PlusSign, EqualsSign } from '../icons';
import { DescriptionBox } from './DescriptionBox';
import { ColorInputGroup } from './ColorInputGroup';
import { ControlPanel, MixingAlgorithm } from './ControlPanel';

interface ColorMixerProps {
  colorA?: string;
  colorB?: string;
  resultColor?: string;
  algorithm?: MixingAlgorithm;
  onAlgorithmChange?: (algorithm: MixingAlgorithm) => void;
  onSelectColorA?: () => void;
  onSelectColorB?: () => void;
  onMixComplete?: (colorA: string, colorB: string, resultColor: string, algorithm: MixingAlgorithm) => void;
  onReset?: () => void;
}

const ColorMixer: FC<ColorMixerProps> = ({
  colorA: propColorA = '',
  colorB: propColorB = '',
  resultColor: propResultColor = '',
  algorithm: propAlgorithm,
  onAlgorithmChange,
  onSelectColorA,
  onSelectColorB,
  onMixComplete,
  onReset
}) => {
  const [colorA, setColorA] = useState(propColorA);
  const [colorB, setColorB] = useState(propColorB);
  const [resultColor, setResultColor] = useState(propResultColor); // Initialize with prop value
  const [algorithm, setAlgorithm] = useState<MixingAlgorithm>(propAlgorithm || 'additive');
  const [isProcessing, setIsProcessing] = useState(false);

  // Update internal state when props change
  useEffect(() => {
    setColorA(propColorA); // Always update, regardless of whether it's an empty string
  }, [propColorA]);

  useEffect(() => {
    setColorB(propColorB); // Always update, regardless of whether it's an empty string
  }, [propColorB]);

  // Update result color when prop changes
  useEffect(() => {
    setResultColor(propResultColor); // Always update, regardless of whether it's an empty string
  }, [propResultColor]);

  // Update algorithm when prop changes
  useEffect(() => {
    if (propAlgorithm) setAlgorithm(propAlgorithm);
  }, [propAlgorithm]);

  // Add effect to auto-mix colors when both colors and algorithm are available
  // This ensures the result is correct after loading from history
  useEffect(() => {
    // Check if we have enough data to perform the mix
    if (colorA && colorB && algorithm) {
      // If resultColor is already set through props, use it
      if (propResultColor) {
        setResultColor(propResultColor);
      } else {
        // Otherwise, perform automatic color mixing
        // To avoid unnecessary mixing, only do this when loaded from props
        if (colorA === propColorA && colorB === propColorB) {
          mixColors();
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorA, colorB, algorithm, propResultColor, propColorA, propColorB]);

  // Default colors for placeholders
  const defaultColorA = '#FF0000';
  const defaultColorB = '#0000FF';
  const defaultAlgorithm: MixingAlgorithm = 'additive';
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
  const handleColorAChange = (value: string) => {
    setColorA(value);
  };

  const handleColorBChange = (value: string) => {
    setColorB(value);
  };

  // Handle algorithm change
  const handleAlgorithmChange = (newAlgorithm: MixingAlgorithm) => {
    setAlgorithm(newAlgorithm);
    if (onAlgorithmChange) {
      onAlgorithmChange(newAlgorithm);
    }
  };

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
        case 'additive':
          // Additive mixing (light mixing - RGB color model)
          rResult = Math.max(rA, rB);
          gResult = Math.max(gA, gB);
          bResult = Math.max(bA, bB);
          break;

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

      // Add to mix history
      if (onMixComplete) {
        onMixComplete(colorAValue, colorBValue, resultHex, algorithm);
      }
    }, 500);
  };

  // Reset to defaults
  const handleReset = () => {
    setColorA('');
    setColorB('');
    setResultColor('');
    setAlgorithm(defaultAlgorithm);
    if (onAlgorithmChange) {
      onAlgorithmChange(defaultAlgorithm);
    }
    if (onReset) {
      onReset();
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 mb-6 flex-none relative">
      <h2 className="text-xl font-semibold mb-6">Color Mixer</h2>

      {/* Description box with dashed border */}
      <DescriptionBox>
        <p className="font-semibold mb-1">Mix Algorithms:</p>
        <ul className="list-disc pl-4 text-xs space-y-1">
          <li><span className="font-medium">RGB Additive:</span> Light mixing (Max of RGB values)</li>
          <li><span className="font-medium">Simple:</span> Average of RGB values</li>
          <li><span className="font-medium">Weighted:</span> 70% color A + 30% color B</li>
          <li><span className="font-medium">Subtractive:</span> Like mixing paint (R1×R2÷255)</li>
        </ul>
      </DescriptionBox>

      {/* Main container - Flex layout to keep everything in one row */}
      <div className="flex flex-col md:flex-row md:items-center w-full space-y-6 md:space-y-0 md:space-x-8 md:justify-center">
        {/* Left side - Color mixing area */}
        <div className="flex justify-center items-center h-full">
          <div className="flex items-start">
            {/* Color A Column */}
            <div className="flex flex-col">
              <ColorInputGroup
                color={colorA}
                onChange={handleColorAChange}
                onRandomColor={setRandomColorA}
                label="Color A"
                placeholder={defaultColorA.substring(1)}
                emptyColor={emptyColor}
              />
              {onSelectColorA && (
                <button
                  onClick={onSelectColorA}
                  className="mt-2 w-full text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded transition-colors font-bold"
                >
                  Pick from Palette
                </button>
              )}
            </div>

            {/* Plus Sign SVG */}
            <div className="mx-8 flex items-center justify-center" style={{ height: '125px' }}>
              <PlusSign />
            </div>

            {/* Color B Column */}
            <div className="flex flex-col">
              <ColorInputGroup
                color={colorB}
                onChange={handleColorBChange}
                onRandomColor={setRandomColorB}
                label="Color B"
                placeholder={defaultColorB.substring(1)}
                emptyColor={emptyColor}
              />
              {onSelectColorB && (
                <button
                  onClick={onSelectColorB}
                  className="mt-2 w-full text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded transition-colors font-bold"
                >
                  Pick from Palette
                </button>
              )}
            </div>

            {/* Equals Sign SVG */}
            <div className="mx-8 flex items-center justify-center" style={{ height: '125px' }}>
              <EqualsSign />
            </div>

            {/* Result Color Column */}
            <ColorInputGroup
              color={resultColor}
              onChange={() => {}}
              onRandomColor={() => {}}
              label="Result Color"
              placeholder=""
              emptyColor={emptyColor}
              readOnly={true}
            />
          </div>
        </div>

        {/* Right side - Controls area */}
        <ControlPanel
          algorithm={algorithm}
          onAlgorithmChange={handleAlgorithmChange}
          onMixColors={mixColors}
          onReset={handleReset}
          isProcessing={isProcessing}
          canMix={!!colorA && !!colorB}
        />
      </div>
    </section>
  );
};

export default ColorMixer;
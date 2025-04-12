import { FC, useState } from 'react';
import { PlusSign, EqualsSign } from '../icons';
import { DescriptionBox } from './DescriptionBox';
import { ColorInputGroup } from './ColorInputGroup';
import { ControlPanel, MixingAlgorithm } from './ControlPanel';

interface ColorMixerProps {
  // Props will be added as we develop the component
}

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

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 mb-6 flex-none relative">
      <h2 className="text-xl font-semibold mb-6">Color Mixer</h2>

      {/* Description box with dashed border */}
      <DescriptionBox>
        <p className="font-semibold mb-1">Mix Algorithms:</p>
        <ul className="list-disc pl-4 text-xs space-y-1">
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
            <ColorInputGroup
              color={colorA}
              onChange={setColorA}
              onRandomColor={setRandomColorA}
              label="Color A"
              placeholder={defaultColorA.substring(1)}
              emptyColor={emptyColor}
            />

            {/* Plus Sign SVG */}
            <div className="mx-8 flex items-center justify-center" style={{ height: '125px' }}>
              <PlusSign />
            </div>

            {/* Color B Column */}
            <ColorInputGroup
              color={colorB}
              onChange={setColorB}
              onRandomColor={setRandomColorB}
              label="Color B"
              placeholder={defaultColorB.substring(1)}
              emptyColor={emptyColor}
            />

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
          onAlgorithmChange={setAlgorithm}
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
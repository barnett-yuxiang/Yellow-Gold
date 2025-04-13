import React from 'react';

interface PlusSignProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

const PlusSign: React.FC<PlusSignProps> = ({
  width = 30,
  height = 30,
  strokeColor = "#666666",
  strokeWidth = 3
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4V20" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12H20" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default PlusSign;
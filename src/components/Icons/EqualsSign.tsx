import React from 'react';

interface EqualsSignProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

const EqualsSign: React.FC<EqualsSignProps> = ({
  width = 30,
  height = 30,
  strokeColor = "#666666",
  strokeWidth = 3
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 9H19" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 15H19" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default EqualsSign;
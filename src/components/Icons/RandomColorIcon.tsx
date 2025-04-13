import React from 'react';

interface RandomColorIconProps {
  width?: number;
  height?: number;
}

const RandomColorIcon: React.FC<RandomColorIconProps> = ({
  width = 14,
  height = 14
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="6" fill="#FF0000" />
      <circle cx="8" cy="8" r="6" fill="#00FF00" />
      <circle cx="16" cy="8" r="6" fill="#0000FF" />
    </svg>
  );
};

export default RandomColorIcon;
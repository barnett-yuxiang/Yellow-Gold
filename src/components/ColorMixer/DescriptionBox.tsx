import { FC } from 'react';

interface DescriptionBoxProps {
  children: React.ReactNode;
}

export const DescriptionBox: FC<DescriptionBoxProps> = ({ children }) => {
  return (
    <div className="w-full md:w-80 h-30 border-2 border-dashed border-gray-300 rounded-md p-3 mb-4 md:absolute md:top-6 md:right-6 overflow-auto text-sm text-gray-600">
      {children}
    </div>
  );
};
import { FC } from 'react';

const EmptyHistoryState: FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="text-gray-400 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <p className="text-gray-500 font-medium">No Mix History Yet</p>
      <p className="text-gray-400 text-sm mt-1">Start mixing colors to see your history here</p>
    </div>
  );
};

export default EmptyHistoryState;
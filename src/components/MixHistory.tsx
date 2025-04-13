import { FC } from 'react';

interface MixHistoryProps {
  // Props will be added as we develop the component
}

const MixHistory: FC<MixHistoryProps> = () => {
  // Placeholder for empty state (will be replaced with real data later)
  const isEmpty = true;

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 flex-1 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Mix History</h2>
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
          <div className="flex items-center justify-center">
            Mix History Will Go Here
          </div>
        )}
      </div>
    </section>
  );
};

export default MixHistory;
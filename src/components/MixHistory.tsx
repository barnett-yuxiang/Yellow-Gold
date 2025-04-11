import { FC } from 'react';

interface MixHistoryProps {
  // Props will be added as we develop the component
}

const MixHistory: FC<MixHistoryProps> = () => {
  return (
    <section className="bg-white rounded-lg shadow-lg p-6 flex-1 overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Mix History</h2>
      <div className="h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
        Mix History Will Go Here
      </div>
    </section>
  );
};

export default MixHistory;
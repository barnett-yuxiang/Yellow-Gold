import { FC } from 'react';
import { MixHistoryProps } from './types';
import MixHistoryHeader from './MixHistoryHeader';
import EmptyHistoryState from './EmptyHistoryState';
import MixHistoryItem from './MixHistoryItem';

const MixHistory: FC<MixHistoryProps> = ({
  mixRecords = [],
  onSelectColor,
  onLoadMixRecord,
  onDeleteRecord,
  onClearAllRecords,
  onSyncFromServer,
  onUploadToServer
}) => {
  // Show only the most recent 20 records
  const recentRecords = mixRecords.slice(0, 20);
  const isEmpty = recentRecords.length === 0;

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 flex-1 flex flex-col">
      <MixHistoryHeader
        isEmpty={isEmpty}
        onClearAllRecords={onClearAllRecords}
        onSyncFromServer={onSyncFromServer}
        onUploadToServer={onUploadToServer}
      />

      <div className="flex-1 overflow-auto border-2 border-dashed border-gray-300 rounded-lg">
        {isEmpty ? (
          <EmptyHistoryState />
        ) : (
          <ul className="divide-y divide-gray-200">
            {recentRecords.map((record) => (
              <MixHistoryItem
                key={record.id}
                record={record}
                onSelectColor={onSelectColor}
                onLoadMixRecord={onLoadMixRecord}
                onDeleteRecord={onDeleteRecord}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MixHistory;
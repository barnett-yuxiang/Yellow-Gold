import { FC } from 'react';
import ConnectionStatus from './ConnectionStatus';
import UploadStatus from './UploadStatus';
import SyncStatus from './SyncStatus';

interface MixHistoryHeaderProps {
  isEmpty: boolean;
  onClearAllRecords?: () => void;
  onSyncFromServer?: (confirmed: boolean) => Promise<boolean>;
  onUploadToServer?: (confirmed: boolean) => Promise<boolean>;
  onTestConnection?: () => Promise<boolean>;
}

const MixHistoryHeader: FC<MixHistoryHeaderProps> = ({
  isEmpty,
  onClearAllRecords,
  onSyncFromServer,
  onUploadToServer,
  onTestConnection
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Mix History</h2>

      {/* Controls area - can be expanded with more functionality later */}
      <div className="flex items-center space-x-2">
        {onTestConnection && (
          <ConnectionStatus onTestConnection={onTestConnection} />
        )}

        {onSyncFromServer && (
          <SyncStatus onSyncFromServer={onSyncFromServer} />
        )}

        {onUploadToServer && (
          <UploadStatus
            isEmpty={isEmpty}
            onUploadToServer={onUploadToServer}
          />
        )}

        {!isEmpty && onClearAllRecords && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all mix history records?')) {
                onClearAllRecords();
              }
            }}
            className="text-xs px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center"
            title="Clear all history records"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default MixHistoryHeader;
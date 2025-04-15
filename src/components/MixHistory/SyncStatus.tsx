import { FC, useState } from 'react';

export type SyncState = 'initial' | 'confirming' | 'syncing' | 'success' | 'error';

interface SyncStatusProps {
  onSyncFromServer?: (confirmed: boolean) => Promise<boolean>;
}

const SyncStatus: FC<SyncStatusProps> = ({ onSyncFromServer }) => {
  const [syncState, setSyncState] = useState<SyncState>('initial');
  const [message, setMessage] = useState<string>('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSync = async () => {
    if (!onSyncFromServer) return;

    if (!isConfirming) {
      setIsConfirming(true);
      setSyncState('confirming');
      setMessage('Confirm to replace current records with database records');
      return;
    }

    try {
      setIsConfirming(false);
      setSyncState('syncing');
      setMessage('Syncing records...');

      const success = await onSyncFromServer(true);

      if (success) {
        setSyncState('success');
        setMessage('Sync successful');

        // Reset to initial state after 3 seconds
        setTimeout(() => {
          setSyncState('initial');
          setMessage('');
        }, 3000);
      } else {
        setSyncState('error');
        setMessage('Sync failed');
      }
    } catch (error) {
      setSyncState('error');
      setMessage(error instanceof Error ? error.message : 'Sync error');
    }
  };

  const handleCancel = () => {
    setIsConfirming(false);
    setSyncState('initial');
    setMessage('');
  };

  const getStatusColor = () => {
    switch (syncState) {
      case 'initial': return 'bg-gray-300';
      case 'confirming': return 'bg-yellow-300';
      case 'syncing': return 'bg-blue-300 animate-pulse';
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleSync}
        className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center"
        title={message || "Sync records from database"}
        disabled={syncState === 'syncing'}
      >
        <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusColor()}`} />
        {isConfirming ? 'Confirm Sync' : 'Sync'}
      </button>

      {isConfirming && (
        <button
          onClick={handleCancel}
          className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default SyncStatus;
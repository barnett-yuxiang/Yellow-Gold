import { FC, useState } from 'react';

export type UploadState = 'initial' | 'confirming' | 'uploading' | 'success' | 'error';

interface UploadStatusProps {
  isEmpty: boolean;
  onUploadToServer?: (confirmed: boolean) => Promise<boolean>;
}

const UploadStatus: FC<UploadStatusProps> = ({ isEmpty, onUploadToServer }) => {
  const [uploadState, setUploadState] = useState<UploadState>('initial');
  const [message, setMessage] = useState<string>('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleUpload = async () => {
    if (!onUploadToServer || isEmpty) return;

    if (!isConfirming) {
      setIsConfirming(true);
      setUploadState('confirming');
      setMessage('Confirm to clear database and upload current records');
      return;
    }

    try {
      setIsConfirming(false);
      setUploadState('uploading');
      setMessage('Uploading records...');

      const success = await onUploadToServer(true);

      if (success) {
        setUploadState('success');
        setMessage('Upload successful');

        // Reset to initial state after 3 seconds
        setTimeout(() => {
          setUploadState('initial');
          setMessage('');
        }, 3000);
      } else {
        setUploadState('error');
        setMessage('Upload failed');
      }
    } catch (error) {
      setUploadState('error');
      setMessage(error instanceof Error ? error.message : 'Upload error');
    }
  };

  const handleCancel = () => {
    setIsConfirming(false);
    setUploadState('initial');
    setMessage('');
  };

  const getStatusColor = () => {
    switch (uploadState) {
      case 'initial': return 'bg-gray-300';
      case 'confirming': return 'bg-yellow-300';
      case 'uploading': return 'bg-blue-300 animate-pulse';
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  if (isEmpty) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleUpload}
        className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors flex items-center"
        title={message || "Upload records to database"}
        disabled={uploadState === 'uploading'}
      >
        <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusColor()}`} />
        {isConfirming ? 'Confirm Upload' : 'Upload'}
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

export default UploadStatus;
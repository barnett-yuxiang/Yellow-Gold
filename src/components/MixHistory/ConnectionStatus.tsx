import { FC, useState } from 'react';

export type ConnectionState = 'initial' | 'testing' | 'success' | 'error';

interface ConnectionStatusProps {
  onTestConnection?: () => Promise<boolean>;
}

const ConnectionStatus: FC<ConnectionStatusProps> = ({ onTestConnection }) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('initial');
  const [message, setMessage] = useState<string>('');

  const handleTestConnection = async () => {
    if (!onTestConnection) return;

    try {
      setConnectionState('testing');
      setMessage('Testing connection...');

      const success = await onTestConnection();

      if (success) {
        setConnectionState('success');
        setMessage('Connection successful');
      } else {
        setConnectionState('error');
        setMessage('Connection failed');
      }
    } catch (error) {
      setConnectionState('error');
      setMessage(error instanceof Error ? error.message : 'Connection error');
    }
  };

  const getStatusColor = () => {
    switch (connectionState) {
      case 'initial': return 'bg-gray-300';
      case 'testing': return 'bg-yellow-300 animate-pulse';
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <button
      onClick={handleTestConnection}
      className="text-xs px-3 py-1.5 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors flex items-center"
      title={message || "Test database connection"}
      disabled={connectionState === 'testing'}
    >
      <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusColor()}`} />
      Test Connection
    </button>
  );
};

export default ConnectionStatus;
import { MixingAlgorithm } from '../ColorMixer/ControlPanel';

// Interface for a mixing record
export interface MixRecord {
  id: string;
  colorA: string;
  colorB: string;
  resultColor: string;
  algorithm: MixingAlgorithm;
  timestamp: Date;
}

// Props for the main MixHistory component
export interface MixHistoryProps {
  mixRecords?: MixRecord[];
  onSelectColor?: (color: string) => void;
  onLoadMixRecord?: (record: MixRecord) => void;
  onDeleteRecord?: (id: string) => void;
  onClearAllRecords?: () => void;
  onSyncFromServer?: () => void;
  onUploadToServer?: () => void;
  onTestConnection?: () => Promise<boolean>;
}
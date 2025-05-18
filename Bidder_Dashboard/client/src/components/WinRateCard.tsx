import { FiShield } from 'react-icons/fi';

export default function WinRateCard() {
  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-accent-green flex items-center justify-center">
          <FiShield className="text-white" />
        </div>
        <div>
          <p className="text-sm text-text-secondary">Fores tred</p>
          <h3 className="text-xl font-semibold">20% Win</h3>
        </div>
      </div>
    </div>
  );
}

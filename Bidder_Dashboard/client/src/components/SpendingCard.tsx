import { FiPercent, FiBarChart2, FiDollarSign } from 'react-icons/fi';

export default function SpendingCard() {
  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center text-accent-green">
          <FiPercent className="mr-2" />
          <span>6k</span>
          <span className="ml-auto text-text-secondary text-sm">Opon</span>
        </div>
        <div className="flex items-center text-text-secondary">
          <FiBarChart2 className="mr-2" />
          <span>Spended</span>
        </div>
        <div className="flex items-center text-accent-green">
          <FiPercent className="mr-2" />
          <span>20%</span>
          <span className="ml-auto">
            <svg className="h-4 w-4 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>
        <div className="flex items-center text-text-secondary">
          <span>Supplier</span>
        </div>
      </div>
      <div className="flex justify-between items-center bg-card-bg-light p-2 rounded-lg">
        <span className="text-sm">$ 456 dispute</span>
        <span className="bg-accent-blue px-2 py-0.5 rounded text-xs">Open</span>
      </div>
    </div>
  );
}

import { FiMessageCircle, FiHelpCircle } from 'react-icons/fi';

export default function DisputeCard() {
  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <FiMessageCircle className="text-accent-orange mr-2" />
          <span>Raise Dicpivte</span>
        </div>
        <FiHelpCircle className="text-text-secondary" />
      </div>
      <button className="w-full bg-accent-blue hover:bg-accent-blue-dark text-white py-2 rounded-lg">
        Raise Dispute
      </button>
    </div>
  );
}

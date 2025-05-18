import { FiFileText } from 'react-icons/fi';

interface SmartContract {
  id: string;
  title: string;
  contractNumber: string;
  progress: number;
  progressClass: string;
}

export default function SmartContractsCard() {
  const contracts: SmartContract[] = [
    {
      id: "SC-001",
      title: "Office Building Project",
      contractNumber: "SC-2023-0045",
      progress: 65,
      progressClass: "bg-accent-green"
    },
    {
      id: "SC-002",
      title: "Road Maintenance",
      contractNumber: "SC-2023-0039",
      progress: 30,
      progressClass: "bg-accent-blue"
    }
  ];

  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">Smart Contracts</h3>
        <span className="bg-accent-blue rounded-full px-2 py-1 text-xs">3 active</span>
      </div>
      
      {contracts.map((contract, index) => (
        <div key={contract.id} className={`bg-card-bg-light p-3 rounded-lg ${index > 0 ? 'mt-2' : ''}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{contract.title}</p>
              <p className="text-text-secondary text-xs">Contract #{contract.contractNumber}</p>
            </div>
            <FiFileText className="text-accent-green text-xl" />
          </div>
          <div className="mt-2">
            <div className="h-1.5 bg-gray-700 rounded-full">
              <div 
                className={`h-1.5 ${contract.progressClass} rounded-full`} 
                style={{ width: `${contract.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Progress</span>
              <span>{contract.progress}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

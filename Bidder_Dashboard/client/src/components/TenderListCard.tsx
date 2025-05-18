import * as FiIcons from 'react-icons/fi';

interface TenderCardProps {
  tender: {
    title: string;
    status: string;
    issuer: string;
    winChance: number;
    lagngiacts: string;
    competitor: string;
  };
}

export default function TenderListCard({ tender }: TenderCardProps) {
  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2 text-text-secondary">
          <button className="text-sm hover:text-text-primary">Sort wiseta #</button>
          <button className="flex items-center text-sm p-1 bg-card-bg-light rounded hover:bg-opacity-80">
            Sort <FiIcons.FiChevronDown className="ml-1" />
          </button>
          <button className="flex items-center text-sm p-1 bg-card-bg-light rounded hover:bg-opacity-80">
            <FiIcons.FiFilter className="mr-1" /> Sort Filters
          </button>
        </div>
      </div>

      <div className="bg-card-bg-light p-4 rounded-lg">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <FiIcons.FiBriefcase className="text-accent-orange w-5 h-5" />
            <span className="text-text-secondary text-sm">Construction</span>
          </div>
          <FiIcons.FiHeart className="text-text-secondary hover:text-accent-red cursor-pointer w-5 h-5" />
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-1">{tender.title}</h3>
        
        <div className="flex justify-between items-center mb-3">
          <span className={`text-sm px-2 py-1 rounded ${
            tender.status.includes("Mid") ? 'bg-accent-orange text-white' : 
            tender.status.includes("Low") ? 'bg-accent-green text-white' : 
            'bg-accent-red text-white' // Default or High
          }`}>
            {tender.status} <FiIcons.FiChevronDown className="inline-block ml-1" />
          </span>
          <span className="text-text-secondary text-sm">Issuer {tender.issuer}</span>
        </div>

        <div className="flex justify-between items-center text-sm mb-4">
          <div>
            <p className="text-accent-green text-xl font-bold">{tender.winChance}%</p>
            <p className="text-text-secondary">Win Chance</p>
          </div>
          <div>
            <p className="text-text-primary">issuer {tender.issuer}</p>
            <p className="text-text-secondary">Lagngiacts.{tender.lagngiacts}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs text-text-secondary">{tender.competitor}</p>
          <button className="bg-accent-blue hover:bg-accent-blue-dark text-white text-sm font-semibold py-2 px-4 rounded-lg">
            Create RFQ
          </button>
        </div>
      </div>
    </div>
  );
}

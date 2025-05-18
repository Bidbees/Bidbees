import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface QuoteCardProps {
  quote: {
    id: string;
    amount: string;
    delayIncrease: string;
    submissionId: string;
    submissionRisk: string;
    supplierRisk: string;
  };
}

export default function QuotesCard({ quote }: QuoteCardProps) {
  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Quotes</h3>
      <div className="beige-bg p-4 rounded-lg text-gray-800">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">Supplier</span>
              <span className="bg-accent-blue text-white text-xs px-2 py-0.5 rounded">+5.05</span>
            </div>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 bg-accent-green rounded-full mr-2"></div>
              <span>Low</span>
              <span className="ml-auto">86%</span>
            </div>
            <div className="font-semibold mt-2">High Win Chance</div>
            <div className="w-full bg-gray-300 rounded-full h-2 mt-1 mb-3">
              <div className="bg-accent-green h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <div>20%</div>
              <div className="text-sm">Win Chance 10%</div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>Compliance</div>
              <div>95%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="beige-bg p-4 rounded-lg text-gray-800 mt-3">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Supplier #{quote.id}</span>
          <button className="bg-accent-red text-white px-2 py-1 rounded text-xs flex items-center">
            {quote.supplierRisk} <FiArrowUp className="ml-1" />
          </button>
        </div>
        <div className="flex items-center mb-2">
          <span className="mr-2 font-bold">{quote.amount}</span>
          <div className="w-4 h-4 rounded-full bg-accent-green flex items-center justify-center">
            <FiArrowDown className="text-white text-xs" />
          </div>
        </div>
        <p className="text-sm mb-2">Delay increas risk {quote.delayIncrease}</p>
        
        <p className="font-semibold mb-2">Negotiate faster delivery</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm">Submit #{quote.submissionId}</span>
            <span className="ml-2 text-xs text-accent-red">{quote.submissionRisk}</span>
          </div>
          <button className="bg-accent-blue text-white px-3 py-1 rounded-md text-sm hover:bg-accent-blue-dark">
            Select
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <button className="bg-accent-green text-white px-2 py-1 rounded-md text-xs flex items-center hover:bg-accent-green-dark">
            {quote.supplierRisk} <FiArrowDown className="ml-1" />
          </button>
          <button className="text-accent-blue font-semibold text-sm">
            Negotiate
          </button>
        </div>
      </div>
    </div>
  );
}

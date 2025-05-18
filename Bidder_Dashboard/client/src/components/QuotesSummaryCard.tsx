export default function QuotesSummaryCard() {
  return (
    <div className="beige-bg p-4 rounded-lg text-gray-800">
      <h3 className="text-lg font-semibold mb-3">Quotes</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span>Supplier</span>
          <span className="bg-accent-blue text-white px-2 py-0.5 rounded text-xs">+5.05</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-accent-green rounded-full mr-2"></div>
          <span>Low</span>
          <span className="ml-auto">86%</span>
        </div>
        <div className="mt-2">
          <p className="font-semibold">High Win Chance</p>
          <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
            <div className="bg-accent-green h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span>20%</span>
            <span className="text-sm">Win Chance 10%</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>Compliance</span>
          <span>95%</span>
        </div>
      </div>
    </div>
  );
}

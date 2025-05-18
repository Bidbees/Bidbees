import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export default function AnalyticsCard() {
  // Data for the chart
  const data = [
    { name: 'Jan', value: 10 },
    { name: 'Feb', value: 15 },
    { name: 'Mar', value: 5 },
    { name: 'Apr', value: 20 },
    { name: 'May', value: 12 },
    { name: 'Jun', value: 18 },
  ];
  
  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Analytics</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span>RFQs</span>
          <div className="flex items-center space-x-2">
            <div className="bg-accent-orange h-2 w-16 rounded-full"></div>
            <span>20%</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span></span>
          <div className="flex items-center space-x-2">
            <div className="bg-accent-green h-2 w-16 rounded-full"></div>
            <span>95%</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm">Bon dvance Up-10</div>
          <div className="w-full bg-card-bg-light rounded-full h-2 mt-1">
            <div className="bg-accent-blue h-2 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>
        <div className="mt-2 h-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#4CAF50" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

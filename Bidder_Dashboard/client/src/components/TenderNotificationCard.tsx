interface TenderNotificationCardProps {
  profileComplete: number;
}

export default function TenderNotificationCard({ profileComplete }: TenderNotificationCardProps) {
  return (
    <div className="bg-card-bg-light p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-accent-green rounded-full w-4 h-4 mr-2"></div>
          <span className="text-lg">{profileComplete}% Prof, scccomplete</span>
        </div>
        
        <div className="flex-1 mx-4 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Wave visualization */}
            <svg viewBox="0 0 200 30" className="w-full h-10">
              <path d="M0,15 Q25,5 50,15 T100,15 T150,15 T200,15" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"></path>
              <path d="M0,15 Q25,25 50,15 T100,15 T150,15 T200,15" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"></path>
            </svg>
          </div>
        </div>
        
        <button className="bg-card-bg hover:bg-opacity-80 px-4 py-2 rounded-lg text-text-primary">
          View Tenders
        </button>
      </div>
      <h3 className="text-xl font-semibold mt-2">Tenders available near you!</h3>
    </div>
  );
}

interface BidOpening {
  id: string;
  title: string;
  dateTime: string;
  status: string;
  statusClass: string;
}

export default function BidOpeningsCard() {
  const bidOpenings: BidOpening[] = [
    {
      id: "BO-001",
      title: "Municipal Water Project",
      dateTime: "Oct 12, 2023 - 11:00 AM",
      status: "Upcoming",
      statusClass: "bg-accent-orange"
    },
    {
      id: "BO-002",
      title: "School Renovation",
      dateTime: "Oct 15, 2023 - 2:00 PM",
      status: "Scheduled",
      statusClass: "bg-accent-green"
    }
  ];

  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">Bid Openings</h3>
        <span className="bg-accent-green rounded-full px-2 py-1 text-xs">2 this week</span>
      </div>
      <div className="space-y-2">
        {bidOpenings.map(opening => (
          <div key={opening.id} className="bg-card-bg-light p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{opening.title}</p>
                <p className="text-text-secondary text-xs">{opening.dateTime}</p>
              </div>
              <div className={`${opening.statusClass} px-2 py-1 rounded text-xs`}>
                {opening.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

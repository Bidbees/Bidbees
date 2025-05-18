interface SubmittedTender {
  id: string;
  title: string;
  status: string;
  statusClass: string;
}

export default function SubmittedTendersCard() {
  const tenders: SubmittedTender[] = [
    {
      id: "ST-001",
      title: "Cape Town Highway",
      status: "Evaluating",
      statusClass: "bg-accent-blue"
    },
    {
      id: "ST-002",
      title: "Johannesburg School",
      status: "Shortlisted",
      statusClass: "bg-accent-orange"
    }
  ];

  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Submitted Tenders</h3>
      <div className="space-y-2">
        {tenders.map(tender => (
          <div key={tender.id} className="flex justify-between items-center bg-card-bg-light p-2 rounded">
            <span>{tender.title}</span>
            <span className={`${tender.statusClass} text-white px-2 py-0.5 rounded-md text-xs`}>
              {tender.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

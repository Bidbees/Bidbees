interface TenderDue {
  id: string;
  project: string;
  dueDate: string;
  status: string;
  statusClass: string;
}

export default function TendersDueCard() {
  const tenders: TenderDue[] = [
    {
      id: "T-2023-0456",
      project: "School Renovation",
      dueDate: "Oct 10, 2023",
      status: "Critical",
      statusClass: "bg-accent-red"
    },
    {
      id: "T-2023-0459",
      project: "Municipal Office",
      dueDate: "Oct 15, 2023",
      status: "Due Soon",
      statusClass: "bg-accent-orange"
    },
    {
      id: "T-2023-0462",
      project: "Bridge Repair",
      dueDate: "Oct 22, 2023",
      status: "On Track",
      statusClass: "bg-accent-green"
    }
  ];

  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">Tenders Due</h3>
        <span className="bg-accent-red rounded-full px-2 py-1 text-xs">3 critical</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-card-bg-light rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-card-bg border-b border-dashboard-bg">
              <th className="py-2 px-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Tender ID</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Project</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Due Date</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tender) => (
              <tr key={tender.id} className="border-b border-dashboard-bg">
                <td className="py-2 px-3 text-xs">{tender.id}</td>
                <td className="py-2 px-3 text-xs">{tender.project}</td>
                <td className="py-2 px-3 text-xs">{tender.dueDate}</td>
                <td className="py-2 px-3 text-xs">
                  <span className={`${tender.statusClass} px-2 py-1 rounded text-xs`}>{tender.status}</span>
                </td>
                <td className="py-2 px-3 text-xs">
                  <button className="bg-accent-blue hover:bg-accent-blue-dark text-white font-medium py-1 px-2 rounded text-xs">
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

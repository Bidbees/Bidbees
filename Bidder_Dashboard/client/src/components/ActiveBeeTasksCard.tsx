interface BeeTask {
  id: string;
  title: string;
  status: string;
  statusClass: string;
}

export default function ActiveBeeTasksCard() {
  const tasks: BeeTask[] = [
    {
      id: "BT-001",
      title: "Site Survey",
      status: "In Progress",
      statusClass: "bg-accent-green"
    },
    {
      id: "BT-002",
      title: "Document Verification",
      status: "Pending",
      statusClass: "bg-accent-orange"
    }
  ];

  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Active BEE Tasks</h3>
      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id} className="flex justify-between items-center bg-card-bg-light p-2 rounded">
            <span>{task.title}</span>
            <span className={`${task.statusClass} text-white px-2 py-0.5 rounded-md text-xs`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

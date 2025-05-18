interface Task {
  name: string;
  status: string;
  statusColor: string;
}

export default function BeeTasksCard() {
  const tasks: Task[] = [
    { name: "Briefing", status: "RBX", statusColor: "bg-accent-red" },
    { name: "Hire backup Bee", status: "Now", statusColor: "bg-accent-blue" },
    { name: "Site Meeting", status: "Today", statusColor: "bg-accent-orange" },
    { name: "Tender Due", status: "Tomorrow", statusColor: "bg-accent-green" },
    { name: "Bid Opening", status: "Next Week", statusColor: "bg-accent-blue" }
  ];
  
  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Bee Tasks</h3>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{task.name}</span>
            <span className={`${task.statusColor} text-white px-2 py-0.5 rounded-md text-xs`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

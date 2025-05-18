interface TenderPickUp {
  id: string;
  title: string;
  deadline: string;
  deadlineStatus: string;
  imageUrl: string;
}

export default function TendersPickUpCard() {
  const tenders: TenderPickUp[] = [
    {
      id: "TPU-001",
      title: "Gauteng Medical Facility",
      deadline: "Tomorrow",
      deadlineStatus: "text-accent-orange",
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    },
    {
      id: "TPU-002",
      title: "Office Building Renovation",
      deadline: "Oct 15, 2023",
      deadlineStatus: "text-accent-green",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&h=300"
    },
    {
      id: "TPU-003",
      title: "Road Maintenance Project",
      deadline: "Oct 18, 2023",
      deadlineStatus: "text-accent-green",
      imageUrl: "https://images.unsplash.com/photo-1516389573391-5620a0263801?auto=format&fit=crop&w=600&h=300"
    }
  ];

  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-semibold">Tenders To Pick Up</h3>
        <span className="bg-accent-orange text-white px-2 py-0.5 rounded-md text-xs">3</span>
      </div>
      
      {/* Featured tender with image */}
      <div className="relative h-32 rounded-lg overflow-hidden mb-2">
        <img 
          src={tenders[0].imageUrl} 
          alt={tenders[0].title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
          <p className="text-white text-sm">{tenders[0].title}</p>
        </div>
      </div>
      
      <div className="text-sm">
        <p>Deadline: <span className={tenders[0].deadlineStatus}>{tenders[0].deadline}</span></p>
      </div>

      {/* Additional tenders in compact format */}
      <div className="mt-2 space-y-2">
        {tenders.slice(1).map(tender => (
          <div key={tender.id} className="bg-card-bg-light p-2 rounded-lg">
            <p className="text-sm font-medium">{tender.title}</p>
            <p className="text-xs text-text-secondary">Due: <span className={tender.deadlineStatus}>{tender.deadline}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

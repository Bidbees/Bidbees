interface SiteMeeting {
  id: string;
  title: string;
  date: string;
  location: string;
  status: string;
  statusClass: string;
  imageUrl: string;
}

export default function SiteMeetingsCard() {
  const meetings: SiteMeeting[] = [
    {
      id: "SM-001",
      title: "Commercial Building Site",
      date: "Oct 12, 2023 - 10:00 AM",
      location: "123 Main St, Pretoria",
      status: "Confirmed",
      statusClass: "bg-accent-green",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=120&h=80"
    },
    {
      id: "SM-002",
      title: "Highway Expansion Project",
      date: "Oct 14, 2023 - 9:30 AM",
      location: "N3 Highway, Durban Outskirts",
      status: "Pending",
      statusClass: "bg-accent-orange",
      imageUrl: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=120&h=80"
    }
  ];

  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">Site Meetings</h3>
        <span className="bg-accent-orange rounded-full px-2 py-1 text-xs">4 upcoming</span>
      </div>
      <div className="space-y-2">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="bg-card-bg-light p-3 rounded-lg grid grid-cols-12 gap-2">
            <img 
              src={meeting.imageUrl} 
              alt={meeting.title} 
              className="rounded col-span-3 h-20 object-cover" 
            />
            <div className="col-span-9">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{meeting.title}</p>
                  <p className="text-text-secondary text-xs">{meeting.date}</p>
                  <p className="text-text-secondary text-xs">{meeting.location}</p>
                </div>
                <div className={`${meeting.statusClass} px-2 py-1 rounded text-xs`}>
                  {meeting.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import * as FiIcons from 'react-icons/fi';

interface HeaderProps {
  userName: string;
  profileComplete: number;
}

export default function Header({ userName, profileComplete }: HeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 m-4 bg-card-bg rounded-lg shadow-md">
      <div className="text-xl font-semibold text-text-primary">Welcome, {userName}!</div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-1 text-sm text-text-secondary cursor-pointer hover:text-text-primary">
          <div className="w-3 h-3 bg-accent-green rounded-full"></div>
          <span>{profileComplete}% Complete</span>
          <FiIcons.FiChevronDown />
        </div>
        <div className="text-xl font-semibold text-text-primary">Bidder Dashboard</div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-card-bg-light rounded-md px-2 py-1">
            <span className="mr-1 text-white">2</span>
            <FiIcons.FiBell className="text-accent-orange" />
          </div>
          <button className="bg-accent-green text-white px-3 py-1 rounded-md flex items-center hover:bg-accent-green-dark">
            2U <FiIcons.FiChevronDown className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

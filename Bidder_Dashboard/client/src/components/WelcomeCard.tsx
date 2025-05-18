import CircularProgressBar from './CircularProgressBar';

interface WelcomeCardProps {
  userName: string;
  winStreak: number;
  progress: number;
}

export default function WelcomeCard({ userName, winStreak, progress }: WelcomeCardProps) {
  return (
    <div className="bg-card-bg p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Welcome, {userName}!</h2>
          <p className="text-accent-green font-semibold">{winStreak} Win Streak!</p>
        </div>
        <CircularProgressBar percentage={progress} size={80} strokeWidth={8} />
      </div>
    </div>
  );
}

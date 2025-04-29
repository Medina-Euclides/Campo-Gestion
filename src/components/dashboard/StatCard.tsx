import { Card } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  return (
    <Card className="h-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{change}</p>
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
    </Card>
  );
};
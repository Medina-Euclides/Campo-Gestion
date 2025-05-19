import React from 'react';
import { FileText, DollarSign, Sprout, Users } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { ProjectsChart } from '../components/charts/chart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { Card } from '../components/ui/Card';
import { useApp } from '../context/AppContext';

export const DashboardPage: React.FC = () => {
  const { dashboardStats } = useApp();
  const { projectCount, totalBalance, cropsCount, recentTransactions } = dashboardStats;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Proyectos Activos" 
          value={projectCount.toString()} 
          change={`${projectCount} proyectos en total`}
          icon={<FileText size={20} />} 
        />
        
        <StatCard 
          title="Balance Total" 
          value={`$${totalBalance.toLocaleString('es-AR')}`}
          change={totalBalance >= 0 ? 'Balance positivo' : 'Balance negativo'}
          icon={<DollarSign size={20} />} 
        />
        
        <StatCard 
          title="Cultivos Monitoreados" 
          value={cropsCount.toString()}
          change={`${cropsCount} cultivos en total`}
          icon={<Sprout size={20} />} 
        />
        
        <StatCard 
          title="Usuarios Activos" 
          value="8" 
          change="+1 desde el mes pasado" 
          icon={<Users size={20} />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <ProjectsChart />
        </Card>
        
        <div className="lg:col-span-1">
          <RecentTransactions transactions={recentTransactions} />
        </div>
      </div>
    </div>
  );
};
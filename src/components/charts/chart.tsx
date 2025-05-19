import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const ProjectsChart: React.FC = () => {
  const { projects, transactions } = useApp();

  const chartData = useMemo(() => {
    const projectData = projects.map(project => {
      const projectTransactions = transactions.filter(t => t.project === project.name);
      const ingresos = projectTransactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);
      const egresos = Math.abs(projectTransactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0));

      return {
        name: project.name,
        ingresos,
        egresos
      };
    });

    return projectData;
  }, [projects, transactions]);

  return (
    <div className="w-full h-full">
      <h3 className="text-xl font-semibold mb-4">Resumen de Proyectos</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => 
                `$${value.toLocaleString('es-AR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`
              }
            />
            <Legend />
            <Bar dataKey="ingresos" name="Ingresos" fill="#10B981" />
            <Bar dataKey="egresos" name="Egresos" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
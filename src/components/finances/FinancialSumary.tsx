import React, { useState, useMemo } from 'react';
import { TransactionList } from './TransactionList';
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

export const FinancialSummary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('resumen');
  const [selectedProject, setSelectedProject] = useState('todos');
  const { projects, transactions } = useApp();

  const chartData = useMemo(() => {
    const filteredTransactions = selectedProject === 'todos'
      ? transactions
      : transactions.filter(t => t.project === selectedProject);

    // Agrupar transacciones por mes
    const monthlyData = filteredTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('es-AR', { month: 'short' });
      
      if (!acc[month]) {
        acc[month] = { ingresos: 0, egresos: 0 };
      }
      
      if (transaction.amount > 0) {
        acc[month].ingresos += transaction.amount;
      } else {
        acc[month].egresos += Math.abs(transaction.amount);
      }
      
      return acc;
    }, {} as Record<string, { ingresos: number; egresos: number }>);

    return Object.entries(monthlyData).map(([month, data]) => ({
      name: month,
      ingresos: data.ingresos,
      egresos: data.egresos
    }));
  }, [transactions, selectedProject]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              activeTab === 'resumen' 
                ? 'bg-gray-100 text-gray-900'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('resumen')}
          >
            Resumen
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              activeTab === 'transacciones' 
                ? 'bg-gray-100 text-gray-900'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('transacciones')}
          >
            Transacciones
          </button>
        </div>

        {activeTab === 'resumen' && (
          <select
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="todos">Todos los proyectos</option>
            {projects.map(project => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        )}
      </div>
      
      {activeTab === 'resumen' ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">Resumen Financiero</h3>
          <p className="text-gray-500 text-sm mb-6">
            Visualización de ingresos y egresos por {selectedProject === 'todos' ? 'proyecto' : 'mes'}.
          </p>
          
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
      ) : (
        <TransactionList />
      )}
    </div>
  );
};
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { Card, CardStat } from '../components/ui/Card';
import { useApp } from '../context/AppContext';
import { FinancialSummary } from '../components/finances/FinancialSumary';

export const FinancesPage: React.FC = () => {
  const { financeStats } = useApp();
  const { totalBalance, totalIncome, totalExpenses, remainingBudget } = financeStats;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardStat 
            title="Balance total"
            value={`$${totalBalance.toLocaleString('es-AR')}`}
            valueClassName={totalBalance >= 0 ? 'text-green-500' : 'text-red-500'}
            change={`${totalBalance >= 0 ? '+' : ''}${((totalBalance / totalIncome) * 100).toFixed(1)}% respecto a ingresos`}
            icon={<DollarSign className="text-gray-400" size={20} />}
          />
        </Card>
        
        <Card>
          <CardStat 
            title="Ingresos Totales"
            value={`$${totalIncome.toLocaleString('es-AR')}`}
            valueClassName="text-green-500"
            change={`Total de ingresos registrados`}
            icon={<TrendingUp className="text-gray-400" size={20} />}
          />
        </Card>
        
        <Card>
          <CardStat 
            title="Egresos Totales"
            value={`$${totalExpenses.toLocaleString('es-AR')}`}
            valueClassName="text-red-500"
            change={`Total de gastos registrados`}
            icon={<TrendingDown className="text-gray-400" size={20} />}
          />
        </Card>
        
        <Card>
          <CardStat 
            title="Presupuesto Restante"
            value={`$${remainingBudget.toLocaleString('es-AR')}`}
            valueClassName={remainingBudget >= 0 ? 'text-gray-900' : 'text-red-500'}
            change={`${((remainingBudget / totalIncome) * 100).toFixed(1)}% del presupuesto total`}
            icon={<PiggyBank className="text-gray-400" size={20} />}
          />
        </Card>
      </div>
      
      <FinancialSummary />
    </div>
  );
};
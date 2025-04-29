/**
 * Componente RecentTransactions
 * 
 * Muestra las transacciones más recientes en el dashboard.
 * 
 * Características:
 * - Utiliza el contexto global para mostrar las últimas transacciones
 * - Muestra el monto con formato de moneda
 * - Diferencia visualmente entre ingresos y egresos
 * - Se actualiza automáticamente cuando hay cambios en las transacciones
 */

import React from 'react';
import { Card } from '../ui/Card';
import { useApp } from '../../context/AppContext';


export const RecentTransactions: React.FC = () => {
  const { transactions } = useApp();
  
  // Ordenar transacciones por fecha y tomar las últimas 4
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Transacciones Recientes</h3>
      </div>
      <p className="text-gray-500 text-sm mb-4">Últimos movimientos financieros registrados.</p>

      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="text-gray-500 text-sm">
                  {transaction.description.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">Proyecto: {transaction.project}</p>
              </div>
            </div>
            <div className={`font-semibold ${
              transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {transaction.amount >= 0 ? '+' : ''}
              ${Math.abs(transaction.amount).toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
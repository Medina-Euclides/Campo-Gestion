import React from 'react';
import { Card } from '../ui/Card';

interface Transaction {
  id: number;
  date: string;
  description: string;
  project: string;
  category: string;
  amount: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

/**
 * RecentTransactions - Componente para mostrar transacciones recientes
 * 
 * Muestra un resumen de las últimas transacciones financieras en el dashboard.
 * 
 * Props:
 * @param {Transaction[]} transactions - Lista de transacciones a mostrar
 * 
 * Características:
 * - Lista las últimas 4 transacciones
 * - Muestra fecha, descripción, proyecto y monto
 * - Diferencia visualmente entre ingresos (verde) y egresos (rojo)
 * - Formato de moneda en pesos argentinos
 */
export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Transacciones Recientes</h3>
      </div>
      <p className="text-gray-500 text-sm mb-4">Últimos movimientos financieros registrados.</p>

      <div className="space-y-4">
        {transactions.map((transaction) => (
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
        {transactions.length === 0 && (
          <p className="text-center text-gray-500">No hay transacciones recientes</p>
        )}
      </div>
    </Card>
  );
};
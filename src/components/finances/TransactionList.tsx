import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { NewTransactionModal } from '../Modals/AddTransation';

interface Transaction {
  id: number;
  date: string;
  description: string;
  project: string;
  category: string;
  amount: number;
}

const initialTransactions: Transaction[] = [
  { 
    id: 1,
    date: '14/7/2024',
    description: 'Venta de Cosecha',
    project: 'Trigo Este',
    category: 'Ventas',
    amount: 8750
  },
  { 
    id: 2,
    date: '9/7/2024',
    description: 'Compra de Semillas',
    project: 'Maíz Norte',
    category: 'Insumos',
    amount: -1999
  },
  { 
    id: 3,
    date: '4/7/2024',
    description: 'Mantenimiento Equipos',
    project: 'General',
    category: 'Equipamiento',
    amount: -350
  },
  { 
    id: 4,
    date: '27/6/2024',
    description: 'Subsidio Gubernamental',
    project: 'Soja Sur',
    category: 'Subsidios',
    amount: 2500
  }
];

/**
 * TransactionList - Componente para listar y gestionar transacciones
 * 
 * Muestra una tabla interactiva con todas las transacciones financieras.
 * 
 * Características:
 * - Filtrado y búsqueda de transacciones
 * - Edición y eliminación de transacciones
 * - Formato de moneda en pesos argentinos
 * - Diferenciación visual entre ingresos y egresos
 * - Modal para editar transacciones
 */
export const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar esta transacción?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedData: Partial<Transaction>) => {
    if (currentTransaction) {
      setTransactions(transactions.map(t => 
        t.id === currentTransaction.id 
          ? { ...t, ...updatedData }
          : t
      ));
    }
    setIsEditModalOpen(false);
    setCurrentTransaction(null);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Registro de Transacciones</h3>
      <p className="text-gray-500 text-sm mb-6">Historial de todos los movimientos financieros.</p>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar transacciones..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="px-4 py-2 border border-gray-300 rounded-md">
          <option value="">Todos</option>
          <option value="ingresos">Ingresos</option>
          <option value="egresos">Egresos</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-md">
          <option value="">Todos</option>
          <option value="ventas">Ventas</option>
          <option value="insumos">Insumos</option>
          <option value="equipamiento">Equipamiento</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proyecto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.project}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {transaction.category}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                  transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount >= 0 ? '+' : ''}
                  ${Math.abs(transaction.amount).toLocaleString('es-AR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <div className="flex justify-center space-x-2">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded-full"
                      onClick={() => handleEdit(transaction)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded-full"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentTransaction && (
        <NewTransactionModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setCurrentTransaction(null);
          }}
          onSave={handleSaveEdit}
          editData={currentTransaction}
        />
      )}
    </div>
  );
};
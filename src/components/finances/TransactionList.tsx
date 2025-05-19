import React, { useState, useMemo } from 'react';
import { DollarSign, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NewTransactionModal } from '../Modals/AddTransation';


interface Transaction {
  id: number;
  date: string;
  description: string;
  project: string;
  category: string;
  amount: number;
}

/**
 * TransactionList - Componente para mostrar y gestionar transacciones
 * 
 * Características:
 * - Lista de transacciones con formato de tabla
 * - Filtros por tipo (ingreso/egreso) y categoría
 * - Búsqueda global que filtra por todas las columnas
 * - Formato de moneda y fechas en español
 * - CRUD completo de transacciones
 */
export function TransactionList() {
  const { transactions, deleteTransaction } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [categoryFilter, setCategoryFilter] = useState('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Obtener categorías únicas para el filtro
  const categories = ['todos', 'Insumos', 'Equipamiento', 'Ventas'];

  // Filtrar transacciones según los criterios
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      // Filtro por tipo (ingreso/egreso)
      if (typeFilter !== 'todos') {
        const isIncome = transaction.amount >= 0;
        if (typeFilter === 'ingresos' && !isIncome) return false;
        if (typeFilter === 'egresos' && isIncome) return false;
      }

      // Filtro por categoría
      if (categoryFilter !== 'todos' && transaction.category !== categoryFilter) {
        return false;
      }

      // Búsqueda global
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.project.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower) ||
          transaction.date.includes(searchLower) ||
          transaction.amount.toString().includes(searchLower)
        );
      }

      return true;
    });
  }, [transactions, searchTerm, typeFilter, categoryFilter]);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar esta transacción?')) {
      deleteTransaction(id);
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Transacciones</h2>
            <p className="text-sm text-gray-500 mt-1">
              Gestione y visualice todas sus transacciones
            </p>
          </div>
          
        </div>

        <div className="space-y-4">
          {/* Filtros y búsqueda */}
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Buscar transacciones..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="todos">Todos los tipos</option>
              <option value="ingresos">Ingresos</option>
              <option value="egresos">Egresos</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'todos' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Tabla de transacciones */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proyecto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.project}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {transaction.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount >= 0 ? '+' : ''}
                      ${Math.abs(transaction.amount).toLocaleString('es-AR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(transaction)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(transaction.id)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No se encontraron transacciones
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        editData={editingTransaction}
      />
    </>
  );
}
import React, { useState } from 'react';
import { NewTransactionModal } from '../Modals/AddTransation';
import { ColumnFiltersState, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';


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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

  const [globalFilter, setGlobalFilter] = useState(''); // filtrar por texto
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // filtrar por columnas

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar esta transacción?')) {
      const newTransactions = transactions.filter(t => t.id !== id);
      table.setPageSize(newTransactions.length);
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

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [  // Define las columnas de la tabla
    columnHelper.accessor('date', {
      header: 'Fecha',
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('description', {
      header: 'Descripción',
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('project', {
      header: 'Proyecto',
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('category', {
      header: 'Categoría',
      cell: (info) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
          {info.getValue()}
        </span>
      ),
      filterFn: 'equals'
    }),

    columnHelper.accessor('amount', {
      header: 'Monto',
      cell: info => {
        const amount = info.getValue();
        return (
          <div className={`text-right ${amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {amount >= 0 ? '+' : ''}
            ${Math.abs(amount).toLocaleString('es-AR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
        );
      },
      filterFn: (row, columnId, filterValue) => {
        const amount = row.getValue<number>(columnId);
        if (filterValue === 'ingresos') return amount >= 0;
        if (filterValue === 'egresos') return amount < 0;
        return true;
      },
    }),

    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: props => (
        <div className="flex justify-center space-x-2">
          <button 
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => handleEdit(props.row.original)}
          >
            <Edit2 size={16} />
          </button>
          <button 
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => handleDelete(props.row.original.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    data: transactions,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => { // define la función de filtrado por texto
      const searchTerm = filterValue.toLowerCase();
      return Object.values(row.original).some(value => 
        String(value).toLowerCase().includes(searchTerm)
      );
    }
  });

  const hanleTypeFilterChange = (value: string) => { // filtrar por tipo de transacción
    table.getColumn('amount')?.setFilterValue(value);
  };

  const hanleCategoryFilterChange = (value: string) => { // filtrar por categoría
    table.getColumn('category')?.setFilterValue(value);
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Registro de Transacciones</h3>
      <p className="text-gray-500 text-sm mb-6">Historial de todos los movimientos financieros.</p>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar transacciones..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          value={globalFilter ?? ``}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <select 
        className="px-4 py-2 border border-gray-300 rounded-md"
        onChange={e => hanleTypeFilterChange(e.target.value)}>
          <option value="">Todos</option>
          <option value="ingresos">Ingresos</option>
          <option value="egresos">Egresos</option>
        </select>
        <select 
        className="px-4 py-2 border border-gray-300 rounded-md"
        onChange={e => hanleCategoryFilterChange(e.target.value)}>
          <option value="">Todos</option>
          <option value="ventas">Ventas</option>
          <option value="insumos">Insumos</option>
          <option value="equipamiento">Equipamiento</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className= "min-w-full divide-y divide-gray-200">
          <thead >
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
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
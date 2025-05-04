

interface Transaction{
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
    date: '31/7/2024',
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


export const RecentTransactions: React.FC = () => {
  // Ordenar transacciones por fecha y tomar las últimas 4
  const recentTransactions = [...initialTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <div className="h-full">
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
    </div>
  );
};
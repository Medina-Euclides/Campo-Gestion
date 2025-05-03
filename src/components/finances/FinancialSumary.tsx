import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { TransactionList } from './TransactionList';
import { BarChartRecharts } from '../charts/chart';

const data = [ //datos de ejmplo para grafica
    { name: 'Ene', Ingresos: 4000, Egresos: 2500, proyecto: 'Papa' },
    { name: 'Feb', Ingresos: 3000, Egresos: 1500, proyecto: 'Yuca' },
    { name: 'Mar', Ingresos: 5000, Egresos: 3800, proyecto: 'Café' },
    { name: 'Abr', Ingresos: 7500, Egresos: 3700, proyecto: 'Frijol' },
    { name: 'May', Ingresos: 6000, Egresos: 4800, proyecto: 'Maíz' },
    { name: 'Jun', Ingresos: 5000, Egresos: 3600, proyecto: 'Tomate' },
    { name: 'Jul', Ingresos: 9000, Egresos: 4200, proyecto: 'Panela' },
  ];

  //componente que renderiza la pestañas reumen y lista de tabla transacciones
export const FinancialSummary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('resumen');
  
  
  return (
    <Card >
      <div className="inline-flex rounded-md shadow-sm mb-6" role="group">
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
      
      {activeTab === 'resumen' ? (
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <BarChartRecharts
            title='Resumen de transacciones por proyecto'
            data={data}
            keys={[
                { name: 'Ingresos', color: '#00cc88' },
                { name: 'Egresos', color: '#ff6666' },
            ]}
            />
          </div>
        </div>
      ) : (
        <TransactionList />
      )}
    </Card>
  );
};
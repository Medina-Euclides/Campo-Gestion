// src/components/BarChartRecharts.tsx
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
  
  type ChartProps = {
    title?: string;
    description?: string;
    data: {
      name: string;
      proyecto: string;
      [key: string]: string | number;
    }[];
    keys: {
      name: string;
      color: string;
    }[];
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const ingresos = payload.find((p: { name: string; value: number }) => p.name === 'Ingresos')?.value || 0;
      const egresos = payload.find((p: { name: string; value: number }) => p.name === 'Egresos')?.value || 0;
      const proyecto = payload[0]?.payload?.proyecto;
  
      return (
        <div className="bg-white p-2 border rounded shadow text-sm">
          <p className="font-semibold">{`Mes: ${label}`}</p>
          <p>{`Proyecto: ${proyecto}`}</p>
          <p className="text-green-600">{`Ingresos: $${ingresos.toLocaleString()}`}</p>
          <p className="text-red-500">{`Egresos: $${egresos.toLocaleString()}`}</p>
        </div>
      );
    }
  
    return null;
  };
  
  export function BarChartRecharts({ title, description, data, keys }: ChartProps) {
    return (
      <>
        {title && <h2 className="text-xl font-semibold mb-1">{title}</h2>}
        {description && <p className="text-gray-500 text-sm mb-4">{description}</p>}
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {keys.map((k) => (
              <Bar
                key={k.name}
                dataKey={k.name}
                fill={k.color}
                barSize={30}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }
  
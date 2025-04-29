export const ProjectsChart: React.FC = () => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'];
    const values = [4000, 3000, 5000, 8000, 6000, 5000, 9000];
    
    const maxValue = Math.max(...values);
    
    return (
      <div className="w-full h-full">
        <h3 className="text-xl font-semibold mb-4">Resumen de Proyectos</h3>
        <div className="flex h-64 items-end space-x-2">
          {months.map((month, index) => (
            <div key={month} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-green-400 rounded-t"
                style={{ height: `${(values[index] / maxValue) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-500 mt-2">{month}</div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-2 mt-4">
          <div className="grid grid-cols-7 gap-2">
            {months.map((month) => (
              <div key={month} className="text-center text-xs text-gray-500">{month}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };
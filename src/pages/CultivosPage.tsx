
/**
 * pagina de cultivos
 */
import { StatCard } from "../components/dashboard/StatCard";

export function CultivosPage() {
  return (
    <>
      <div className="space-y-6">     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Temperatura"
          value="24°C"
          change="Promedio actual"
          />

          <StatCard
          title="Humedad"
          value="65%"
          change="promedio actual"
          />

          <StatCard
          title="Velocidad del viento"
          value="12 km/h" valueClassName="text-red-500"
          change="Direccion encontra"
          />

          <StatCard
          title="Proxima cosecha"
          value="15 dias" valueClassName="text-green-500"
          change="cafe"
          />
        </div>

        {/* Monitoreo de cultivos */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Monitoreo de Cultivos</h2>
              <p className="text-gray-400 text-sm">Seguimiento del crecimiento y estado actual de los cultivos.</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-gray-200 px-4 py-2 rounded-lg text-gray-600 font-semibold">Vista Cuadrícula</button>
              <button className="px-4 py-2 rounded-lg text-gray-400 font-semibold">Vista Detallada</button>
            </div>
          </div>

          {/* Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tarjeta Maíz */}
            <div className="bg-white p-6 rounded-2xl shadow space-y-4">
              <div className="flex items-center">
                <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">Bueno</span>
                <h3 className="text-lg font-bold">Maíz Norte - Lote 1</h3>
              </div>
              <p className="text-gray-400 text-sm">Maíz - Híbrido DK7210</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-gray-500 text-xs">Crecimiento</h4>
                  <p className="text-xl font-bold">75%</p>
                </div>
                <div>
                  <h4 className="text-gray-500 text-xs">Humedad</h4>
                  <p className="text-xl font-bold">68%</p>
                </div>
                <div>
                  <h4 className="text-gray-500 text-xs">pH Suelo</h4>
                  <p className="text-xl font-bold">6.4</p>
                </div>
                <div>
                  <h4 className="text-gray-500 text-xs">Temperatura</h4>
                  <p className="text-xl font-bold">23°C</p>
                </div>
              </div>
              <p className="text-green-600 text-sm font-semibold mt-2">Etapa: Crecimiento</p>
            </div>

            {/* Tarjeta Trigo */}
            <div className="bg-white p-6 rounded-2xl shadow space-y-4">
              <div className="flex items-center">
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">Excelente</span>
                <h3 className="text-lg font-bold">Trigo Este - Lote 3</h3>
              </div>
              <p className="text-gray-400 text-sm">Trigo - Klein Serpiente</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-gray-500 text-xs">Crecimiento</h4>
                  <p className="text-xl font-bold">95%</p>
                </div>
                <div>
                  <h4 className="text-gray-500 text-xs">Humedad</h4>
                  <p className="text-xl font-bold">62%</p>
                </div>
                <div>
                  <h4 className="text-gray-500 text-xs">pH Suelo</h4>
                  <p className="text-xl font-bold">6.8</p>
                </div>
                <div>
                  <h4 className="text-gray-500 text-xs">Temperatura</h4>
                  <p className="text-xl font-bold">24°C</p>
                </div>
              </div>
              <p className="text-green-600 text-sm font-semibold mt-2">Etapa: Cosecha</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
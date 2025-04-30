
/**
 * pagina de cultivos
 */
import React from 'react'; //necesario para usar React a travez de componentes

export function CultivosPage() {
  return (
    <>
      {/* Inputs para ingresar datos */}
      <div className="p-6 bg-gray-50 min-h-screen">
        

        {/* Resumen de clima */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">Temperatura</h2>
            <p className="text-2xl font-bold">24°C</p>
            <p className="text-gray-400 text-xs">Promedio actual</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">Humedad</h2>
            <p className="text-2xl font-bold text-green-600">65%</p>
            <p className="text-gray-400 text-xs">Promedio actual</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">Velocidad del viento</h2>
            <p className="text-2xl font-bold text-red-500">12 Km/h</p>
            <p className="text-gray-400 text-xs">Dirección ni idea</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">Próxima cosecha</h2>
            <p className="text-2xl font-bold">15 días</p>
            <p className="text-gray-400 text-xs">maíz este</p>
          </div>
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
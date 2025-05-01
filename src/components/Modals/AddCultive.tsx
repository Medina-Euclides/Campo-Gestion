import React from 'react';

export function RegistrarCultivoModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
        {/* Cerrar (X) */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ×
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-2">Registrar Nuevo Cultivo</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Complete los detalles para registrar un nuevo cultivo.
        </p>

        {/* Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Tipo de Cultivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cultivo</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option>Seleccionar tipo</option>
              <option>Maíz</option>
              <option>Trigo</option>
              <option>Soya</option>
            </select>
          </div>

          {/* Variedad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Variedad</label>
            <input
              type="text"
              placeholder="Ej: Híbrido DK7210"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Fecha de Siembra */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Siembra</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Fecha Estimada de Cosecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Estimada de Cosecha</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Área Cultivada */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Área Cultivada (hectáreas)</label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md p-2"
              defaultValue="0"
            />
          </div>

          {/* Proyecto Asociado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proyecto Asociado</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option>Seleccionar proyecto</option>
              <option>Proyecto A</option>
              <option>Proyecto B</option>
            </select>
          </div>
        </div>

        {/* Notas Adicionales */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notas Adicionales</label>
          <textarea
            placeholder="Información adicional sobre el cultivo"
            className="w-full border border-gray-300 rounded-md p-2"
            
          ></textarea>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold">
            Cancelar
          </button>
          <button className="px-4 py-2 rounded-lg bg-black text-white font-semibold">
            Guardar Cultivo
          </button>
        </div>
      </div>
    </div>
  );
}
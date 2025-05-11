
import React from 'react';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

interface RegistrarCultivoModalProps {    // Definición de las propiedades del componente
  visible: boolean;                       // Indica si el modal es visible o no
  onClose: () => void;                    // Función para cerrar el modal
}

/**
 * Componente para el modal de registro de cultivo
 * @param visible - Indica si el modal es visible o no
 * @param onClose - Función para cerrar el modal
 */

/// Este componente muestra un formulario para registrar un nuevo cultivo
/// y se renderiza solo si la propiedad "visible" es verdadera.

export const RegistrarCultivoModal: React.FC<RegistrarCultivoModalProps> = ({
  visible,          // Propiedad que indica si el modal debe ser visible o no
  onClose,         // Función que se llama para cerrar el modal
}) => {
  if (!visible) return null; // No renderizar el modal si no es visible

  // Manejar el cierre del modal al hacer clic en el botón de cerrar
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md my-8">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Registrar nuevo cultivo
              </h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20}/>
              </button>
        </div>
        <p className="text-gray-500 mb-6 text-sm">
          Complete los detalles para registrar un nuevo cultivo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Cultivo
            </label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option>Seleccionar tipo</option>
              <option>Maíz</option>
              <option>Trigo</option>
              <option>Soya</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variedad
            </label>
            <input
              type="text"
              placeholder="Ej: Híbrido DK7210"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Siembra
            </label>
            <input 
              type="date" 
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Estimada de Cosecha
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Área Cultivada (hectáreas)
            </label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md p-2"
              defaultValue="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proyecto Asociado
            </label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option>Seleccionar proyecto</option>
              <option>Proyecto A</option>
              <option>Proyecto B</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notas Adicionales
          </label>
          <textarea
            placeholder="Información adicional sobre el cultivo"
            className="w-full border border-gray-300 rounded-md p-2"          
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} variant="secondary">
            Cancelar
          </Button>

          <Button>
            Registrar Cultivo
          </Button>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
}
import { Edit, X } from "lucide-react";
import { Button } from "../ui/Button";



interface RegistrarProyectoModalProps {    // Definición de las propiedades del componente
  visible: boolean;                     // Indica si el modal es visible o no
  onClose: () => void;                  // Función para cerrar el modal
}

/**
 * Componente para el modal de registro de cultivo
 * @param visible - Indica si el modal es visible o no
 * @param onClose - Función para cerrar el modal
 */

export function RegistrarProyectoModal({visible, onClose}: RegistrarProyectoModalProps) {
    if (!visible) return null; // No renderizar el modal si no es visible

    return (
   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md my-8">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Registrar nuevo proyecto
              </h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20}/>
              </button>
        </div>
        <p className="text-gray-500 mb-6 text-sm">
          Complete los detalles para crear un nuevo proyecto.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del proyecto
            </label>
            <input
              type="text"
              placeholder="Ej: Proyecto de Cultivo de Maíz"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsables
            </label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripcion
          </label>
          <textarea
            placeholder="Información adicional sobre el cultivo"
            className="w-full border border-gray-300 rounded-md p-2"           
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de inicio
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Estimada de finalizacion
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={onClose} variant="secondary">
              Cancelar
            </Button>

            <Button>
              guardar Proyecto
            </Button>
         </div>
       </div>
     </div>
    </div>
  </div>
    );
}
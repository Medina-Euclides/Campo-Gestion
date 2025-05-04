


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
    <>
   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md my-8">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">

            {/* Botón de cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text -2xl"
        >
        {/* Cerrar (X) */}
          ×
        </button>
        </div>
    
            {/* Título */}  
        <h2 className="text-2xl font-bold mb-2">Registrar Nuevo proyecto</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Complete los detalles para crear un nuevo proyecto.
        </p>

        {/* Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* campo digitar nombre del proyecto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del proyecto</label>
            <input
              type="text"
              placeholder="Ej: Proyecto de Cultivo de Maíz"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* campo digitar nombre del responsable */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsables</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            </div>
            </div>

        <div className="mb-6">
            {/* campo digitar descripcion */}
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
          <textarea
            placeholder="Información adicional sobre el cultivo"
            className="w-full border border-gray-300 rounded-md p-2"
            
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Fecha de inicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Fecha Estimada de Cosecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Estimada de finalizacion</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <button 
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold"
          >
            Cancelar
          </button>

          <button
          onClick={() => {
            // Aquí puedes agregar la lógica para guardar el proyecto
            console.log("Proyecto guardado");
            onClose(); // Cerrar el modal después de guardar
          }}
          className="px-4 py-2 rounded-lg bg-black text-white font-semibold"
          >
            Guardar
          </button>
        </div>
        </div>
    </div>
    </div>
    </div>
    </>
    );
}
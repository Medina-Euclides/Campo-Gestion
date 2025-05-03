import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';



interface Transaction {
  id: number;
  date: string;
  description: string;
  project: string;
  category: string;
  amount: number;
}

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: Partial<Transaction>) => void;
  editData?: Transaction;
}

/**
 * NewTransactionModal - Modal para crear o editar transacciones
 * 
 * Formulario modal para gestionar transacciones financieras.
 * 
 * Props:
 * @param {boolean} isOpen - Controla la visibilidad del modal
 * @param {function} onClose - Función para cerrar el modal
 * @param {function} onSave - Función para guardar los cambios
 * @param {Transaction} editData - Datos de la transacción a editar (opcional)
 * 
 * Características:
 * - Soporte para crear nuevas transacciones y editar existentes
 * - Validación de campos requeridos
 * - Selección de tipo de transacción (ingreso/egreso)
 * - Selección de proyecto y categoría
 */
export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onClose,
  //onSave,
  editData
}) => {
  const [formData, setFormData] = useState({
    type: 'egreso',
    project: '',
    amount: '',
    date: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        type: editData.amount >= 0 ? 'ingreso' : 'egreso',
        project: editData.project,
        amount: Math.abs(editData.amount).toString(),
        date: editData.date,
        description: editData.description,
        category: editData.category
      });
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //const amount = parseFloat(formData.amount) * (formData.type === 'egreso' ? -1 : 1);
    //onSave({ ...formData, amount });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md my-8">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editData ? 'Editar Transacción' : 'Registrar Nueva Transacción'}
              </h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">
              {editData 
                ? 'Modifique los detalles de la transacción.'
                : 'Complete los detalles para registrar un ingreso o egreso.'}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Transacción
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="egreso">Egreso</option>
                    <option value="ingreso">Ingreso</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proyecto Asociado
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    required
                  >
                    <option value="">Seleccione un proyecto</option>
                    <option value="Maíz Norte">Maíz Norte</option>
                    <option value="Trigo Este">Trigo Este</option>
                    <option value="Soja Sur">Soja Sur</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monto ($)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describa la transacción"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    <option value="Insumos">Insumos</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Equipamiento">Equipamiento</option>
                    <option value="Mano de Obra">Mano de Obra</option>
                    <option value="Subsidios">Subsidios</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>

                <Button type="submit">
                  {editData ? 'Guardar Cambios' : 'Guardar Transacción'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
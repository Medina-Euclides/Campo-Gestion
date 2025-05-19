import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: any;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  editData
}) => {
  const { addProject, updateProject } = useApp();
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    responsibles: editData?.responsibles || '',
    description: editData?.description || '',
    startDate: editData?.startDate || '',
    endDate: editData?.endDate || '',
    budget: editData?.budget || '',
    type: editData?.type || '',
    status: editData?.status || 'Planificación',
    progress: editData?.progress || 0
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      updateProject(editData.id, formData);
    } else {
      addProject(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md my-8">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editData ? 'Editar Proyecto' : 'Registrar Nuevo Proyecto'}
              </h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">
              Complete los detalles para crear un nuevo proyecto agrícola.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Proyecto
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ej: Maíz Norte 2025"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Cultivo
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="Maíz">Maíz</option>
                  <option value="Trigo">Trigo</option>
                  <option value="Soja">Soja</option>
                  <option value="Girasol">Girasol</option>
                  <option value="Alfalfa">Alfalfa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsables
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.responsibles}
                  onChange={(e) => setFormData({...formData, responsibles: e.target.value})}
                  placeholder="Nombres de los responsables"
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
                  placeholder="Describa los detalles del proyecto"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha Estimada de Finalización
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Presupuesto Inicial ($)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  required
                >
                  <option value="Planificación">Planificación</option>
                  <option value="Activo">Activo</option>
                  <option value="Completado">Completado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Progreso (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.progress}
                  onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editData ? 'Guardar Cambios' : 'Crear Proyecto'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
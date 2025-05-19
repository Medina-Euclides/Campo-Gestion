import React, { useState, useEffect, useRef } from 'react';
import { MoreHorizontal, Edit2, Eye, Trash2 } from 'lucide-react';
import { NewProjectModal } from '../Modals/AddProjects';


interface Project {
  id: number;
  name: string;
  type: string;
  responsibles: string;
  status: 'Activo' | 'Planificación' | 'Completado';
  progress: number;
  description: string;
  startDate: string;
  endDate: string;
  budget: string;
}

/**
 * ProjectTable - Componente de tabla de proyectos
 * 
 * Muestra una tabla interactiva con la lista de proyectos y sus detalles.
 * 
 * Características:
 * - Muestra información detallada de cada proyecto (nombre, responsables, estado, progreso)
 * - Menú de acciones por proyecto (ver detalles, editar, eliminar)
 * - Cierre automático del menú al hacer clic fuera
 * - Modal de edición de proyecto
 * - Confirmación antes de eliminar
 * 
 * Props:
 * - projects: Array de proyectos a mostrar
 * - onDelete: Función para manejar la eliminación de un proyecto
 * - onEdit: Función para manejar la edición de un proyecto
 */
interface ProjectTableProps {
  projects: Project[];
  onDelete?: (id: number) => void;
  onEdit?: (project: Project) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({ 
  projects = [], 
  onDelete = () => {}, 
  onEdit = () => {} 
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Planificación':
        return 'bg-purple-100 text-purple-800';
      case 'Completado':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar este proyecto?')) {
      onDelete(id);
      setActiveMenu(null);
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
    setActiveMenu(null);
  };

  const handleViewDetails = (project: Project) => {
    console.log('Ver detalles:', project);
    setActiveMenu(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mt-4 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Gestione sus proyectos agrícolas desde aquí</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Proyecto
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Responsables
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progreso
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{project.name}</div>
                  <div className="text-sm text-gray-500">{project.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {project.responsibles}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 mr-2">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 relative">
                          <div 
                            className="absolute inset-0 border-4 border-gray-200 rounded-full"
                          ></div>
                          <div 
                            className="absolute inset-0 border-4 border-green-500 rounded-full"
                            style={{ 
                              clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                              transform: `rotate(${(project.progress / 100) * 360}deg)`
                            }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                            {project.progress}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                  <div ref={menuRef}>
                    <button 
                      className="p-1 rounded-full hover:bg-gray-100"
                      onClick={() => setActiveMenu(activeMenu === project.id ? null : project.id)}
                    >
                      <MoreHorizontal size={20} />
                    </button>
                    
                    {activeMenu === project.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                        <button
                          onClick={() => handleViewDetails(project)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye size={16} className="mr-2" />
                          Ver detalles
                        </button>
                        <button
                          onClick={() => handleEdit(project)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit2 size={16} className="mr-2" />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <Trash2 size={16} className="mr-2" />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProject && (
        <NewProjectModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProject(null);
          }}
          editData={selectedProject}
        />
      )}
    </div>
  );
};
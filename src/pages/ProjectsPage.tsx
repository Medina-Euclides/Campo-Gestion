import React, { useState } from 'react';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import { Table } from '../components/ui/Table';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { useApp } from '../context/AppContext';
import { NewProjectModal } from '../components/Modals/AddProjects';

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
 * ProjectsPage - Página principal de gestión de proyectos
 * 
 * Características principales:
 * - Lista de proyectos con búsqueda global
 * - Visualización del estado y progreso de cada proyecto
 * - Acciones por proyecto (ver detalles, editar, eliminar)
 * - Modal de edición de proyecto
 * - Indicadores visuales de estado y progreso
 * - Integración con contexto global para gestión de datos
 * 
 * Funcionalidades:
 * - Búsqueda de proyectos
 * - Gestión de estados visuales
 * - Confirmación de acciones destructivas
 * - Manejo de edición de proyectos
 * 
 * @returns {JSX.Element} Página de gestión de proyectos
 */
export const ProjectsPage: React.FC = () => {
  const { projects, deleteProject } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const columnHelper = createColumnHelper<Project>();

  /**
   * Determina el color de fondo y texto según el estado del proyecto
   * @param {string} status - Estado del proyecto
   * @returns {string} Clases CSS para el estado
   */
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

  const columns: ColumnDef<Project, any>[] = [
    columnHelper.accessor('name', {
      header: 'Proyecto',
      cell: info => (
        <div>
          <div className="font-medium text-gray-900">{info.getValue()}</div>
          <div className="text-sm text-gray-500">{info.row.original.type}</div>
        </div>
      ),
    }),
    columnHelper.accessor('responsibles', {
      header: 'Responsables',
      cell: info => (
        <div className="text-sm text-gray-900">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Estado',
      cell: info => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(info.getValue())}`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('progress', {
      header: 'Progreso',
      cell: info => (
        <div className="flex items-center">
          <div className="relative w-16 h-16 mr-2">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 relative">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div 
                  className="absolute inset-0 border-4 border-green-500 rounded-full"
                  style={{ 
                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                    transform: `rotate(${(info.getValue() / 100) * 360}deg)`
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                  {info.getValue()}%
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: props => (
        <div className="flex space-x-2">
          <button 
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => console.log('Ver detalles:', props.row.original)}
          >
            <Eye size={16} />
          </button>
          <button 
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => handleEdit(props.row.original)}
          >
            <Edit2 size={16} />
          </button>
          <button 
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => handleDelete(props.row.original.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ];

  /**
   * Maneja la eliminación de un proyecto
   * @param {number} id - ID del proyecto a eliminar
   */
  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar este proyecto?')) {
      deleteProject(id);
    }
  };

  /**
   * Maneja la edición de un proyecto
   * @param {Project} project - Proyecto a editar
   */
  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <Table<Project>
        data={projects}
        columns={columns}
        enableGlobalFilter={true}
        searchPlaceholder="Buscar proyectos..."
        title="Gestione sus proyectos agrícolas desde aquí"
      />

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
/**
 * Props del componente Header
 * @param title - Título que se muestra en la cabecera
 * @param toggleSidebar - Función para mostrar/ocultar el menú lateral
 */

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Globe, Plus, User, LogOut, Menu } from 'lucide-react';
import { RegistrarCultivoModal } from '../Modals/AddCultive';         // Importar el componente de modal para registrar cultivo
import { RegistrarProyectoModal } from '../Modals/AddProjects';
import { NewTransactionModal } from '../Modals/AddTransation';

interface HeaderProps {
    title: string;
    toggleSidebar: () => void;
  }
  
  /**
   * Componente Header
   * - Muestra la barra superior de la aplicación
   * - Contiene el botón de menú, título, barra de búsqueda y acciones rápidas
   * - Gestiona los menús desplegables de usuario y acciones
   */
  export const Header: React.FC<HeaderProps> = ({ title, toggleSidebar }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const [showCultivoModal, setShowCultivoModal] = useState(false); // Estado para mostrar el modal de cultivo
    const [showTransaccionModal, setShowTransaccionModal] = useState(false); // Estado para mostrar el modal de transacción
    const [showProyectoModal, setShowProyectoModal] = useState(false); // Estado para mostrar el modal de proyecto

    const userMenuRef = useRef<HTMLDivElement>(null);
    const addMenuRef = useRef<HTMLDivElement>(null);
  
    // Manejador para cerrar menús al hacer clic fuera
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
          setIsUserMenuOpen(false);
        }
        if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
          setIsAddMenuOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-semibold ml-4">{title}</h1>
          </div>
  
          
  
          <div className="flex items-center space-x-2">
            <div ref={addMenuRef} className="relative">
              <button
                onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 flex items-center"
              >
                <Plus size={20} />
                
              </button>
              
              {isAddMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                  
                  <button
                    onClick={() => {
                      setShowProyectoModal(true); // Mostrar el modal del proyecto
                      setIsAddMenuOpen(false); // Cerrar el menú de acciones rápidas
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Nuevo proyecto
                  </button>

                  <button 
                    onClick={() => {
                      setShowTransaccionModal(true); // Mostrar el modal de transacción
                      setIsAddMenuOpen(false); // Cerrar el menú de acciones rápidas
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Nueva Transacción
                  </button>

                  <button
                    onClick={() => {
                      setShowCultivoModal(true); // Mostrar el modal de cultivo
                      setIsAddMenuOpen(false); // Cerrar el menú de acciones rápidas
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Nuevo cultivo
                  </button>

                </div>
              )}
            </div>
  
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-4 h-4 text-white text-xs font-bold bg-red-500 rounded-full">3</span>
            </button>
            
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
              <Globe size={20} />
            </button>
            
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={18} className="text-gray-600" />
                </div>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Perfil
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Configuración
                  </a>
                  <div className="border-t border-gray-100"></div>
                  <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center">
                      <LogOut size={16} className="mr-2" />
                      Cerrar Sesión
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <RegistrarCultivoModal
        visible={showCultivoModal}
        onClose={() => setShowCultivoModal(false)} // Cerrar el modal al hacer clic en el botón de cerrar
        />

      <RegistrarProyectoModal
        visible={showProyectoModal}
        onClose={() => setShowProyectoModal(false)} // Cerrar el modal al hacer clic en el botón de cerrar
        />
        <NewTransactionModal
        isOpen={showTransaccionModal}
        onClose={() => setShowTransaccionModal(false)} // Cerrar el modal al hacer clic en el botón de cerrar
        />  
      </>
    );
  };
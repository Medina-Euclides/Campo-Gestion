/**
 * Props del componente Header
 * @param title - Título que se muestra en la cabecera
 * @param toggleSidebar - Función para mostrar/ocultar el menú lateral
 */

import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Globe, Plus, User, LogOut, Menu } from 'lucide-react';

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
  
          <div className="flex-1 mx-4 lg:mx-8 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500"
              />
            </div>
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
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Nuevo Proyecto
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Nueva Transacción
                  </a>
                </div>
              )}
            </div>
  
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0.5 right-0.5 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
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
    );
  };
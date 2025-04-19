/**
 * Configuración de los elementos de navegación
 * - Cada item define su nombre, ruta e icono
 * - Las rutas están prefijadas con /app para coincidir con la estructura de rutas
 */

import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, DollarSign, Sprout } from 'lucide-react';


const navItems = [
    { name: 'Dashboard', path: '/app', icon: <LayoutDashboard size={20} /> },
    { name: 'Proyectos', path: '/app/proyectos', icon: <FileText size={20} /> },
    { name: 'Finanzas', path: '/app/finanzas', icon: <DollarSign size={20} /> },
    { name: 'Cultivos', path: '/app/cultivos', icon: <Sprout size={20} /> },
  ];
  
  interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
  }

/**
 * Componente Sidebar
 * - Muestra el menú de navegación lateral
 * - Se superpone al contenido en modo móvil
 * - Se cierra al hacer clic fuera de él
 */
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const location = useLocation();
    const sidebarRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
  
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, onClose]);
    
    return (
      <>
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={onClose}
          />
        )}
        
        <nav 
          ref={sidebarRef} 
          className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-gray-200">
            <h1 className="font-bold text-xl">CampoGestión</h1>
          </div>
          
          <div className="flex-grow py-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-2.5 text-sm ${
                        isActive 
                          ? 'bg-green-50 text-green-600 font-medium border-l-4 border-green-500' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={onClose}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </>
    );
  };
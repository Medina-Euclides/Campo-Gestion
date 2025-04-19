/**
 * Layout principal de la aplicación
 * - Gestiona la estructura base de las páginas autenticadas
 * - Controla la visibilidad del sidebar
 * - Muestra el contenido dinámico a través de Outlet
 * 
 * Características:
 * - El sidebar está oculto por defecto y se muestra al hacer clic en el botón de menú
 * - El contenido principal se ajusta automáticamente
 * - Mantiene la navegación y estructura consistente en todas las páginas
 */

import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar-menu';

export const MainLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    
    // Determina el título basado en la ruta actual
    const getTitle = () => {
      const path = location.pathname;
      if (path === '/app') return 'Dashboard';
      if (path === '/app/proyectos') return 'Proyectos';
      if (path === '/app/finanzas') return 'Finanzas';
      if (path === '/app/cultivos') return 'Cultivos';
      return 'CampoGestión';
    };
    
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        <Header 
          title={getTitle()} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
          
          <main className="flex-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    );
  };
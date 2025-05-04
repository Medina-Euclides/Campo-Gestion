import React, { createContext, useContext, useState } from 'react';

interface Transaction {
  id: number;
  date: string;
  description: string;
  project: string;
  category: string;
  amount: number;
}

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

interface AppContextType {
  transactions: Transaction[];
  projects: Project[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: number, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: number) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { 
      id: 1,
      date: '14/7/2024',
      description: 'Venta de Cosecha',
      project: 'Trigo Este',
      category: 'Ventas',
      amount: 8750
    },
    { 
      id: 2,
      date: '9/7/2024',
      description: 'Compra de Semillas',
      project: 'Maíz Norte',
      category: 'Insumos',
      amount: -1999
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Maíz Norte',
      type: 'Maíz',
      responsibles: 'Carlos Méndez, Ana López',
      status: 'Activo',
      progress: 75,
      description: 'Proyecto de cultivo de maíz en la zona norte',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: '50000'
    },
    {
      id: 2,
      name: 'Trigo Este',
      type: 'Trigo',
      responsibles: 'Juan Rodríguez',
      status: 'Activo',
      progress: 95,
      description: 'Cultivo de trigo en la zona este',
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      budget: '45000'
    }
  ]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.max(0, ...transactions.map(t => t.id)) + 1
    };
    setTransactions([...transactions, newTransaction]);
  };

  const updateTransaction = (id: number, transaction: Partial<Transaction>) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, ...transaction } : t
    ));
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: Math.max(0, ...projects.map(p => p.id)) + 1
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: number, project: Partial<Project>) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, ...project } : p
    ));
  };

  const deleteProject = (id: number) => {
    const projectToDelete = projects.find(p => p.id === id);
    if (projectToDelete) {
      // Eliminar el proyecto
      setProjects(projects.filter(p => p.id !== id));
      // Eliminar todas las transacciones asociadas al proyecto
      setTransactions(transactions.filter(t => t.project !== projectToDelete.name));
    }
  };

  return (
    <AppContext.Provider value={{
      transactions,
      projects,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addProject,
      updateProject,
      deleteProject
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
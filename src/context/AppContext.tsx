import React, { createContext, useContext, useState, useCallback } from 'react';

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

interface DashboardStats {
  projectCount: number;
  totalBalance: number;
  cropsCount: number;
  recentTransactions: Transaction[];
}

interface FinanceStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  remainingBudget: number;
}

interface AppContextType {
  // Data
  transactions: Transaction[];
  projects: Project[];
  
  // Stats
  dashboardStats: DashboardStats;
  financeStats: FinanceStats;
  
  // Acciones de Transacciones
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: number, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: number) => void;
  
  // Acciones de Proyectos
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

  // Calcular estadísticas del dashboard
  const calculateDashboardStats = useCallback((): DashboardStats => {
    const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
    const recentTransactions = [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);

    return {
      projectCount: projects.length,
      totalBalance,
      cropsCount: projects.length, // Por ahora igual a proyectos hasta implementar cultivos
      recentTransactions
    };
  }, [transactions, projects]);

  // Calcular estadísticas financieras
  const calculateFinanceStats = useCallback((): FinanceStats => {
    const totalIncome = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = Math.abs(transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0));

    const totalBudget = projects.reduce((sum, p) => sum + parseFloat(p.budget), 0);
    const remainingBudget = totalBudget - totalExpenses;

    return {
      totalBalance: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses,
      remainingBudget
    };
  }, [transactions, projects]);

  // Acciones de Transacciones
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.max(0, ...transactions.map(t => t.id)) + 1
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const updateTransaction = (id: number, transaction: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...t, ...transaction } : t
    ));
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Acciones de Proyectos
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: Math.max(0, ...projects.map(p => p.id)) + 1
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: number, project: Partial<Project>) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, ...project } : p
    ));
  };

  const deleteProject = (id: number) => {
    const projectToDelete = projects.find(p => p.id === id);
    if (projectToDelete) {
      setProjects(prev => prev.filter(p => p.id !== id));
      // Eliminar transacciones asociadas
      setTransactions(prev => prev.filter(t => t.project !== projectToDelete.name));
    }
  };

  const value = {
    transactions,
    projects,
    dashboardStats: calculateDashboardStats(),
    financeStats: calculateFinanceStats(),
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addProject,
    updateProject,
    deleteProject
  };

  return (
    <AppContext.Provider value={value}>
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
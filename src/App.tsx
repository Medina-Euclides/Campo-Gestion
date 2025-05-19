import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { AppProvider } from './context/AppContext';


function App() {

  const router = createBrowserRouter(AppRouter);
  return (
    
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App

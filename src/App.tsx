import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';


function App() {

  const router = createBrowserRouter(AppRouter);
  return <RouterProvider router={router} />;
}

export default App

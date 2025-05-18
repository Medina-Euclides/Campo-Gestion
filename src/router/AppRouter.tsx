/**
 * Configuración de rutas de la aplicación
 * - La ruta raíz '/' redirige al login
 * - Las rutas protegidas están anidadas dentro del MainLayout
 * - Cada ruta tiene su correspondiente componente y path
 */

import { RouteObject} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
//import { DashboardPage } from "../pages/DashbordPages";
import { MainLayout } from "../components/layaout/MainLayaout";
import { DashboardPage } from "../pages/DashbordPages";
import { ProjectsPage } from "../pages/ProjectsPage";
import { FinancesPage } from "../pages/FinancesPage";
import { CultivosPage } from "../pages/CultivosPage";
import { PrivateRoute } from "./PrivateRoute";
import Register from "../pages/Register";

export const AppRouter: RouteObject[] = [
    {
        path: "/",
        element: <LoginPage/>,
    },
    {
        path: "/Register",
        element: <Register/>,
    },
    {
        path: '/app',
        element: (
            <PrivateRoute>
                <MainLayout/>
            </PrivateRoute>
        ),

        children:[
            {
                index: true,
                element: <DashboardPage/>,
            },
            {
                path: 'cultivos',
                element: <CultivosPage/>,
            },
            {
                path: 'proyectos',
                element: <ProjectsPage/>,
            },
            {
                path: 'finanzas',
                element: <FinancesPage/>,
            },
        ]
               
    }
]
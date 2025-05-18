import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import React from "react"


type Props = {
    children: React.ReactNode;
};

export const PrivateRoute = ({ children}: Props) => {
    const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" replace/>
}

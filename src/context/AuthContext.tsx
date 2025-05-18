//contexto global para saber si un usuario esta logueado

import { createContext, ReactNode, use, useContext, useEffect, useState} from "react";
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "../firebase";

type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    login: (token:string) => void;
    logout: () => void;
    singUp: (email:string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({children}:{children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() =>{
        const storeToken = localStorage.getItem('token');
        if(storeToken){
            setToken(storeToken); //Restaurar sesion a reacgar pagina
        }
        setIsLoading(false)
    },[])

    const login = (newToken: string) =>{
        localStorage.setItem('token', newToken);
        setToken(newToken)
    }

    const logout = () =>{
        localStorage.removeItem('token');
        setToken(null)
    }

    const singUp = async (email:string, password:string) =>{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await getIdToken(userCredentials.user);
        login(idToken);
    }
    if (isLoading) {
        return <div>Loading...</div>; // O un componente de carga
    }

  return (
    <AuthContext.Provider value={{isAuthenticated: !!token, token, login, logout, singUp}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
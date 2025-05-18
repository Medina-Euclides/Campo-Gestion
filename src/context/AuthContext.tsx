//contexto global para saber si un usuario esta logueado

import { createContext, ReactNode, useContext, useEffect, useState} from "react";
import { 
    createUserWithEmailAndPassword, 
    getIdToken, signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    persistSession: (token:string) => void;
    logout: () => void;
    signUp: (email:string, password: string) => Promise<void>;
    loginWithEmail: (email:string, password: string) => Promise<void>;
    loginWithGoogle: () => void;
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

    const persistSession = (newToken: string) =>{
        localStorage.setItem('token', newToken);
        setToken(newToken)
    }

    const logout = () =>{
        localStorage.removeItem('token');
        setToken(null)
    }

    const loginWithEmail = async (email:string, password:string) =>{
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();
        persistSession(idToken);
    }

    const signUp = async (email:string, password:string) =>{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await getIdToken(userCredentials.user);
        persistSession(idToken);
    }

    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        const idToken= await result.user.getIdToken();
        persistSession(idToken);
    };

    if (isLoading) {
        return <div>Loading...</div>; // O un componente de carga
    }

  return (
    <AuthContext.Provider value={{isAuthenticated: !!token, token, persistSession, logout, signUp, loginWithEmail, loginWithGoogle}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
/**
 * Página de inicio de sesión
 * - Formulario simple con usuario y contraseña
 * - Botón de acceso que redirige al dashboard
 * - Opción de login con Google (solo visual)
 */

import { Mail } from "lucide-react";
import { Input } from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function LoginPage() {
    const navigate = useNavigate();
    const {loginWithEmail, loginWithGoogle} = useAuth()
    const [user, setUser] = useState({
        email: '',
        password: ''})

    const handleChange = ({target:{name,value}}:any) => {
        setUser({...user,[name]:value})
    };

    const handleSubmit = async (e: React.FormEvent) => { //funcion para loguearse
        e.preventDefault();
        console.log(user);

        try{
            await loginWithEmail(user.email, user.password);
            navigate('/app'); // Redirigir a la página de inicio después del registro exitoso
        } catch (err:any){
            console.error(err);
            alert(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/app');
        } catch (err) {
            console.error(err);
        } 
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
                    <p className="mt-2 text-sm text-gray-600">Administre sus proyectos agricolas de manera eficiente</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <Input
                        id="email"
                        name="email"
                        label="Usuario"
                        placeholder="usuario@gmail.com"
                        type="email"
                        onChange={handleChange}
                        />

                        <Input
                        id="password"
                        name="password"
                        label="Contraseña"
                        placeholder="********"
                        type="password"
                        onChange={handleChange}
                        />
                    </div>

                    <div className="tex-sm">
                        <a onClick={()=> navigate('/Register')} className="font-medium text-green-600 hover:text-green-500">
                            Resgistrarse
                        </a>
                    </div>

                    <div className="space-y-3">
                        <Button type="submit" fullWidth >inciar</Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">O continue con</span>
                        </div>
                    </div>
                </form>

                <button
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none"
                    onClick={handleGoogleLogin}
                    >
                        <Mail className="mr-2 h-5 w-5 text-gray-500" />
                        Google
                    </button>
            </div>
        </div>
    )
}
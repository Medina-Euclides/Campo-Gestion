/**
 * pagina donde se crea la ui de login de usuario
 */

import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function LoginPage() {
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
                    <p className="mt-2 text-sm text-gray-600">Administre sus proyectos agricolas de manera eficiente</p>
                </div>

                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <Input
                        id="usaurio"
                        name="usuario"
                        label="Usuario"
                        />

                        <Input
                        id="usaurio"
                        name="usuario"
                        label="Contraseña"
                        type="password"
                        />
                    </div>

                    <div className="tex-sm">
                        <a href="#" className="font-medium text-green-600 hover:text-green-500">
                            ¿Olvido su contraseña?
                        </a>
                    </div>

                    <div className="space-y-3">
                        <Button text="iniciar sesion" fullWidth/>
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


            </div>
        </div>
    )
}
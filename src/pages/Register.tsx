import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"


const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">Registrarse a CampoGestión</h2>
        
            <form className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm -space-y-px">
                    <Input
                    id="nombre"
                    name="nombre"
                    label="Correo"
                    placeholder="Nombre"
                    type="email"
                    />
                    <Input
                    id="nombre"
                    name="nombre"
                    label="Contraseña"
                    placeholder="Nombre"
                    type="email"
                    />
                </div>

                <div>
                    <Button
                    type="submit"
                    fullWidth
                    >
                        Registrarse
                    </Button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Register
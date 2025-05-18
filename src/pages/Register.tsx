import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const {signUp} = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState({
            email: '',
            password: ''})

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser({...user,[name]:value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user);
        setError(null);

        try {
            await signUp(user.email, user.password);
            navigate('/'); // Redirigir a la página de inicio después del registro exitoso
        }catch (err:any){
            console.error(err);
            setError(err.message);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">Registrarse a CampoGestión</h2>
        
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
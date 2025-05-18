import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { useState } from "react"

const Register = () => {
    const [user, setUser] = useState({
            email: '',
            password: ''})

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser({...user,[name]:value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user);
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
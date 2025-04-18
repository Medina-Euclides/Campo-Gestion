/**
 * componente de boton reutilizable 
 */
interface ButtonProps {
    text:string;
    variant?: 'primary'|'secondary'|'outline';
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    type?: "button" | "submit" | "reset";
}

function Button({text, variant='primary', onClick, size='md', fullWidth, type}: ButtonProps) {
    const baseClases = 'rounded-md font-medium transition-colors focus:outline-none';

    const varianClasses = {
        primary: 'bg-green-500 text-white hover:bg-green-600',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        outline: 'bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100',
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-2.5 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return(
        <button
        className={`${baseClases} ${varianClasses[variant]} ${sizeClasses[size]} ${widthClass}`}
        type={type}
        onClick={onClick}
        >
            {text}
        </button>
    )
}




export default Button;
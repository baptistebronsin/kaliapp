interface InputTextProps {
    label: string;
    type: 'text' | 'password' | 'email' | 'number';
    value: string;
    placeholder?: string;
    onChange: (e: any) => void;
}

const InputText: React.FC<InputTextProps> = ({ label, type, value, placeholder, onChange }) => {
    return (
        <div className="relative inline-block">
            <div className="border rounded-md">
                <input type={type} value={value} onChange={onChange} placeholder={placeholder ?? ''} className="w-full py-2.5 px-4 rounded outline-none text-sm"/>
            </div>
            <label className="absolute top-0 left-2.5 bg-white py-0 px-1 text-sm" style={{ transform: 'translateY(-50%)' }}>{label}</label>
        </div>
    )
}

export default InputText
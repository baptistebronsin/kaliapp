interface TextareaProps {
    label: string;
    value: string;
    placeholder?: string;
    onChange: (e: any) => void;
}

const Textarea: React.FC<TextareaProps> = ({ label, value, placeholder, onChange }) => {
    return (
        <div className="relative inline-block">
            <div className="border rounded-md">
                <textarea value={value} spellCheck={false} placeholder={placeholder ?? ''} onChange={onChange} className="w-full py-2.5 px-4 rounded outline-none text-sm" ></textarea>
            </div>
            <label className="absolute top-0 left-2.5 bg-white py-0 px-1 text-sm" style={{ transform: 'translateY(-50%)' }}>{label}</label>
        </div>
    )
}

export default Textarea;
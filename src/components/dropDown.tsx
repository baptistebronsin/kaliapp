interface DropDownProps {
    label: string,
    options: {
        value: string,
        label: string
    }[],
    defaultValue: string | null,
    onChange: (e: any) => void
}

const DropDown: React.FC<DropDownProps> = ({ label, options, defaultValue, onChange }) => {
    return (
        <div className="relative inline-block">
            <div className="border rounded-md">
                <select defaultValue={defaultValue ?? (options.length > 0 ? options[0].value : '')} onChange={onChange} className="w-full bg-white py-2.5 px-4 rounded outline-none text-sm">
                    {
                        options.length > 0 ?
                        options.map(option => (
                            <option value={option.value} key={option.value}>{option.label}</option>
                        )) : <option>Aucune valeur disponible</option>
                    }
                </select>
            </div>
            <label className="absolute top-0 left-2.5 bg-white py-0 px-1 text-sm" style={{ transform: 'translateY(-50%)' }}>{label}</label>
        </div>
    )
}

export default DropDown;
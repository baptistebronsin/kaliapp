import { useState } from "react";

interface CheckTextProps {
    selected: {
        value: string;
        borderColor: string;
        backgroundColor: string;
    },
    notSelected: {
        value: string;
        borderColor: string;
        backgroundColor: string;
    },
    isSelected: boolean;
    onChange: () => void
}

const CheckText: React.FC<CheckTextProps> = ({ selected, notSelected, isSelected, onChange }) => {

    return (
        isSelected ? <p className="py-1 px-3 inline-block rounded-lg cursor-pointer border" style={{ borderColor: selected.borderColor, backgroundColor: selected.backgroundColor }} onClick={onChange}>
            {selected.value}
        </p> : <p className="py-1 px-3 inline-block rounded-lg cursor-pointer border" style={{ borderColor: notSelected.borderColor, backgroundColor: notSelected.backgroundColor }} onClick={onChange}>
            {notSelected.value}
        </p>
    )
}

export default CheckText;
import Badge from "./badge";

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
        isSelected ? <Badge
            value={selected.value}
            borderColor={selected.borderColor}
            backgroundColor={selected.backgroundColor}
            size="large"
            onClick={onChange}
        /> : <Badge
            value={notSelected.value}
            borderColor={notSelected.borderColor}
            backgroundColor={notSelected.backgroundColor}
            size="large"
            onClick={onChange}
        />
    )
}

export default CheckText;
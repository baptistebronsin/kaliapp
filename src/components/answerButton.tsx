import { Check, X } from "lucide-react";

interface AnswerButtonProps {
    value: string;
    isSelected: boolean;
    isCorrect?: boolean;
    onClick: () => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ value, isSelected, isCorrect, onClick }) => {

    return (
        isCorrect === undefined ?
        <p className={`border ${ isSelected ? 'border-[#21E3BA] bg-[#F6FCFB]' : 'border-[#DADADA]' } rounded py-2 px-4 cursor-pointer`} onClick={onClick} >
            {value}
        </p> :
        <p className={`border ${isCorrect ? 'border-[#21E3BA] bg-[#F6FCFB]' : (isSelected && !isCorrect ? 'border-[#DA3838] bg-[#FEE6E6]' : 'border-[#DADADA]') } rounded py-2 px-4`} style={{ display: 'grid', gridTemplateColumns: '1fr 20px' }} >
            <span>{value}</span>
            {
                isCorrect ? <Check /> : (isSelected ? <X /> : <></>)
            }
        </p>
    )
}

export default AnswerButton;
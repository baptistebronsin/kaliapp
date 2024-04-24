export interface IQuestion {
    id: number;
    question: string;
    image: string | null;
    answers: { value: string, isCorrect: boolean }[];
    allowMultipleChoice: boolean;
    explanation: string;
    points: number;
}
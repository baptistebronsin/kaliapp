import { IQuestion } from "./question";

export interface IQuiz {
    id: string;
    title: string;
    description: string;
    categoryId: number;
    shuffleQuestion: boolean;
    shuffleAnswer: boolean;
    isVisible: boolean;
    creatorEmail: string;
    createdAt: Date;
    questions: IQuestion[];
}
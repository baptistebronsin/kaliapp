"use client"
import { ICategory } from '@/models/category';
import { IQuiz } from '@/models/quiz';
import React, { ReactNode, createContext, useContext, useState} from 'react';

export interface QuizContextType {
    quizzes: IQuiz[];
    categories: ICategory[];
    setQuizzes: React.Dispatch<React.SetStateAction<IQuiz[]>>;
}

const sampleQuizzes: IQuiz[] = [{
    id: "5LMSMRjiXKtWCyha3hgc",
    title: 'Quiz 1',
    description: 'Description 1',
    categoryId: 1,
    shuffleQuestion: true,
    shuffleAnswer: true,
    isVisible: true,
    questions: [
        { id: 1, question: 'Question 1', image: null, answers: [{ value: 'Answer 1', isCorrect: true }, { value: 'Answer 2', isCorrect: false }, { value: 'Answer 3', isCorrect: false }, { value: 'Answer 4', isCorrect: false }], allowMultipleChoice: false, explanation: 'Explanation 1', points: 1 },
        { id: 2, question: 'Question 2', image: null, answers: [{ value: 'Answer 1', isCorrect: false }, { value: 'Answer 2', isCorrect: true }, { value: 'Answer 3', isCorrect: false }, { value: 'Answer 4', isCorrect: false }], allowMultipleChoice: false, explanation: 'Explanation 2', points: 2 },
        { id: 3, question: 'Question 3', image: null, answers: [{ value: 'Answer 1', isCorrect: true }, { value: 'Answer 2', isCorrect: false }, { value: 'Answer 3', isCorrect: true }, { value: 'Answer 4', isCorrect: false }], allowMultipleChoice: true, explanation: 'Explanation 3', points: 3 }
    ]
}]

const sampleCategories: ICategory[] = [{
    id: 1,
    name: "Science",
    description: "Cette catégorie contient des questions sur la science.",
    borderColor: '#0CA4D8',
    backgroundColor: '#C4EFFE'
},
{
    id: 2,
    name: "Histoire",
    description: "Cette catégorie contient des questions sur l'histoire depuis l'an 1400.",
    borderColor: '#6924EE',
    backgroundColor: '#E5D9FD'
}]

const QuizContext = createContext<QuizContextType>({ quizzes: [], categories: [], setQuizzes: () => {} });

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [quizzes, setQuizzes] = useState<IQuiz[]>(sampleQuizzes);
    const [categories, setCategories] = useState<ICategory[]>(sampleCategories);

    return (
        <QuizContext.Provider value={{ quizzes, categories, setQuizzes }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => useContext(QuizContext);
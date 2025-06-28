"use client"
import MiddleDiv from "@/components/middleDiv";
import QuizFirstPage from "@/components/quiz";
import { QuizContextType, useQuiz } from "@/contexts/quiz-context";
import { ICategory } from "@/models/category";
import { IQuiz } from "@/models/quiz";
import { useEffect, useState } from "react";

export default function FindQuizById({ params }: { params: { quizId: string } }) {
    const { quizzes, categories }: QuizContextType = useQuiz();

    const [quiz, setQuiz] = useState<IQuiz | undefined>(undefined);
    const [category, setCategory] = useState<ICategory | undefined>(undefined)

    useEffect(() => {
        const quizFind: IQuiz | undefined = quizzes.find((q: IQuiz) => q.id === params.quizId);
        setQuiz(quizFind)

        if (!quizFind)
            return 

        const categoryFind: ICategory | undefined = categories.find((c: ICategory) => c.id === quizFind.categoryId);
        setCategory(categoryFind)
    }, [])

    return (
        quiz ? (
            quiz.isVisible && category ?
            <QuizFirstPage quiz={quiz} category={category} /> :
            <MiddleDiv>
                <p>Le quiz <strong>{quiz.title}</strong> n&apos;est pas accessible.</p>
            </MiddleDiv>
        ) :
        <MiddleDiv>
            <p>Le quiz <strong>{params.quizId}</strong> n&apos;existe pas.</p>
        </MiddleDiv>
    )
}
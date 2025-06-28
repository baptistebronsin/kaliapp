"use client"

import MiddleDiv from "@/components/middleDiv";
import QuizFirstPage from "@/components/quiz";
import { QuizContextType, useQuiz } from "@/contexts/quiz-context";
import { ICategory } from "@/models/category";
import { IQuiz } from "@/models/quiz";
import React, { useEffect, useState } from "react";

export default function FindQuizById({ params }: { params: Promise<{ quizId: string }> }) {
    const { quizzes, categories }: QuizContextType = useQuiz();

    const [unwrappedParams, setUnwrappedParams] = useState<{ quizId: string } | null>(null);
    const [quiz, setQuiz] = useState<IQuiz | undefined>(undefined);
    const [category, setCategory] = useState<ICategory | undefined>(undefined);

    useEffect(() => {
        params.then(setUnwrappedParams);
    }, [params]);

    useEffect(() => {
        if (!unwrappedParams) return;

        const quizFind: IQuiz | undefined = quizzes.find((q: IQuiz) => q.id === unwrappedParams.quizId);
        setQuiz(quizFind);

        if (!quizFind)
            return;

        const categoryFind: ICategory | undefined = categories.find((c: ICategory) => c.id === quizFind.categoryId);
        setCategory(categoryFind);
    }, [quizzes, categories, unwrappedParams]);

    if (!unwrappedParams) {
        return (
            <MiddleDiv>
                <p>Chargement...</p>
            </MiddleDiv>
        );
    }

    return (
        quiz ? (
            quiz.isVisible && category ?
            <QuizFirstPage quiz={quiz} category={category} /> :
            <MiddleDiv>
                <p>Le quiz <strong>{quiz.title}</strong> n&apos;est pas accessible.</p>
            </MiddleDiv>
        ) :
        <MiddleDiv>
            <p>Le quiz <strong>{unwrappedParams.quizId}</strong> n&apos;existe pas.</p>
        </MiddleDiv>
    );
}
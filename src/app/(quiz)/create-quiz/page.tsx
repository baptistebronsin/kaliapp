"use client"
import MiddleDiv from "@/components/middleDiv";
import QuizEditor from "@/components/quizEditor";
import { QuizContextType, useQuiz } from "@/contexts/quiz-context";
import { IQuiz } from "@/models/quiz";
import { useState } from "react";

export default function CreateQuiz() {
    const { categories, addQuizze }: QuizContextType = useQuiz();

    const [quizCreatedId, setQuizCreatedId] = useState<string | null>(null);

    const createQuiz = (quiz: IQuiz) => {
        addQuizze(quiz);
        setQuizCreatedId(quiz.id);
    }

    return (
        <div>
            {
                quizCreatedId ? 
                <MiddleDiv>
                    <p>Le quiz <strong>{quizCreatedId}</strong> a bien été créé !</p>
                </MiddleDiv> : <QuizEditor quiz={null} categories={categories} onValidate={createQuiz} />
            }
        </div>
    )
}
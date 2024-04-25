"use client"
import MiddleDiv from "@/components/middleDiv";
import QuizEditor from "@/components/quizEditor";
import { QuizContextType, useQuiz } from "@/contexts/quiz-context";
import { IQuiz } from "@/models/quiz";
import { useState } from "react";

export default function CreateQuiz() {
    const { quizzes, categories, setQuizzes }: QuizContextType = useQuiz();

    const [quizCreated, setQuizCreated] = useState<boolean>(false);

    const createQuiz = (quiz: IQuiz) => {
        setQuizzes([...quizzes, quiz])
        setQuizCreated(true)

        console.log(quiz)
        console.table(quizzes)
    }

    return (
        <div>
            {
                quizCreated ? 
                <MiddleDiv>
                    <p>Le quiz a bien été créé !</p>
                </MiddleDiv> : <QuizEditor quiz={null} categories={categories} onValidate={createQuiz} />
            }
        </div>
    )
}
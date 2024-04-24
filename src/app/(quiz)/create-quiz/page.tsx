"use client"
import QuizEditor from "@/components/quizEditor";
import { QuizContextType, useQuiz } from "@/contexts/quiz-context";
import { IQuiz } from "@/models/quiz";

export default function CreateQuiz() {
    const { quizzes, categories, setQuizzes }: QuizContextType = useQuiz();

    return (
        <div>
            <QuizEditor quiz={null} categories={categories} onValidate={(quiz: IQuiz) => true} />
        </div>
    )
}
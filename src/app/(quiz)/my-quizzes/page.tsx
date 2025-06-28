"use client"
import QuizInfoCard from "@/components/quiz-ingo-card";
import { QuizContextType, useQuiz } from "@/contexts/quiz-context";

export default function MyQuizzes() {
    const { quizzes, categories }: QuizContextType = useQuiz();

    return (
        <div className="mt-8">
            <ul className="flex flex-col gap-4 mx-4">
                {quizzes.map(quiz => {
                    const category = categories.find(cat => cat.id === quiz.categoryId);

                    return (
                        <li key={quiz.id} className="max-w-2xl w-full mx-auto">
                            <QuizInfoCard quiz={quiz} category={category} />
                        </li>
                    )
                })}
            </ul>
            {quizzes.length === 0 && <p>Aucun quiz trouvé.</p>}
        </div>
    )
}
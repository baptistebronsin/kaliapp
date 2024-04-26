"use client"
import Category from "@/components/category";
import { useQuiz } from "@/contexts/quiz-context";
import { ICategory } from "@/models/category";

export default function Categories() {
    const { quizzes, categories, setQuizzes } = useQuiz();

    return (
        <div className="flex flex-row gap-10 px-10 py-4">
            {
                categories.length === 0 ? <div className="absolute top-1/2 right-1/2" style={{ transform: 'translate(50%, -50%)' }}><p>Aucune catégorie n'a encore été créée.</p></div> : 
                categories.map((categorie: ICategory, index: number) => <Category key={index} category={categorie} />)
            }
        </div>
    )
}
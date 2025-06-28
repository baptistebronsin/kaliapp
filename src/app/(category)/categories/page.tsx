"use client"
import CategoryCard from "@/components/category-card";
import { useQuiz } from "@/contexts/quiz-context";
import { ICategory } from "@/models/category";

export default function Categories() {
    const { categories } = useQuiz();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 px-4 sm:px-10 py-4">
            {
                categories.length === 0 ? <div className="absolute top-1/2 right-1/2" style={{ transform: 'translate(50%, -50%)' }}><p>Aucune catégorie n&apos;a encore été créée.</p></div> : 
                categories.map((categorie: ICategory, index: number) => <CategoryCard key={index} category={categorie} />)
            }
        </div>
    )
}
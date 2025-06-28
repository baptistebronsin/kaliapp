"use client"
import { QuizContextType, useQuiz } from "@/contexts/quiz-context";

export default function Home() {
  const { quizzes, categories }: QuizContextType = useQuiz();
  
  return (
    <main className="py-4 px-10">
      <h1>Bienvenue sur l&apos;application Kaliapp !</h1>
      <p>
        Vous pourrez retrouver pas moins de {quizzes.length} question{quizzes.length > 1 ? 's' : ''}.<br/>
        <strong>Attention : </strong>cette application n&apos;est reliée à aucun back-end. Donc toutes les données saisies ne seront pas sauvegardées au rafraîchissement du site.
      </p>
    </main>
  )
}

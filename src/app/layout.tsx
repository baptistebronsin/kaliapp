import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/nav";
import { QuizProvider } from "@/contexts/quiz-context";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kaliapp",
  description: "Quiz App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationLinks = [{ label: "Catégories", redirection: "/categories" }, { label: "Trouver un quiz", redirection: "/find-quiz" }, { label: "Créer un quiz", redirection: "/create-quiz" }, { label: "Mes quiz", redirection: "/my-quizzes" }]

  return (
    <html lang="fr">
      <body className={inter.className}>
        <QuizProvider>
          <Navigation title="Kaliapp" links={navigationLinks} />
          {children}
        </QuizProvider>
      </body>
    </html>
  )
}

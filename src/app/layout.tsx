"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/nav";
import { QuizProvider } from "@/contexts/quiz-context";
import { BookOpen, Folder, Plus, Search } from "lucide-react";

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Kaliapp",
//   description: "Quiz App",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const menuItems = [
    {
      icon: Folder,
      title: "Catégories",
      description: "Parcourir par thème",
      color: "from-orange-500 to-red-500",
      redirection: "/categories"
    },
    {
      icon: Search,
      title: "Trouver un quiz",
      description: "Découvrir de nouveaux défis",
      color: "from-blue-500 to-cyan-500",
      redirection: "/find-quiz"
    },
    {
      icon: Plus,
      title: "Créer un quiz",
      description: "Concevoir votre propre quiz",
      color: "from-purple-500 to-pink-500",
      redirection: "/create-quiz"
    },
    {
      icon: BookOpen,
      title: "Mes quiz",
      description: "Gérer vos créations",
      color: "from-green-500 to-emerald-500",
      redirection: "/my-quizzes"
    },
  ]

  return (
    <html lang="fr">
      <body className={inter.className}>
        <QuizProvider>
          <Navigation title="Kaliapp" links={menuItems} />
          {children}
        </QuizProvider>
      </body>
    </html>
  )
}

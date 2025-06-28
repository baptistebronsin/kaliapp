"use client"

import type React from "react"

import type { ICategory } from "@/models/category"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import {
  BookOpen,
  Brain,
  Calculator,
  Globe,
  Palette,
  Music,
  Gamepad2,
  Heart,
  ChevronRight,
  Sparkles,
} from "lucide-react"

interface CategoryCardProps {
  category: ICategory
  onClick?: () => void
}

// Mapping des icônes par nom de catégorie (vous pouvez l'adapter selon vos besoins)
const getIconByName = (name: string) => {
  const iconMap: { [key: string]: any } = {
    Mathématiques: Calculator,
    Sciences: Brain,
    Histoire: BookOpen,
    Géographie: Globe,
    Art: Palette,
    Musique: Music,
    Jeux: Gamepad2,
    Sport: Heart,
  }

  return iconMap[name] || BookOpen
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const IconComponent = getIconByName(category.name)

  return (
    <Card
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl border-0"
      style={{
        backgroundColor: category.backgroundColor,
        borderLeft: `4px solid ${category.borderColor}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
      aria-label={`Catégorie ${category.name}: ${category.description}`}
    >
      {/* Effet de brillance au hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-700 ${
          isHovered ? "translate-x-full" : "-translate-x-full"
        }`}
      />

      {/* Contenu principal */}
      <CardContent className="relative p-6 h-54 sm:h-60 flex flex-col justify-between">
        {/* Header avec icône et badge */}
        <div className="flex items-start justify-between">
          <div
            className="p-3 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: category.borderColor }}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>

            <Badge variant="secondary" className="bg-white/80 text-gray-700 font-medium shadow-sm">
                15 quiz
            </Badge>
        </div>

        {/* Contenu central */}
        <div className="flex-1 flex flex-col justify-center space-y-3">
          <h3 className="text-xl font-bold text-gray-900 text-center group-hover:text-gray-800 transition-colors">
            {category.name}
          </h3>

          {/* Description avec animation */}
          <div
            className={`transition-all duration-300 ease-out ${
              isHovered ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-2"
            }`}
          >
            <p className="text-gray-600 text-center text-sm leading-relaxed px-2">{category.description}</p>
          </div>
        </div>

        {/* Footer avec indicateur d'action */}
        <div className="flex items-center justify-center">
          <div
            className={`flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
              isHovered ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-2"
            }`}
            style={{ color: category.borderColor }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Explorer</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Effet de particules décoratif */}
        <div className="absolute top-4 right-4 opacity-20">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              isHovered ? "scale-150 opacity-40" : "scale-100 opacity-20"
            }`}
            style={{ backgroundColor: category.borderColor }}
          />
          <div
            className={`w-1 h-1 rounded-full mt-2 ml-3 transition-all duration-700 delay-100 ${
              isHovered ? "scale-200 opacity-60" : "scale-100 opacity-20"
            }`}
            style={{ backgroundColor: category.borderColor }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default CategoryCard

import { Shuffle } from "lucide-react"
import Badge from "./badge"
import MainContainer from "./mainContainer"
import { IQuiz } from "@/models/quiz"
import { ICategory } from "@/models/category";

interface QuizInfoCardProps {
    quiz: IQuiz;
    category?: ICategory;
}

const QuizInfoCard: React.FC<QuizInfoCardProps> = ({ quiz, category }) => {
    return (
        <MainContainer>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <h2>{quiz.title}</h2>
                        <Badge
                            value={quiz.isVisible ? "Public" : "Privé"}
                            borderColor={quiz.isVisible ? "#4CDE5F" : "#6924EE"}
                            backgroundColor={quiz.isVisible ? "#CEFAD4" : "#E5D9FD"}
                            size="small"
                        />
                    </div>
                    <p className="text-sm text-slate-600">{quiz.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-4">
                        <div className="text-sm">
                            <p className="text-slate-700 mb-1">ID du quiz</p>
                            <span className="font-mono text-xs bg-slate-100 border border-slate-300 px-2 py-1 rounded">{quiz.id}</span>
                        </div>
                        <div className="text-sm">
                            <p className="text-slate-700 mb-1">Catégorie</p>
                            <div>
                                {
                                    category ? (
                                        <Badge
                                            value={category.name}
                                            borderColor={category.borderColor}
                                            backgroundColor={category.backgroundColor}
                                            size="small"
                                        />
                                    ) : <span className="text-gray-500">Catégorie inconnue</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm">Options de mélange</p>
                        <div className="flex items-center gap-2">
                            <Shuffle className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Questions:</span>
                            <Badge
                                value={quiz.shuffleQuestion ? "Activé" : "Désactivé"}
                                borderColor={quiz.shuffleQuestion ? "#0CA4D8" : "#E59830"}
                                backgroundColor={quiz.shuffleQuestion ? "#C4EFFE" : "#F5D3A5"}
                                size="small"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Shuffle className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Réponses:</span>
                            <Badge
                                value={quiz.shuffleAnswer ? "Activé" : "Désactivé"}
                                borderColor={quiz.shuffleAnswer ? "#0CA4D8" : "#E59830"}
                                backgroundColor={quiz.shuffleAnswer ? "#C4EFFE" : "#F5D3A5"}
                                size="small"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

export default QuizInfoCard;
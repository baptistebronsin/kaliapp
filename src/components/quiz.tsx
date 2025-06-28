import { IQuiz } from "@/models/quiz"
import MiddleDiv from "./middleDiv"
import { IQuestion } from "@/models/question"
import { ICategory } from "@/models/category";
import Button from "./button";
import { useEffect, useState } from "react";
import AnswerButton from "./answerButton";
import Badge from "./badge";

interface QuizProps {
    quiz: IQuiz;
    category: ICategory;
}

const QuizFirstPage: React.FC<QuizProps> = ({ quiz, category }) => {
    const [startQuiz, setStartQuiz] = useState<boolean>(false);

    return (
        startQuiz ?
        <QuizContext quiz={quiz} /> : <>
        <MiddleDiv title={quiz.title}>
            <div className="max-w-screen-sm flex flex-col gap-1">
                <div className="flex flex-row items-center gap-1"><p className="text-slate-500">Description : </p><p>{quiz.description}</p></div>
                <div className="flex flex-row items-center gap-1"><p className="text-slate-500">Nombre de question : </p><p>{quiz.questions.length}</p></div>
                <div className="flex flex-row items-center gap-1"><p className="text-slate-500">Nombre de points : </p><p>{quiz.questions.map((q: IQuestion) => q.points).reduce((prev, current) => prev + current, 0)}</p></div>
                <div className="flex flex-row items-center gap-1"><p className="text-slate-500">Catégorie : </p><Badge value={category.name} borderColor={category.borderColor} backgroundColor={category.backgroundColor} size="medium" /></div>
                <div className="flex flex-row items-center gap-1"><p className="text-slate-500">Mélanger les questions : </p><Badge value={quiz.shuffleQuestion ? "Aléatoire" : "Ordonnée"} borderColor={quiz.shuffleQuestion ? '#0CA4D8' : '#E59830'} backgroundColor={quiz.shuffleQuestion ? '#C4EFFE' : '#F5D3A5'} size="medium" /></div>
                <div className="flex flex-row items-center gap-1"><p className="text-slate-500">Mélanger les réponses : </p><Badge value={quiz.shuffleAnswer ? "Aléatoire" : "Ordonnée"} borderColor={quiz.shuffleAnswer ? '#0CA4D8' : '#E59830'} backgroundColor={quiz.shuffleAnswer ? '#C4EFFE' : '#F5D3A5'} size="medium" /></div>
            </div>
            <div className="text-center mt-8">
                <Button label="Démarrer le quiz" onClick={() => setStartQuiz(true)} />
            </div>
        </MiddleDiv>
        </>
    )
}

interface QuizContextProps {
    quiz: IQuiz;
}

const QuizContext: React.FC<QuizContextProps> = ({ quiz }) => {
    const [questions, setQuestions] = useState<IQuestion[] | null>(null);
    const [userAnswers, setUserAnswers] = useState<number[][]>([]);

    useEffect(() => {
        let questionsFun: IQuestion[] = quiz.questions;

        if (quiz.shuffleQuestion)
            questionsFun = shuffleArray<IQuestion>(questionsFun)

        if (quiz.shuffleAnswer)
            questionsFun.forEach((q: IQuestion) => q.answers = shuffleArray<{ value: string, isCorrect: boolean }>(q.answers))

        setQuestions(questionsFun)
    }, [quiz.questions, quiz.shuffleQuestion, quiz.shuffleAnswer])

    function shuffleArray<T>(array: T[]): T[] {
        let currentIndex = array.length, temporaryValue, randomIndex;
    
        // Tant qu'il reste des éléments à mélanger...
        while (currentIndex !== 0) {
    
            // Prendre un élément restant...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // Et le permuter avec l'élément courant.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }

    const modifyUserAnswers = (index: number, answersId: number[]) => {
        const userAnswersFun: number[][] = [...userAnswers]
        // Cas d'une maj des réponses de l'utilisateur
        if (userAnswersFun.length >= index) {
            userAnswersFun[index] = answersId;
        } else if (userAnswersFun.length + 1 === index) {
            userAnswersFun.push(answersId)
        }

        setUserAnswers(userAnswersFun)
    }

    return (
        questions === null ? <p></p> :
        userAnswers.length < questions.length ?
        <QuizForm quiz={quiz} question={questions[userAnswers.length]} userAnswers={userAnswers} modifyUserAnswers={modifyUserAnswers} /> :
        <QuizResult quiz={quiz} questions={questions} userAnswers={userAnswers} />
    )
}

interface QuizFormProps {
    quiz: IQuiz;
    question: IQuestion;
    userAnswers: number[][];
    modifyUserAnswers: (index: number, answersId: number[]) => void
}

const QuizForm: React.FC<QuizFormProps> = ({ quiz, question, userAnswers, modifyUserAnswers }) => {
    const [questionsSelected, setQuestionsSelected] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null);
    }, [questionsSelected])

    const switchQuestionState = (questionIndex: number) => {
        let questionsFun: number[] = [...questionsSelected];

        if (questionsFun.includes(questionIndex))
            questionsFun = questionsFun.filter(q => q !== questionIndex)
        else {
            if (!question.allowMultipleChoice)
                questionsFun = []

            questionsFun.push(questionIndex)
        }

        setQuestionsSelected(questionsFun)
    }

    const nextQuestion = () => {
        if (questionsSelected.length === 0) {
            setError("Veuillez sélectionner au moins une réponse.");
            return
        }

        if (!question.allowMultipleChoice && questionsSelected.length > 1) {
            setError("Veuillez sélectionner qu'une seule réponse.");
            return
        }

        modifyUserAnswers(userAnswers.length, questionsSelected);
        setQuestionsSelected([])
    }

    return (
        <MiddleDiv title={quiz.title}>
            <div className="w-[600px] flex flex-col gap-6">
                <p>Question n°{userAnswers.length + 1} : {question.question}</p>
                <div className="flex flex-col gap-2">
                    {
                        question.answers.map((a, index: number) => (
                            <AnswerButton key={question.id + '' + index} value={a.value} isSelected={questionsSelected.includes(index)} onClick={() => switchQuestionState(index)} />
                        ))
                    }
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="text-center">
                    <Button label="Suivant" onClick={nextQuestion} />
                </div>
            </div>
        </MiddleDiv>
    )
}

interface QuizResultProps {
    quiz: IQuiz;
    questions: IQuestion[];
    userAnswers: number[][];
}

const QuizResult: React.FC<QuizResultProps> = ({ quiz, questions, userAnswers }) => {
    const [questionResultIndex, setQuestionResultIndex] = useState<number | null>(null);

    const note: number = questions.map(
        (q: IQuestion, index: number) => q.answers.filter(
            (a, i: number) => a.isCorrect && userAnswers[index].includes(i)
        ).length === userAnswers[index].length ? q.points : 0
    ).reduce(
        (pre, cur) => pre + cur, 0
    )

    const maxNote: number = questions.map(q => q.points).reduce((prev, curr) => prev + curr, 0)

    return (
        <MiddleDiv title="Résultats">
            {
                questionResultIndex === null ?
                <div>
                    <div className="flex flex-row items-center gap-1"><p className="text-slate-500">Titre du quiz : </p><p>{quiz.title}</p></div>
                    <div className="flex flex-row items-center gap-1"><p className="text-slate-500">Note : </p><p><span style={{ color: '#4972e4', fontWeight: 'bold' }}>{note}</span>/{maxNote}</p></div>
                    <div className="text-center mt-4">
                        <Button label="Voir la correction" onClick={() => setQuestionResultIndex(0)} />
                    </div>
                </div> :
                <div>
                    <div className="w-[600px] flex flex-col gap-6">
                        <p>Question n°{questionResultIndex + 1} : {questions[questionResultIndex].question}</p>
                        <div className="flex flex-col gap-2">
                            {
                                questions[questionResultIndex].answers.map((a, index: number) => (
                                    <AnswerButton key={questions[questionResultIndex].id + '' + index} value={a.value} isSelected={userAnswers[questionResultIndex].includes(index)} isCorrect={a.isCorrect} onClick={() => {}} />
                                ))
                            }
                        </div>
                        <div>
                            <p className="text-center">{questions[questionResultIndex].answers.filter((a, i: number) => a.isCorrect && userAnswers[questionResultIndex].includes(i)).length === userAnswers[questionResultIndex].length ? <span className="text-[#21E3BA]">{questions[questionResultIndex].points}</span> : <span className="text-[#DA3838]">0</span>}/{questions[questionResultIndex].points}</p>
                            <div>
                                <p className="text-slate-500">Explication :</p>
                                <p>{questions[questionResultIndex].explanation}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            {
                                questionResultIndex === 0 ? <Button label="Résultats" onClick={() => setQuestionResultIndex(null)} /> : <Button label="Question précédente" onClick={() => setQuestionResultIndex(questionResultIndex - 1)} />
                            }
                            {
                                questionResultIndex === questions.length - 1 ? <Button label="Résultats" onClick={() => setQuestionResultIndex(null)} /> : <Button label="Question suivante" onClick={() => setQuestionResultIndex(questionResultIndex + 1)} />
                            }
                        </div>
                    </div>
                </div>
            }
        </MiddleDiv>
    )
}

export default QuizFirstPage;
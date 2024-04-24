import { ICategory } from "@/models/category";
import { IQuiz } from "@/models/quiz";
import { useEffect, useState } from "react";
import MiddleDiv from "./middleDiv";
import InputText from "./inputText";
import Textarea from "./textarea";
import DropDown from "./dropDown";
import CheckText from "./checkText";
import Button from "./button";
import CenterContent from "./centerContent";
import MainContainer from "./mainContainer";
import { IQuestion } from "@/models/question";
import { CircleX } from "lucide-react";

interface QuizEditorProps {
    quiz: IQuiz | null;
    categories: ICategory[];
    onValidate: (quizEditor: IQuiz) => boolean;
}

const QuizEditor: React.FC<QuizEditorProps> = ({ quiz, categories, onValidate }) => {
    const [quizEdit, setQuizEdit] = useState<IQuiz | null>(quiz);
    const [isEditingQuiz, setIsEditingQuiz] = useState<boolean>(quiz === null)

    const editQuiz = (quiz: IQuiz): void => {
        setQuizEdit(quiz);
        setIsEditingQuiz(false);
    }

    const editQuestions = (quiz: IQuiz): void => {

    }

    return (
        isEditingQuiz || quizEdit === null ? 
            <QuizForm quiz={quizEdit} onSubmit={editQuiz} categories={categories} /> :
            <QuestionForm quiz={quizEdit} onSubmit={editQuestions} categories={categories} />
    )
}

interface QuizForm {
    quiz: IQuiz | null;
    onSubmit: (quiz: IQuiz) => void;
    categories: ICategory[];
}

const QuizForm: React.FC<QuizForm> = ({ quiz, onSubmit, categories }) => {
    const [title, setTitle] = useState<string>(quiz ? quiz.title : '');
    const [description, setDescription] = useState<string>(quiz ? quiz.description : '');
    const [categoryId, setCategoryId] = useState<number | null>(quiz ? quiz.categoryId : (categories.length > 0 ? categories[0].id : null));
    const [shuffleQuestion, setShuffleQuestion] = useState<boolean>(quiz ? quiz.shuffleQuestion : true);
    const [shuffleAnswer, setShuffleAnswer] = useState<boolean>(quiz ? quiz.shuffleAnswer : true);
    const [visibility, setVisibility] = useState<boolean>(quiz ? quiz.isVisible : true);

    const dropDownCategoriesOptions = categories.map((category: ICategory) => ({ value: '' + category.id, label: category.name }));

    const [error, setError] = useState<string | null>(null);

    const createQuiz = () => {
        if (title === '') {
            setError("Veuillez saisir un titre.")
            return
        }

        if (description === '') {
            setError("Veuillez saisir une description.")
            return
        }

        const quizCreated: IQuiz = {
            id: "dqdhgihguqidgh",
            title: title,
            description: description,
            categoryId: categoryId ?? 1,
            shuffleQuestion: shuffleQuestion,
            shuffleAnswer: shuffleAnswer,
            isVisible: visibility,
            questions: quiz ? quiz.questions : []
        }

        onSubmit(quizCreated)
    }

    useEffect(() => {
        setError(null);
    }, [title, description])

    return (
        <MiddleDiv title="Créer un quiz">
            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-3" style={{ width: '640px' }}>
                    <InputText label="Nom" type="text" value={title} placeholder="Nom du quiz" onChange={(e: any) => setTitle(e.target.value)} />
                    <Textarea label="Description" value={description} placeholder="Description du quiz" onChange={(e: any) => setDescription(e.target.value)} />
                </div>

                <div>
                    <DropDown label="Catégories" options={dropDownCategoriesOptions} defaultValue={categoryId + ''} onChange={(e: any) => setCategoryId(Number(e.target.value))} />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <p>Mélanger les questions</p>
                        <CheckText selected={{ value: "Aléatoire", borderColor: '#0CA4D8', backgroundColor: '#C4EFFE' }} notSelected={{ value: "Ordonnée", borderColor: '#E59830', backgroundColor: '#F5D3A5' }} isSelected={shuffleQuestion} onChange={() => setShuffleQuestion(!shuffleQuestion)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <p>Mélanger les réponses</p>
                        <CheckText selected={{ value: "Aléatoire", borderColor: '#0CA4D8', backgroundColor: '#C4EFFE' }} notSelected={{ value: "Ordonnée", borderColor: '#E59830', backgroundColor: '#F5D3A5' }} isSelected={shuffleAnswer} onChange={() => setShuffleAnswer(!shuffleAnswer)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <p>Visibilité du quiz</p>
                        <CheckText selected={{ value: "Publique", borderColor: '#4CDE5F', backgroundColor: '#CEFAD4' }} notSelected={{ value: "Privée", borderColor: '#6924EE', backgroundColor: '#E5D9FD' }} isSelected={visibility} onChange={() => setVisibility(!visibility)} />
                    </div>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div className="text-center">
                    <Button label="Créer le quiz" onClick={createQuiz} />
                </div>
            </div>
        </MiddleDiv>
    )
}

interface QuestionForm {
    quiz: IQuiz;
    onSubmit: (quiz: IQuiz) => void;
    categories: ICategory[];
}

const QuestionForm: React.FC<QuestionForm> = ({ quiz, onSubmit, categories }) => {
    const [quizEdited, setQuizEdited] = useState<IQuiz>({...quiz});
    const [questionSelected, setQuestionSelected] = useState<IQuestion | null>(null);

    const addQuestion = (question: IQuestion) => {
        const quizFun = {...quiz}
        const existedQuestion: IQuestion | undefined = quizFun.questions.find(q => q.id === question.id)

        // On met à jour une question
        if (existedQuestion) {
            const index: number = quizFun.questions.indexOf(existedQuestion)
            quizFun.questions[index] = question
        }
        // On ajoute une question
        else {
            quizFun.questions.push(question)
        }

        setQuizEdited(quizFun)
        setQuestionSelected(null)
    }

    const showQuestion = (index: number) => {
        if (quizEdited.questions.length > index)
            setQuestionSelected(quizEdited.questions[index])
    }

    return (
        <CenterContent centerY={true} width="w-9/12">
            <h1 className="text-xl">{quiz.title}</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '10px' }}>
                <div className={quizEdited.questions.length === 0 ? 'flex items-center justify-center' : ''}>
                    {
                        quizEdited.questions.length > 0 ?
                        quizEdited.questions.map((question: IQuestion, index: number) => (
                            <div className="flex flex-row justify-between py-3 px-2 cursor-pointer" onClick={() => showQuestion(index)}>
                                <p>Question n°{question.id}</p>
                                <p className="text-slate-400">{question.points} point{question.points > 1 ? 's' : ''}</p>
                            </div>
                        )):
                        <p>Aucune question enregistrée.</p>
                    }
                </div>
                <EditQuestion quiz={quizEdited} key={questionSelected ? questionSelected.id : -1} question={questionSelected} onSubmit={addQuestion} />
            </div>
        </CenterContent>
    )
}

interface EditQuestionProps {
    quiz: IQuiz;
    question: IQuestion | null;
    onSubmit: (question: IQuestion) => void;
}

const EditQuestion: React.FC<EditQuestionProps> = ({ quiz, question, onSubmit }) => {
    const [questionInput, setQuestionInput] = useState<string>(question ? question.question : '');
    const [answers, setAnswers] = useState<{ value: string, isCorrect: boolean }[]>(question ? question.answers : [{ value: '', isCorrect: true }])
    const [explanation, setExplanation] = useState<string>(question ? question.explanation : '');
    const [point, setPoint] = useState<number>(question ? question.points : 1);
    const [choiceTypeMultiple, setChoiceTypeMultiple] = useState<boolean>(question ? question.allowMultipleChoice : false);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null)
    }, [questionInput, answers, explanation, point, choiceTypeMultiple])

    const addAnswer = () => {
        setAnswers([...answers, { value: '', isCorrect: true }])
    }

    const modifyAnswerValue = (answerId: number, value: string) => {
        const copyAnswers = [...answers]
        copyAnswers[answerId].value = value
        setAnswers(copyAnswers)
    }

    const modifyAnswerState = (answerId: number, state: boolean) => {
        const copyAnswers = [...answers]
        copyAnswers[answerId].isCorrect = state
        setAnswers(copyAnswers)
    }

    const deleteAnswer = (answerId: number) => {
        const copyAnswers = [...answers]
        copyAnswers.splice(answerId, 1)
        setAnswers(copyAnswers)
    }

    const addQuestion = () => {
        if (questionInput === '') {
            setError("Veuillez saisir une question.")
            return
        }

        if (answers.length === 0) {
            setError("Veuillez saisir au moins une question.")
            return
        }

        if (answers.filter(a => a.value === '').length > 0) {
            setError("Veuillez saisir une valeur à toutes vos réponses.")
            return
        }

        if (answers.filter(a => a.isCorrect).length === 0) {
            setError("Veuillez saisir au moins une question correcte.")
            return
        }

        if (!choiceTypeMultiple && answers.filter(a => a.isCorrect).length > 1) {
            setError("Vous avez saisi plusieurs réponses correctes et un type de choix unique pour cette question.")
            return
        }

        if (explanation === '') {
            setError("Veuillez saisir une explication.")
            return
        }

        if (point <= 0) {
            setError("Veuillez saisir un nombre de point strictement positif.")
            return
        }

        const questionForm: IQuestion = {
            id: question ? question.id : (quiz.questions.length > 0 ? Math.max(...quiz.questions.map(q => q.id)) : 1),
            question: questionInput,
            image: null,
            answers: answers,
            allowMultipleChoice: choiceTypeMultiple,
            explanation: explanation,
            points: point
        }

        onSubmit(questionForm)

        setQuestionInput('')
        setAnswers([{ value: '', isCorrect: true }])
        setExplanation('')
        setPoint(1)
        setChoiceTypeMultiple(false)
    }

    return (
        <MainContainer>
            <div className="flex flex-col">
                <p className="mb-2">Question n°{question ? question.id : quiz.questions.length + 1}</p>
                
                <div>
                    <p className="mb-3">Titre</p>
                    <Textarea label="Question" value={questionInput} placeholder="Votre question..." onChange={(e: any) => setQuestionInput(e.target.value)} />
                    <hr className="m-4"/>
                </div>
                <div>
                    <p className="mb-3">Réponses</p>
                    <div className="flex flex-col gap-4">
                        {
                            answers.length > 0 ?
                            answers.map((a, index: number) => (
                                <div className="flex flex-row gap-6 items-center">
                                    <div className="flex flex-row gap-2 items-center">
                                        <CircleX onClick={() => deleteAnswer(index)} className="cursor-pointer" />
                                        <InputText label={"Réponse n°" + (index + 1)} type="text" value={a.value} onChange={(e: any) => modifyAnswerValue(index, e.target.value)} />
                                    </div>
                                    <div>
                                        <CheckText selected={{ value: 'correct', borderColor: '#4CDE5F', backgroundColor: '#CEFAD4' }} notSelected={{ value: 'incorrect', borderColor: '#DA3838', backgroundColor: '#FFC7C7' }} isSelected={a.isCorrect} onChange={() => modifyAnswerState(index, !a.isCorrect)} />
                                    </div>
                                </div>
                            )) : <p className="text-slate-400">Aucune réponse n'a été enregistrée.</p>
                        }
                    </div>
                    <div className="mt-3">
                        <button className="py-1 px-4 rounded-lg border border-dashed border-blue-500 hover:bg-[#F4F7FB]" onClick={addAnswer}>Ajouter une réponse</button>
                    </div>
                    <hr className="m-4"/>
                </div>
                <div>
                    <p className="mb-3">Paramétrage</p>
                    <div className="flex flex-row justify-between gap-4 items-start">
                        <Textarea label="Explication" value={explanation} placeholder="L'explication de la correction" onChange={(e: any) => setExplanation(e.target.value)} />
                        <InputText label="Points" type="number" value={point + ''} placeholder="Nombre de point" onChange={(e: any) => setPoint(Number(e.target.value))} />
                        <div className="flex items-center gap-2">
                            <p>Type de choix</p>
                            <CheckText selected={{ value: 'multiple', borderColor: '', backgroundColor: '' }} notSelected={{ value: 'unique', borderColor: '', backgroundColor: '' }} isSelected={choiceTypeMultiple} onChange={() => setChoiceTypeMultiple(!choiceTypeMultiple)} />
                        </div>
                    </div>
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                <div className="mt-4 text-center">
                    <Button label={question ? "Modifier la question" : "Créer la question"} onClick={addQuestion} />
                </div>
            </div>
        </MainContainer>
    )
}

export default QuizEditor;
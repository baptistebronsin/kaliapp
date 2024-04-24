"use client";
import Button from "@/components/button";
import InputText from "@/components/inputText";
import MiddleDiv from "@/components/middleDiv";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FindQuiz() {
    const [quizId, setQuizId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        setError(null);
    }, [quizId])

    const findQuiz = async () => {
        if (!quizId) {
            setError('Veuillez entrer un identifiant.');
            return;
        }

        router.push('/find-quiz/' + quizId)
    }

    return (
        <MiddleDiv>
            <h1>Accédez à un quiz depuis son identifiant</h1>
            <div style={{ height: '30px' }}></div>
            <div className="flex flex-col gap-4">
                <InputText label="Identifiant" type="text" value={quizId} placeholder="Identifiant du quiz" onChange={(e) => setQuizId(e.target.value)} />
                {error && <div className="text-red-500 text-center">{error}</div>}
                <div className="text-center">
                    <Button label="Rechercher" onClick={findQuiz} />
                </div>
            </div>
        </MiddleDiv>
    )
}
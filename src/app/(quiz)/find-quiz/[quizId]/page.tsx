export default function FindQuizById({ params }: { params: { quizId: string } }) {
    return (
        <div>
            <h1>FindQuizById : {params.quizId}</h1>
        </div>
    )
}
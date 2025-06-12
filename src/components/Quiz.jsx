import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    // if the initial state is an empty array (0), so the activeQuestionIndex will be 0
    // so it will be the first question which we wanna show to the user
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(
        selectedAnswer
    ) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    },
    []);

    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer]
    );

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy icon" />
                <h2>Quiz completed!</h2>
            </div>
        );
    }

    const shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffleAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffleAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

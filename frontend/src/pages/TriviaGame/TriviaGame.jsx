import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { updateRobotCurrency } from "../../services/robot";

import './TriviaGame.css'

export function TriviaGame() {
    const { level } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const robotId = queryParams.get("robotId");
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [showAnswers, setShowAnswers] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [questionNum, setQuestionNum] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [moneyEarned, setMoneyEarned] = useState(0);
    const navigate = useNavigate()
    

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://opentdb.com/api.php?amount=20&difficulty=${level}&type=multiple`
                );
                const data = await response.json();
                if (data.results) {
                    setQuestions(data.results);
                } else {
                    setError("No questions available.");
                }
            } catch (err) {
                setError("Error fetching trivia questions.");
                console.error("Error fetching trivia questions:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [level]);

    useEffect(() => {
        if (gameOver) {
            const cash = calculateCash(level, score);
            setMoneyEarned(cash)
            
            const updateCurrency = async () => {
                try {
                    const response = await updateRobotCurrency(robotId, cash);
                    
                    if(response.message === 'robot currency updated'){
                        navigate('/gameselection', {state: {robotId: robotId}})
                    }
                } catch (error) {
                    console.error("Error updating currency:", error);
                }
            };

            const timer = setTimeout(() => {
                updateCurrency();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [gameOver]);

    useEffect(() => {
        if (currentQuestionIndex >= questions.length && questions.length > 0) {
            setGameOver(true);
        }
    }, [currentQuestionIndex, questions.length]);

    const calculateCash = (level, score) => {
        if (level === "easy") {
            return score * 5
        } else if (level === "medium") {
            return score * 10
        } else {
            return score * 15
        }
    };

    const handleAnswerSelect = (selectedAnswer) => {
        setUserAnswer(selectedAnswer);
        setShowAnswers(true);

        if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer("");
            setQuestionNum(questionNum + 1);
            setShowAnswers(false);
        }, 2000);
    };

    if (loading) {
        return <div>Loading questions...</div>;
    }

    if (error || questions.length === 0) {
        return <div>{error || "No questions available."}</div>;
    }

    if (gameOver) {
        return (
            <div id="trivia-game-over">
                <div id="trivia-game-over-container">
                <h1>Game Over!</h1>
                <p>Your final score: {score} points</p>
                <p>You will receive ${moneyEarned}</p>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        return <div>Loading next question...</div>;
    }

    const allAnswers = ([
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
    ]).sort();

    return (
        <div id="trivia-game">
            <div id="trivia-game-question-container">
            <h1>Trivia Game - {level} Level</h1>
            <p id="trivia-score">Your Score: {score}</p>
            <h2>Question: {questionNum}</h2>
            <h3>Category: {decodeHtmlEntities(currentQuestion.category)}</h3>
            <p id="question">{decodeHtmlEntities(currentQuestion.question)}</p>
            <ul>
                {allAnswers.map((answer, index) => {
                    const isCorrect = answer === currentQuestion.correct_answer;
                    const isSelected = answer === userAnswer;
                    const buttonClass = showAnswers
                        ? isCorrect
                            ? "correct"
                            : isSelected
                            ? "wrong"
                            : ""
                        : "";

                    return (
                        <li key={index}>
                            <button
                                className={buttonClass}
                                onClick={() => handleAnswerSelect(answer)}
                                disabled={showAnswers}
                            >
                                {decodeHtmlEntities(answer)}
                            </button>
                        </li>
                    );
                })}
            </ul>
            </div>
        </div>
    );
}

function decodeHtmlEntities(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.documentElement.textContent;
}

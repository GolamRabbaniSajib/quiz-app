import { useState, useEffect } from "react";
import { saveScore } from "../../utils/indexedDB";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [quizEnded, setQuizEnded] = useState(false);

  // fetching data from json
  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        const allQuestions = [...data.multipleChoice, ...data.integerType];
        setQuestions(allQuestions);
      })
      .catch((error) => console.error("Error loading quiz data:", error));
  }, []);

  // set timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      handleNext();
    }
  }, [timer]);

  // for multipleChoice question ans
  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    if (option === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Incorrect!");
    }
  };

  // for integer question ans
  const handleIntegerAnswerSubmit = () => {
    if (userInput.trim() === "") return;
    setSelectedAnswer(userInput);
    if (parseInt(userInput) === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Incorrect!");
    }
  };

  // for next button
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setUserInput("");
      setFeedback("");
      setTimer(30);
    } else {
      setQuizEnded(true);
      // save info indexedDB
      saveScore(score, questions.length, new Date().toLocaleString());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* check question ans is complete */}
      {!quizEnded ? (
        questions.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">
              Question {currentQuestion + 1} / {questions.length}
            </h2>
            <p className="mb-2">{questions[currentQuestion].question}</p>
            <div className="mb-4">
              {/* check options multiple or integer */}
              {questions[currentQuestion].options ? (
                // Multiple Choice
                questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`block w-full p-2 mb-2 rounded ${
                      selectedAnswer === option
                        ? option === questions[currentQuestion].answer
                          ? "bg-green-400"
                          : "bg-red-400"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white`}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer}
                  >
                    {option}
                  </button>
                ))
              ) : (
                // Integer Type
                <div>
                  <input
                    type="number"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="p-2 border rounded-md w-full"
                    placeholder="Enter your answer"
                    disabled={selectedAnswer}
                  />
                  <button
                    onClick={handleIntegerAnswerSubmit}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    disabled={selectedAnswer || userInput.trim() === ""}
                  >
                    Submit Answer
                  </button>
                </div>
              )}
            </div>
            {feedback && <p className="text-lg font-semibold">{feedback}</p>}
            <p className="text-sm text-gray-600">Time Left: {timer} sec</p>
            <button
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50 w-full"
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        )
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
          <h2 className="text-xl font-bold mb-4">Quiz Completed!</h2>
          <p className="mb-4">
            Your Score: {score} / {questions.length}
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
            <Link to={"/"}>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Go Home
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;

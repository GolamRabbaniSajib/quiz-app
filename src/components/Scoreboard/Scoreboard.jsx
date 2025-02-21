import { useState, useEffect } from "react";
import { getScores } from "../../utils/indexedDB";
import { Link } from "react-router-dom";

const Scoreboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const data = await getScores();
      setScores(data);
    };
    fetchScores();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Scoreboard</h2>
      {scores.length > 0 ? (
        <ul className="bg-white p-4 shadow-lg rounded-lg w-full max-w-xl">
          {scores.map((attempt, index) => (
            <li
              key={index}
              className="border-b py-2 flex justify-between items-center"
            >
              <span>
                🏆 Score: {attempt.score} / {attempt.totalQuestions}
              </span>
              <span className="text-sm text-gray-500">{attempt.timestamp}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-700">
          No quiz history yet! Try a quiz first. 😊
        </p>
      )}
      <Link to="/">
        <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default Scoreboard;

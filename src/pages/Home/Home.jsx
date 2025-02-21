import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome to the Quiz App!
      </h1>
      <p className="text-lg mb-6 text-center">
        Test your knowledge.
      </p>

      <div className="flex justify-center items-center gap-4">
        <Link to="/quiz">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Start Quiz
          </button>
        </Link>
        <Link to="/scoreboard">
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
            View Scoreboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Quiz from "../components/Quiz/Quiz";
import Scoreboard from "../components/Scoreboard/Scoreboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: '/quiz',
    element: <Quiz></Quiz>
  },
  {
    path: '/scoreboard',
    element: <Scoreboard></Scoreboard>
  }
]);

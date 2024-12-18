import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import CreateRobot from "./pages/CreateRobot/CreateRobot";
import Blackjack from "./pages/BlackJack/BlackJack";
import RobotBoltGameRules from "./pages/BoltGame/RobotBoltGameRules";
import VirusSweeperPage from "./pages/VirusSweeper/VirusSweeperPage"
import BWAM from "./pages/BatteryWiresAndMotherboard/BWAM";
import NutzAndBoltz from "./pages/NutzAndBoltz/NutzAndBoltz";
import {GameSelection} from "./pages/GameSelection/GameSelectionPage"
import {TriviaGamePage} from "./pages/TriviaGame/TriviaGamePage"
import {TriviaGame} from "./pages/TriviaGame/TriviaGame"
import SnakeGamePage from "./pages/SnakeGame/SnakeGamePage"
import ProtectedRoute from "./components/ProtectedRoute";

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/landingpage",
    element: (
      <ProtectedRoute>
        <LandingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/createrobot",
    element: (
      <ProtectedRoute>
        <CreateRobot />
      </ProtectedRoute>
  )
  },
  {
    path: "/blackjack",
    element: (
      <ProtectedRoute>
        <Blackjack />
    </ProtectedRoute>
    )
    ,
  },
  {
    path: "/boltgame",
    element: (
      <ProtectedRoute>
        <RobotBoltGameRules />
      </ProtectedRoute>
    )
  },
  {
    path: "/virussweeper",
    element: (
      <ProtectedRoute>
        <VirusSweeperPage />
      </ProtectedRoute>
  )
  },
  {
    path: "/bwam",
    element: (
      <ProtectedRoute>
        <BWAM />
      </ProtectedRoute>
    )
  },
  {
    path: "/nab",
    element: (
      <ProtectedRoute>
        <NutzAndBoltz />
      </ProtectedRoute>
    )
  },
  {
    path: "/gameselection",
    element: (
      <ProtectedRoute>
        <GameSelection />
      </ProtectedRoute>
    )
  },
  {
    path: "/triviagame",
    element: (
      <ProtectedRoute>
        <TriviaGamePage />
      </ProtectedRoute>
    )
  },
  {
    path: "/triviagame/:level",
    element: (
      <ProtectedRoute>
        <TriviaGame />
      </ProtectedRoute>
    )
  },
  {
    path: "/snakegame",
    element: (
      <ProtectedRoute>
        <SnakeGamePage />
      </ProtectedRoute>
    )
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import CreateRobot from "./pages/CreateRobot/CreateRobot";
import Blackjack from "./pages/BlackJack/BlackJack";

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
    element: <LandingPage />,
  },
  {
    path: "/createrobot",
    element: <CreateRobot />
  },
  {
    path: "/blackjack",
    element: <Blackjack />,
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

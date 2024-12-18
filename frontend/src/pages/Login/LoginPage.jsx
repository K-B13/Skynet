import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions";
import { getRobotByUserId } from "../../services/robot";
import { changeStatsOnLogin } from "../../services/robot";

import { login } from "../../services/authentication";
import "./LoginPage.css"
export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('')
  const navigate = useNavigate();
  const location = useLocation()
  const { message } = location.state || '';
  const [lastLoginDate, setLastLoginDate] = useState('')
    const currentDate = new Date();


    const fetchRobot = async() => {
        const token = localStorage.getItem("token");
        const user = getPayloadFromToken(token);
        try {
            const robot = await getRobotByUserId(user.userId);
            if (robot.robot === null ){
                navigate("/createRobot");
            } else if(robot.message === "Fetched robot by user Id") {
                if (!lastLoginDate) {
                    setLastLoginDate(robot.robot.lastLogin);
                    console.log("Last login: ", robot.robot.lastLogin);
                    console.log("New login: ", currentDate.toISOString());
                }
                await changeStatsOnLogin(robot.robot._id, lastLoginDate, currentDate)
                navigate("/landingpage");
            }
        } catch (err) {
            console.error("error fetching user robot", err);
        }
    }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
        const token = await login(email, password);
        if (token.message) {
          setErrorMessage('Email or Password is incorrect')
        } else {
          localStorage.setItem("token", token);
          fetchRobot();
        }
    } catch (err) {
      console.err(err)
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <div id="login-page">
      <h2>Login</h2>
      <img id="dancing-robot" alt="Dancing Robot" src="/dancingRobot.gif"/>
      {message && <p>{message}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          />
          <div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>
        <a href="/signup" id="no-account">
          Dont Have an Account
        </a>
        </p>
        </div>
    );
  }
  
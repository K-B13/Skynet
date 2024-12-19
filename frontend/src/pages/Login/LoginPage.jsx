import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions";
import { getRobotByUserId } from "../../services/robot";
import { changeStatsOnLogin, updateLastLogin } from "../../services/robot";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { login } from "../../services/authentication";
import "./LoginPage.css"
export function LoginPage() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('')
  const navigate = useNavigate();
  const location = useLocation()
  let { message } = location.state || '';
  const [ lastLoginDate, setLastLoginDate ] = useState('')
  const currentDate = new Date();
  const [ robotId, setRobotId ] = useState('')


    const fetchRobot = async() => {
        const token = localStorage.getItem("token");
        const user = getPayloadFromToken(token);
        try {
            const robot = await getRobotByUserId(user.userId);
            if (robot.robot === null ){
                navigate("/createRobot", {state: {allowAccess: true}});
              } else if(robot.message === "Fetched robot by user Id") {
                if (!lastLoginDate) {
                    setLastLoginDate(robot.robot.lastLogin);
                    setRobotId(robot.robot._id)
                }
                await changeStatsOnLogin(robot.robot._id, robot.robot.lastLogin, currentDate)
                navigate("/landingpage");
              }
        } catch (err) {
            console.error("error fetching user robot", err);
        }
    }
    useEffect(() => {
      const updateLogin = async () => {
          if (lastLoginDate) {
              try {
                  await updateLastLogin(robotId, currentDate);
                  console.log("Last login updated successfully.");
              } catch (err) {
                  console.error("Error updating last login:", err);
              }
          }
      };

      updateLogin();
  }, [lastLoginDate]);

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
      <h2
        id='login-title'
      >Login</h2>
      <img id="dancing-robot" alt="Dancing Robot" src="/dancingRobot.gif"/>
      <div id='login-message-display-container'>
        {
          (errorMessage || message) && <div id='login-message-display'>
            {
              message && !errorMessage && 
              <p id='login-message'>{message}</p>
            }
            {
              errorMessage && 
              <p id='login-errors'>{errorMessage}</p>
            }
          </div>
        }
      </div>
      <form 
        id='login-form'
        onSubmit={handleSubmit}
      >
        <div id='login-email-container'>
          <label 
            id='login-email-label'
            htmlFor="email"></label>
          <input
            id="email"
            className="login-email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
          <div id='login-password-container'>
            <input
              id="password"
              className="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
            {
              showPassword ? 
                <IoEyeOff 
                  id='login-hide'
                  type='text' 
                  onClick={togglePasswordVisibility} 
                /> : 
                <IoEye 
                  id='login-reveal'
                  type='text' 
                  onClick={togglePasswordVisibility} 
                />
              }
          </div>
          <button 
            id='login-submit'
            type="submit"
          >
            Submit
          </button>
          <a href="/signup" id="no-account">
          Don<span id='login-apostrophe'>&#39;</span>t Have an Account
          </a>
        </form>
      </div>
    );
  }
  
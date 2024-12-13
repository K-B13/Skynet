import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions";
import { getRobotByUserId } from "../../services/robot";
import { changeStatsOnLogin } from "../../services/robot";

import { login } from "../../services/authentication";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();



    const fetchRobot = async() => {
        const token = localStorage.getItem("token");
        const user = getPayloadFromToken(token);
        try {
            const robot = await getRobotByUserId(user.userId);
            if (robot.robot === null ){
                navigate("/createRobot");
            } else {
              await changeStatsOnLogin(robot.robot._id)
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
        localStorage.setItem("token", token);
        fetchRobot();
    } catch (err) {
      console.error(err);
      navigate("/login");
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
    <div>
      <h2>Login</h2>
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
        <a href="/signup">
          Dont Have an Account
        </a>
        </p>
        </div>
    );
  }
  
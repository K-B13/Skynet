import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ showErrors, setShowErrors ] = useState({})
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await signup(email, password);
      console.log(response)
      if (!response || response.message){
        navigate("/login", {
          state: {
            message: response ? response.message: 'You have successfully signed up'
          }
      })}
      setShowErrors(response)
    } catch (err) {
      console.error(err);
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
      <h2>Sign Up</h2>
      {
        showErrors.message &&
        <p>{showErrors.message}</p>
      }
      {
        showErrors.passwordErrors &&
        showErrors.passwordErrors.map((passwordError, index) => {
          return <p key={index} >{passwordError}</p>
        })
      }
      {
        showErrors.emailErrors &&
        showErrors.emailErrors.map((emailError, index) => {
          return <p key={index} >{emailError}</p>
        })
      }
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
        <div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
        >
          Submit
        </button>
      </form>
      <p>
        <a href="/login">
          Already Have Account
        </a>
      </p>
    </div>
  );
}
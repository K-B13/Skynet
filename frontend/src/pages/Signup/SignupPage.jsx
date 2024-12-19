import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";
import "./SignupPage.css"
import Criteria from "../../components/Signup/Criteria";
import { IoEye, IoEyeOff } from "react-icons/io5";

export function SignupPage() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showErrors, setShowErrors ] = useState({
    emailErrors: [],
    passwordErrors: []
  })
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await signup(email, password);
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
    <div id="signup">
      <h2
      id='signup-title'
      >Sign Up</h2>
      <Criteria emailErrors={showErrors.emailErrors} passwordErrors={showErrors.passwordErrors}/>
      <form 
        id='signup-form'
        onSubmit={handleSubmit}>
        <div id='signup-email-container'>
          <input
            id="email"
            className="signup-email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
        <div id='signup-password-container'>
          <input
            id="password"
            className="signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
            {
              showPassword ? 
                <IoEyeOff 
                  id='signup-hide'
                  type='text' 
                  onClick={togglePasswordVisibility} 
                /> : 
                <IoEye 
                  id='signup-reveal'
                  type='text' 
                  onClick={togglePasswordVisibility} 
                />
              }
        </div>
        <button
          id='signup-submit'
          type="submit"
        >
          Submit
        </button>
        <a href="/login" id="have-account">
          Already Have an Account
        </a>
      </form>
    </div>
  );
}
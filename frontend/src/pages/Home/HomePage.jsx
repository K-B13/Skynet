import { Link } from "react-router-dom";

import "./HomePage.css";

export function HomePage() {
  return (
    <div id="home">
      <div id="sign-in-box">
      <h1>Welcome to Skynet!</h1>
      <div id='home-container'>
        <Link to="/login"><button id="login-button">Log in</button></Link>
        <Link to="/signup"><button id="sign-up-button">Sign Up</button></Link>        
      </div>
      </div>
    </div>
  );
}

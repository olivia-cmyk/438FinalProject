import './App.css';
import {useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function loginUser(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signed in
      navigate("/"); //home
      document.querySelector(".error-message").innerText="";
    })
    .catch((error) => {
      document.querySelector(".error-message").innerText=error;
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  return (
    <div className="formdiv">
    <form className="user-form">
      <h2>Log in</h2>
      <br/>
      <label htmlFor="email">Email: </label>
      <input value={email}
        type="email" id="email" name="email"
        onChange={(e) => setEmail(e.target.value)}/>
      <label htmlFor="password">Password: </label>
      <input value={password}
        type="password" id="password" name="password"
        onChange={(e) => setPassword(e.target.value)}/>
      <button type="submit" onClick={loginUser}>Log in</button>
      <p>New user? Sign up <Link to="/signup">here</Link></p>
      <p className="error-message"></p>
    </form>
  </div>
  );
}

export default Login;
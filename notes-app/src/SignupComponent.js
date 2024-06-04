import './App.css';
import {useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from "./firebase";


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    function signUpUser (e) {
      e.preventDefault(); //prevents default (refresh page)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //Signed up
          document.querySelector(".error-message").innerText="";
          navigate("/login");
        })
        .catch((error) => {
          document.querySelector(".error-message").innerText=error;
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
        })
    }
  
    return (
    <div className="formdiv">
      <form className="user-form">
        <h2>Sign up</h2>
        <br/>
        <label htmlFor="email">Email: </label>
        <input value={email}
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="password">Password: </label>
        <input value={password}
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" onClick={signUpUser}>Sign up</button>
        <p>Already have an account? Login <Link to="/login">here</Link></p>
        <p className="error-message"></p>
      </form>
    </div>
    );
  }

export default Signup;

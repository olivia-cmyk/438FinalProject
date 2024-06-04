import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Signup from './SignupComponent';
import Home from './HomeComponent';
import Login from './LoginComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;

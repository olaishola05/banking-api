import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';


function App() {
  const isLoggedIn = localStorage.getItem("token");
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element=<Signup /> />
          <Route path="/login" element=<Login /> />

          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
            </>
          ) : <Route path="/login" element={<Login />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

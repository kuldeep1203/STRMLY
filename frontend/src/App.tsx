import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from  "./pages/Profile"
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1 className="glossy-heading">Welcome to Strmly</h1>
      <div className="button-container">
        <button className="glossy-button" onClick={() => navigate("/Signin")}>
          Sign In
        </button>
        <button className="glossy-button" onClick={() => navigate("/Signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Signin" element={<Signin/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path ="/Profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

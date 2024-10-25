import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import HomePage from "./pages/homePage";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<LandingPage />} /> */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;

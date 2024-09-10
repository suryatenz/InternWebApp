import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Forgotlayout from "./pages/forgotlayout";
import Layout from "./pages/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Signupage25g from "./components/Signupage25g";
import SignupLastpage from "./components/SignupLastpage";
import ResetComplete from "./components/ResetComplete";
import Signuppage25less from "./components/Signuppage25less";
import SignupLayout from "./pages/SignupLayout";
import Conformation from "./pages/Conformation";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword/*" element={<Forgotlayout />} />
        <Route path="/signupValidate/*" element={<SignupLayout />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signup25l" element={<Signuppage25less/>}/>
        <Route path="/signupg" element={<Signupage25g />} />
        <Route path="/signuplast" element={<SignupLastpage/>}/>
        <Route path="/resetComplete" element={<ResetComplete />} />
        <Route path="/conformation" element={<Conformation/>}/>
        <Route path="/search/*" element={<Layout />} />
       
      </Routes>
    </Router>
  );
}
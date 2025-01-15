import { Routes, Route } from "react-router-dom";
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Start from "./pages/Start";
import Home from "./pages/Home";
import Wrapper from "./pages/Wrapper";
import UserLogout from "./pages/UserLogout"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Wrapper><Home/></Wrapper>} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/logout" element={<Wrapper><UserLogout/></Wrapper>} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    </>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";

import Start from "./pages/Start";

import UserHome from "./pages/UserHome";
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserLogout from "./pages/UserLogout";
import UserWrapper from "./pages/UserWrapper";

import CaptainHome from './pages/CaptainHome';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import CaptainLogout from './pages/CaptainLogout';
import CaptainWrapper from './pages/CaptainWrapper';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/home" element={<UserWrapper><UserHome/></UserWrapper>} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/logout" element={<UserWrapper><UserLogout/></UserWrapper>} />

        <Route path="/captain-home" element={<CaptainWrapper><CaptainHome/></CaptainWrapper>} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-logout" element={<CaptainWrapper><CaptainLogout/></CaptainWrapper>} />
      </Routes>
    </>
  );
};

export default App;

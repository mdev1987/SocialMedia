import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(state => state.auth.authData);

  return (
    <div className="App">
      <div style={{ top: '-18%', right: '0' }} className="blur"></div>
      <div style={{ top: '36%', left: '-8rem' }} className="blur"></div>
      <Routes>      
        <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

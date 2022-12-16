import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logOut } from "./reducers/authReducer";
import Chat from "./pages/Chat/Chat";

function App() {
  const { authData, errorMessage } = useSelector(state => state.auth);
  const { errorMessage: postErrorMessage } = useSelector(state => state.post);
  // const { errorMessage: userErrorMessage } = useSelector(state => state.user)
  const { errorMessage: chatErrorMessage } = useSelector(state => state.chat);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (errorMessage === '401'
      || postErrorMessage === '401'
      // || userErrorMessage === '401'
      || chatErrorMessage === '401') {
      dispatch(logOut());
      navigate('/auth')
    }
  }, [errorMessage,
    postErrorMessage,
    // userErrorMessage,
    chatErrorMessage])
  return (
    <div className="App">
      <div style={{ top: '-18%', right: '0' }} className="blur"></div>
      <div style={{ top: '36%', left: '-8rem' }} className="blur"></div>
      <Routes>
        <Route path="/auth" element={authData ? <Navigate to="/" /> : <Auth />} />
        <Route path="/profile/:id" element={authData ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="/chat" element={authData ? <Chat /> : <Navigate to="/auth" />} />
        <Route path="/" element={authData ? <Home /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

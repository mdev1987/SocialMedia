import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import store from './store';
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">

        <div style={{ top: '-18%', right: '0' }} className="blur"></div>
        <div style={{ top: '36%', left: '-8rem' }} className="blur"></div>
        {/* <Home/> */}
        {/* <Profile/> */}
        <Auth />
        <ToastContainer position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          transition={Slide}
          theme="colored" />
      </div>
    </Provider>
  );
}

export default App;

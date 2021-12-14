import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from 'react'
import { AuthContext } from "./contexts/userAuth"
import Routes from "routes"
import Admin from "layouts/Admin";



function App() {
  const { user } = useContext(AuthContext)

  return (
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        {user ? <Admin /> : <Routes />}
      </BrowserRouter>
  );
}

export default App;

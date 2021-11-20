import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/userAuth";
import { ToastContainer } from 'react-toastify';
import Admin from 'layouts/Admin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Admin />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

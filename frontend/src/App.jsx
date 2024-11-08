import { ToastContainer } from "react-toastify"
import { Outlet } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/common/Footer";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Navbar from "./components/common/Navbar";

function App() {

  return (
    <div>
      <Navbar/>
      
      <ToastContainer/>
      <main>
        <Outlet/>
      </main>
      
      <PrivateRoute>
        <Footer/>
      </PrivateRoute>
    </div>
  )
}

export default App

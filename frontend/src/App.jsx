import { ToastContainer } from "react-toastify"
import { Outlet } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div>
      <ToastContainer/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default App

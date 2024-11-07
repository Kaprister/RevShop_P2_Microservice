import { ToastContainer } from "react-toastify"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <main>
        <Outlet/>
      </main>
      <ToastContainer/>
    </>
  )
}

export default App

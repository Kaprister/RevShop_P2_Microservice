import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './store/store.js'
import PrivateRoute from './components/Auth/PrivateRoute.jsx'
import Home from './pages/Home.jsx'
import OpenRoute from './components/Auth/OpenRoute.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'




const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children:[
      {
        path : "/",
        element: (
          // <OpenRoute>
            <Home/>
          // </OpenRoute>
        )
      },
      {
        path : "/login",
        element: (
          <OpenRoute>
            <Login/>
          </OpenRoute>
        )
      },
      {
        path : "/signup",
        element: (
          <OpenRoute>
            <Signup/>
          </OpenRoute>
        )
      },
      {
        path : "/admin",
        element : (
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        )
      },
    ]
  }
]);





createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
)

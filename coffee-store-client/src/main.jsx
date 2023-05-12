import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import AddCoffee from './components/AddCoffee/AddCoffee'
import UpdateCoffee from './components/UpdateCoffee/UpdateCoffee'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    loader: () => fetch('http://localhost:5000/coffee')
  },
  {
    path: '/addCoffee',
    element: <AddCoffee></AddCoffee>
  },
  {
    path: '/updateCoffee/:id',
    element: <UpdateCoffee></UpdateCoffee>,
    loader: ({params}) => fetch(`http://localhost:5000/coffee/${params.id}`)
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)

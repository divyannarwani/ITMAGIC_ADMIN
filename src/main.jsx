import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import {Clients, Logo, Products, ClientCategory, Popup} from './Pages'
import Form from './components/Form.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='' element={<Sidebar />}>
        <Route path='/' element={<Logo />} />
        <Route path='/Products' element={<Products />} />
        <Route path='/Client-category' element={<ClientCategory />} />
        <Route path='/Clients' element={<Clients />} />
        <Route path='/Popup' element={<Popup />} />
      </Route>

      <Route path='/testing' element={<Form />}></Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

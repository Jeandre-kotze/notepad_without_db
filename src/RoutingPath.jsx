
import ErrorPage from "./components/ErrorPage.jsx";
import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
const App = lazy(() => import("./components/App.jsx")) //Lazy loading, App doesnt need to be loaded so early

export default function RoutingPath() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} errorElement={<errorElement/>}></Route>
        <Route path='/login' element={<Login />} errorElement={<errorElement/>}></Route>
        <Route path='/register' element={<Register />} errorElement={<errorElement/>}></Route>
        <Route path='/notepad' element={<App />} errorElement={<errorElement/>}></Route>
      </Routes>
  </BrowserRouter>)}

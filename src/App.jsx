import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Pages
import LoginPage from './pages/Login/LoginPage.jsx';
import TestPage from './pages/test/test.jsx';
import RegisterPage from './pages/Register/Register.jsx';
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";

// TODO: Implement private routes for the pages that require authentication
// TODO: Implement a Home page in order to test layouts with the Layout component and develop the navigation


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage.jsx';
import TestPage from './pages/test/test.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
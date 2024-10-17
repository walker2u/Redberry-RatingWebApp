import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Header from './pages/Header.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className='h-screen flex flex-col'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

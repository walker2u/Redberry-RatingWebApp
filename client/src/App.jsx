import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Header from './pages/Header.jsx'
import UploadImage from './pages/UploadImage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className='h-screen flex flex-col'>
        <Header />
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="upload" element={<UploadImage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

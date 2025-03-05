import { useEffect } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/Home'
import SignupPage from './pages/Signup'
import Pages from './pages/Pages'
import PrivateRoute from './middleware/PrivateRoute'
function App() {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      navigate('/pages')
    }
  },[])
  
  return(
      <>
        <Routes>
          <Route path={"/"} element={<HomePage/>}/>
          <Route path={"/signup"} element={<SignupPage/>}/>
          <Route path='/pages/*' element={
            <PrivateRoute>
              <Pages/>
            </PrivateRoute>
          }/>
        </Routes>
      </>
  )
}

export default App

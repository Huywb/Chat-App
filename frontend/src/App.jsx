
import './App.css'
import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {

  return (
    <Box display='flex' justifyContent='center'>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/settings' element={<SettingsPage></SettingsPage>}></Route>
          <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>
        </Routes>
    </Box>
  )
}

export default App

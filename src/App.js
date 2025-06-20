import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import JoinMembership from './pages/JoinMembership'
import Login from './pages/Login'
import Place from './pages/Place'
import ClassReservation from './pages/ClassReservation'
import Rental from './pages/Rental'
import Announcement from './pages/Announcement'
import Mypage from './pages/Mypage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/joinMembership' element={<JoinMembership/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place' element={<Place/>} />
        <Route path='/classReservation' element={<ClassReservation/>} />
        <Route path='/rental' element={<Rental/>} />
        <Route path='/announcement' element={<Announcement/>} />
        <Route path='/mypage' element={<Mypage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

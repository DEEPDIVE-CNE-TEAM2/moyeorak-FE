import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import JoinMembership from './pages/JoinMembership'
import Login from './pages/Login'
import Place from './pages/Place'
import ClassReservation from './pages/ClassReservation'
import Rental from './pages/Rental'
import Announcement from './pages/Announcement'
import Classes from './pages/Mypage/Classes'
import Profile from './pages/Mypage/Profile/Profile'
import Rentals from './pages/Mypage/Rentals'
import ChangePassword from './pages/Mypage/Profile/ChangePassword'
import ChangePhoneNumber from './pages/Mypage/Profile/ChangePhoneNumber'
import WithdrawAccount from './pages/Mypage/Profile/WithdrawAccount'

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
        <Route path='/mypage/classes' element={<Classes/>} />
        <Route path='/mypage/profile' element={<Profile/>} />
        <Route path='/mypage/rentals' element={<Rentals/>} />
        <Route path='/mypage/profile/password' element={<ChangePassword />} />
        <Route path='/mypage/profile/phone' element={<ChangePhoneNumber />} />
        <Route path='/mypage/profile/withdraw' element={<WithdrawAccount />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

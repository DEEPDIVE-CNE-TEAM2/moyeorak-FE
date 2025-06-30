import React from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx';
import Card from './card/Card.jsx'
import testimg from '../../img/testimg.jpg'

const ClassReservation = () => {
  return (
     <>
     <Navbar/>
     <Card
      imageUrl={testimg}
      title="풋살장 예약"
      details={['성인', '2025.07.01~07.10', '2025.07.15~08.31', '무료']}
      />

     </>
  )
}

export default ClassReservation
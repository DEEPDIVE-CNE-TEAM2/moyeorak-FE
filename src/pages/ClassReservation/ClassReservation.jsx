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
      title="마포보건소 심폐소생술 교육"
      details={['2025.07.01~2025.07.10', '2025.07.15~2025.08.31', '관내 36,200 / 관외 40,000','제한없음']}
      />

     </>
  )
}

export default ClassReservation
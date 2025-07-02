import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar.jsx';
import SelectPanel from './SelectPanel/SelectPanel.jsx';
import Card from './card/Card.jsx';
import styles from './ClassReservation.module.css';
import testimg from '../../../img/testimg.jpg'; // 더미 이미지

const ClassReservation = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // 나중에 axios로 백엔드 데이터 받아오기
    const dummy = [
      {
        id: 1,
        imageUrl: testimg,
        title: '마포보건소 심폐소생술 교육',
        details: ['2025.07.01~2025.07.10', '2025.07.15~2025.08.31', '관내 36,200 / 관외 40,000', '제한없음']
      },
      {
        id: 2,
        imageUrl: testimg,
        title: '마포보건소 심폐소생술 교육2',
        details: ['2025.07.01~2025.07.10', '2025.07.15~2025.08.31', '관내 36,200 / 관외 40,000', '제한없음']
      },
      {
        id: 3,
        imageUrl: testimg,
        title: '마포보건소 심폐소생술 교육3',
        details: ['2025.07.01~2025.07.10', '2025.07.15~2025.08.31', '관내 36,200 / 관외 40,000', '제한없음']
      },
      {
        id: 4,
        imageUrl: testimg,
        title: '마포보건소 심폐소생술 교육4',
        details: ['2025.07.01~2025.07.10', '2025.07.15~2025.08.31', '관내 36,200 / 관외 40,000', '제한없음']
      },
      {
        id: 5,
        imageUrl: testimg,
        title: '마포보건소 심폐소생술 교육5',
        details: ['2025.07.01~2025.07.10', '2025.07.15~2025.08.31', '관내 36,200 / 관외 40,000', '제한없음']
      }
    ];

    setCardData(dummy);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.centerWrapper}>
        <SelectPanel />

        {/* 카드 그리드 */}
        <div className={styles.cardGrid}>
          {cardData.map((card) => (
            <Card
            key={card.id}
            id={card.id}
            imageUrl={card.imageUrl}
            title={card.title}
            details={card.details}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ClassReservation;

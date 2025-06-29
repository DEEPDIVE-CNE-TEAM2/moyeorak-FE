import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar.jsx';
import styles from './Userform.module.css';

const ChangePhoneNumber = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/mypage/profile');
  };
  
  return (
    <>
      <Navbar />

      <div className={styles.wrapper}>
        {/* 타이틀 */}
        <div className={styles.titleWrapper}>
          <div className={styles.title}>번호 변경</div>
        </div>

      {/* 번호 변경 */}
      <div className={styles.field}>
        <label className={styles.label}>번호 변경</label>
        <div className={styles.inputWithButton}>
          <input className={styles.input} />
          <button className={styles.verifyButton}>인증</button>
        </div>
      </div>

      {/* 인증번호 */}
      <div className={styles.field}>
        <label className={styles.label}>인증번호</label>
        <input
          className={styles.input}
        />
      </div>

      {/* 버튼 */}
      <button className={styles.submitButton} onClick={handleSubmit}>
        확인
      </button>
      </div>
    </>
  );
};

export default ChangePhoneNumber;

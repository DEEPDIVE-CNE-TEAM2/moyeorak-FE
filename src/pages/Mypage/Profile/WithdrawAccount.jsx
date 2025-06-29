import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar.jsx';
import styles from './Userform.module.css';

const WithdrawAccount = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (currentPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    alert('탈퇴 처리가 완료되었습니다.');
    navigate('/');
  };

  return (
    <>
      <Navbar />

      <div className={styles.wrapper}>
        {/* 타이틀 */}
        <div className={styles.titleWrapper}>
          <div className={styles.title}>회원탈퇴</div>
        </div>

        {/* 현재 비밀번호 */}
        <div className={styles.field}>
          <label className={styles.label}>현재 비밀번호</label>
          <input
            className={styles.input}
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        {/* 새 비밀번호 확인 */}
        <div className={styles.field}>
          <label className={styles.label}>비밀번호 확인</label>
          <input
            className={styles.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default WithdrawAccount;

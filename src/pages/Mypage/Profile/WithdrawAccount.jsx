import { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar.jsx';
import PopupModal2 from '../../../components/Popupmodal2/PopupModal2.jsx';
import styles from './Userform.module.css';

const WithdrawAccount = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    if (currentPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    setShowModal(true);
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

        {/* 비밀번호 확인 */}
        <div className={styles.field}>
          <label className={styles.label}>비밀번호 확인</label>
          <input
            className={styles.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* 확인 버튼 */}
        <button className={styles.submitButton} onClick={handleSubmit}>
          확인
        </button>
      </div>

      {/* 팝업 모달 */}
      {showModal && (
        <PopupModal2
          title="회원탈퇴"
          content="회원 탈퇴하시겠습니까?"
          redirectPath="/"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default WithdrawAccount;


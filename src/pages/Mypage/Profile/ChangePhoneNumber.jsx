import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar.jsx';
import PopupModal2 from '../../../components/Popupmodal2/PopupModal2.jsx';
import styles from './Userform.module.css';

const ChangePhoneNumber = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleVerifyClick = () => {
    setShowModal(true);
  };

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
            <button className={styles.verifyButton} onClick={handleVerifyClick}>
              인증
            </button>
          </div>
        </div>

        {/* 인증번호 */}
        <div className={styles.field}>
          <label className={styles.label}>인증번호</label>
          <input className={styles.input} />
        </div>

        {/* 확인 버튼 */}
        <button className={styles.submitButton} onClick={handleSubmit}>
          확인
        </button>
      </div>

      {/* 팝업 모달 */}
      {showModal && (
        <PopupModal2
          title="번호인증"
          content="번호인증이 완료됨"
          onClose={() => setShowModal(false)} // 단순히 모달 닫기만
        />
      )}
    </>
  );
};

export default ChangePhoneNumber;


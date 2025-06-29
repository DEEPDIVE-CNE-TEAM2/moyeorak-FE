import { useNavigate } from 'react-router-dom';
import styles from './PopupModal2.module.css';

const PopupModal2 = ({ title, content, onClose, redirectPath }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (redirectPath) {
      navigate(redirectPath);
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
        <button className={styles.confirmButton} onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default PopupModal2;

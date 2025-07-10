<<<<<<< Updated upstream
import React, { useState } from 'react';
import styles from './PasswordCheck.module.css';
import { verifyPassword } from '../../../Api'; 

const PasswordCheck = ({ onVerify }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      const result = await verifyPassword(password);
      if (result.matched) {
        onVerify();
      } else {
        setError('비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setError('비밀번호 확인 중 오류가 발생했습니다.');
      console.error(err);
=======
import { useState } from "react";
import { verifyPassword } from "../../../Api"; // 경로는 실제 경로에 맞게 수정
import styles from './PasswordCheck.module.css';

const PasswordCheck = ({ onVerify }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      await verifyPassword(password); // API 호출
      onVerify(); // 성공 시 부모 컴포넌트로 알림
    } catch (err) {
      setError("비밀번호가 올바르지 않습니다.");
>>>>>>> Stashed changes
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>비밀번호 확인</div>
      <div className={styles.subtitle}>
        회원정보를 확인 및 수정하기 전 고객님의 본인 확인을 위한 <br />
        비밀번호 입력을 진행해 주시길 바랍니다.
      </div>
      <input
        type="password"
        className={styles.passwordInput}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
<<<<<<< Updated upstream
      {error && <div className={styles.errorMessage}>{error}</div>}
      <button className={styles.submitButton} onClick={handleVerify}>
        확인
      </button>
=======
      <button className={styles.submitButton} onClick={handleVerify}>
        확인
      </button>
      {error && <div className={styles.error}>{error}</div>}
>>>>>>> Stashed changes
    </div>
  );
};

export default PasswordCheck;

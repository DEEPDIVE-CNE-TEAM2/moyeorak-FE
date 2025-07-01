import React, { useState } from "react";
import styles from "../styles/ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 이메일 확인 후 휴대폰 인증 페이지로 이동
    navigate("/verify-phone");
  };

  return (
    <div className={styles.container}>
      {/* 로고 */}
      <img src="/img/아이콘최종.png" alt="모여락" className={styles.logo} />

      {/* 안내 문구 */}
      <p className={styles.description}>
        비밀번호를 찾고자 하는 이메일을 입력해주세요
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 이메일 입력 */}
        <input
          type="email"
          name="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />

        {/* 다음 버튼 */}
        <button type="submit" className={styles.submitBtn}>
          다음
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

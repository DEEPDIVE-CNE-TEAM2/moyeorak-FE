import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../../Api'; // Api 경로에 맞게 조정 필요
import styles from './Userform.module.css';
import { getUserInfo } from '../../../Api'; // 경로는 네 프로젝트에 맞게 조정

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('남'); // '남' 또는 '여'
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setName(data.name || '');

        // API gender 값 "MALE"/"FEMALE" → '남'/'여' 변환
        if (data.gender === 'MALE') setGender('남');
        else if (data.gender === 'FEMALE') setGender('여');
        else setGender('남'); // 기본값

        setPassword(''); // 비밀번호는 보통 안 불러오므로 빈 문자열 유지
        setEmail(data.email || '');
        setPhone(data.phone || '');
      } catch (error) {
        console.error('회원 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* 이름 */}
      <div className={styles.field}>
        <label className={styles.label}>이름</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* 성별 */}
      <div className={styles.field}>
        <label className={styles.label}>성별</label>
        <div className={styles.genderWrapper}>
          <button
            type="button"
            className={`${styles.genderButton} ${gender === '남' ? styles.selected : ''}`}
            onClick={() => setGender('남')}
          >
            남
          </button>
          <button
            type="button"
            className={`${styles.genderButton} ${gender === '여' ? styles.selected : ''}`}
            onClick={() => setGender('여')}
          >
            여
          </button>
        </div>
      </div>

      {/* 비밀번호 */}
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>비밀번호</label>
          <button
            type="button"
            className={styles.editButton}
            onClick={() => navigate('/mypage/profile/password')}
          >
            수정
          </button>
        </div>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 변경 시 입력"
        />
      </div>

      {/* 이메일 */}
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>이메일</label>
          <button type="button" className={styles.editButton}>
            수정
          </button>
        </div>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* 휴대폰 번호 */}
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>휴대폰 번호</label>
          <button
            type="button"
            className={styles.editButton}
            onClick={() => navigate('/mypage/profile/phone')}
          >
            수정
          </button>
        </div>
        <input
          className={styles.input}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div
        className={styles.withdraw}
        onClick={() => navigate('/mypage/profile/withdraw')}
      >
        탈퇴하기
      </div>
    </div>
  );
};

export default ProfileForm;

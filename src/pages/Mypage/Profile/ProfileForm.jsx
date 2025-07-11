import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, updateUserInfo, checkEmailDuplicate } from '../../../Api';
import styles from './Userform.module.css';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('남'); // 
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

        setPassword(''); 
        setEmail(data.email || '');
        setPhone(data.phone || '');
      } catch (error) {
        console.error('회원 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  //회원정보수정
  const handleSubmit = async () => {
  try {
    const payload = {
      email,
      name,
      phone,
      gender: gender === '남' ? 'MALE' : 'FEMALE',
    };

    await updateUserInfo(payload);
    alert('회원 정보가 수정되었습니다.');
    // 필요시 navigate('/mypage') 등 이동 가능
  } catch (error) {
    console.error('회원 정보 수정 실패:', error);
    alert('회원 정보 수정 중 오류가 발생했습니다.');
  }
};

//이메일중복확인
  const handleCheckEmail = async () => {
    try {
      const res = await checkEmailDuplicate(email);
      alert(res.isDuplicate ? "이미 사용 중인 이메일입니다." : "사용 가능한 이메일입니다.");
    } catch (err) {
      console.error(err);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };


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

      {/* 이메일 */}
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>이메일</label>
          <button type="button" className={styles.editButton2} onClick={handleCheckEmail}>
            중복확인
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
          readOnly
        />
      </div>

      <button className={styles.submitButton} onClick={handleSubmit}>
        확인
      </button>

      {/* 비밀번호변경 */}
      <div
        className={styles.withdraw}
        onClick={() => navigate('/mypage/profile/password')}
      >
        비밀번호변경
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

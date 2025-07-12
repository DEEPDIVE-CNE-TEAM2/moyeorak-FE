import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, updateUserInfo, checkEmailDuplicate } from '../../../Api';
import styles from './Userform.module.css';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('남');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [originalData, setOriginalData] = useState(null);
  const [emailChecked, setEmailChecked] = useState(false); // 중복확인 여부 상태
  const [emailDuplicate, setEmailDuplicate] = useState(false); // 중복 여부 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setName(data.name || '');
        if (data.gender === 'MALE') setGender('남');
        else if (data.gender === 'FEMALE') setGender('여');
        else setGender('남');
        setEmail(data.email || '');
        setPhone(data.phone || '');

        setOriginalData({
          name: data.name || '',
          gender: data.gender === 'MALE' ? '남' : '여',
          email: data.email || '',
          phone: data.phone || '',
        });

        setEmailChecked(true); // 처음 불러온 이메일은 이미 확인된 상태로 간주
        setEmailDuplicate(false);
      } catch (error) {
        console.error('회원 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // 이메일이 변경될 때마다 중복확인 필요 플래그 변경
  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailChecked(false);  // 이메일이 바뀌면 다시 중복확인해야 하므로 false
    setEmailDuplicate(false); // 중복 여부 초기화
  };

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    if (!email.trim()) {
      alert('이메일을 입력하세요.');
      return;
    }
    try {
      const res = await checkEmailDuplicate(email);
      if (res.isDuplicate) {
        alert('이미 사용 중인 이메일입니다.');
        setEmailDuplicate(true);
      } else {
        alert('사용 가능한 이메일입니다.');
        setEmailDuplicate(false);
      }
      setEmailChecked(true);
    } catch (err) {
      console.error(err);
      alert('이메일 중복 확인 중 오류가 발생했습니다.');
      setEmailChecked(false);
      setEmailDuplicate(false);
    }
  };

    // 회원정보 수정
  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert('이름, 이메일, 휴대폰 번호는 모두 입력해야 합니다.');
      return;
    }

    if (
      originalData &&
      name === originalData.name &&
      gender === originalData.gender &&
      email === originalData.email &&
      phone === originalData.phone
    ) {
      alert('수정된 정보가 없습니다.');
      return;
    }

    // 이메일 수정했으면 중복확인 했는지 검사
    if (!emailChecked) {
      alert('이메일 중복 확인이 필요합니다.');
      return;
    }

    if (emailDuplicate) {
      alert('중복된 이메일이므로 다른 이메일을 사용해주세요.');
      return;
    }

    try {
      const payload = {
        email,
        name,
        phone,
        gender: gender === '남' ? 'MALE' : 'FEMALE',
      };

      await updateUserInfo(payload);

      if (email !== originalData.email) {
        alert('이메일이 변경되어 다시 로그인해야 합니다.');
        navigate('/login');
        return;
      }

      alert('회원 정보가 수정되었습니다.');
      setOriginalData({ name, gender, email, phone });
      setEmailChecked(true);
      setEmailDuplicate(false);
    } catch (error) {
      console.error('회원 정보 수정 실패:', error);
      alert('회원 정보 수정 중 오류가 발생했습니다.');
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
          onChange={onEmailChange}
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
        <input className={styles.input} type="tel" value={phone} readOnly />
      </div>

      <button className={styles.submitButton} onClick={handleSubmit}>
        확인
      </button>

      {/* 비밀번호변경 */}
      <div className={styles.withdraw} onClick={() => navigate('/mypage/profile/password')}>
        비밀번호변경
      </div>

      {/* 탈퇴하기 */}
      <div className={styles.withdraw} onClick={() => navigate('/mypage/profile/withdraw')}>
        탈퇴하기
      </div>
    </div>
  );
};

export default ProfileForm;

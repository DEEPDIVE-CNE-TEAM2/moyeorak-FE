import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import PromotionBanner from '../../components/PromotionBanner/PromotionBanner';
import RecommendProgramListAfterLogin from '../../components/RecommendProgramListAfterLogin/RecommendProgramListAfterLogin';

const districtToPath = {
  "송파구": "songpa",
  "강남구": "gangnam",
  "용산구": "yongsan",
};

const Songpa = () => {
  // 기존에 있던 selectedDistrict 변수 대신 useState로 상태 관리
  const [selectedDistrict, setSelectedDistrict] = useState("송파구");

  // 로그인 상태 관리 (로그인 상태로 시작)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  // 네비바 드롭다운에서 지역 선택 시 실행될 함수
  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    const path = districtToPath[district];
    if (path) {
      navigate(`/${path}`);
    }
  };

  // 로그아웃 함수 예시
  const handleLogout = () => {
    setIsLoggedIn(false);
    // 로그아웃 후 다른 페이지로 이동시키고 싶으면 추가 처리 가능
  };

  return (
    <div>
      <Navbar
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <PromotionBanner />
      <RecommendProgramListAfterLogin />
      
      {/* 로그인 상태가 false면 로그인 안내 문구 혹은 로그인 페이지 리다이렉트도 가능 */}
      {!isLoggedIn && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>로그아웃 되었습니다. 다시 로그인해 주세요.</h2>
        </div>
      )}
    </div>
  );
};

export default Songpa;

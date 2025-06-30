import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import PromotionBanner from '../../components/PromotionBanner/PromotionBanner';
import RecommendProgramListAfterLogin from '../../components/RecommendProgramListAfterLogin/RecommendProgramListAfterLogin';

const districtToPath = {
  "송파구": "songpa",
  "중구": "jung",
  "성동구": "seongdong",
};

const Songpa = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("송파구");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    const path = districtToPath[district];
    if (path) {
      navigate(`/${path}`);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // 로그아웃 후 추가 이동이 필요하면 여기서 처리
  };

  const districts = ["중구", "성동구", "송파구"];

  return (
    <div>
      <Navbar
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        districts={districts}
        districtToPath={districtToPath} 
      />
      <PromotionBanner />
      <RecommendProgramListAfterLogin />

      {!isLoggedIn && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>로그아웃 되었습니다. 다시 로그인해 주세요.</h2>
        </div>
      )}
    </div>
  );
};

export default Songpa;

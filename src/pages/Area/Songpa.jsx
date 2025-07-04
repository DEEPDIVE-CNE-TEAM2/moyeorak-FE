import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import PromotionBanner from '../../components/PromotionBanner/PromotionBanner';
import RecommendProgramListAfterLogin from '../../components/RecommendProgramListAfterLogin/RecommendProgramListAfterLogin';

const districts = ["중구", "성동구", "송파구"];

const districtToPath = {
  "송파구": "songpa",
  "중구": "jung",
  "성동구": "seongdong",
};

const districtToRentalPath = {
  "송파구": "/songpa/rental",
  "중구": "/jung/rental",
  "성동구": "/seongdong/rental",
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

  const handleLogoClick = () => {
    const path = districtToPath[selectedDistrict];
    if (path) {
      navigate(`/${path}`);
    }
  };

  const handleFacilityClick = () => {
    const path = districtToPath[selectedDistrict];
    if (path) {
      navigate(`/${path}/place`);
    }
  };

  return (
    <div>
      <Navbar
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}
        onLogoClick={handleLogoClick}
        onFacilityClick={handleFacilityClick}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
        districts={districts}
        districtToPath={districtToPath}
        districtToRentalPath={districtToRentalPath}
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

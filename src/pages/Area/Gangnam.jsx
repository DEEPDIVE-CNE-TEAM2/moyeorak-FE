import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import PromotionBanner from '../../components/PromotionBanner/PromotionBanner';
import RecommendProgramSection from '../../components/RecommendProgramSection/RecommendProgramSection';

const districtToPath = {
  "송파구": "songpa",
  "강남구": "gangnam",
  "용산구": "yongsan",
};

const Gangnam = () => {
  // 기존에 있던 selectedDistrict 변수 대신 useState로 상태 관리
  const [selectedDistrict, setSelectedDistrict] = useState("강남구");
  const navigate = useNavigate();

  // 네비바 드롭다운에서 지역 선택 시 실행될 함수
  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    const path = districtToPath[district];
    if (path) {
      navigate(`/${path}`);
    }
  };

  return (
    <div>
      {/* 네비바에 상태와 함수 전달 */}
      <Navbar 
        selectedDistrict={selectedDistrict} 
        onDistrictChange={handleDistrictChange} 
      />
      <PromotionBanner />
      <RecommendProgramSection />
    </div>
  );
};

export default Gangnam;

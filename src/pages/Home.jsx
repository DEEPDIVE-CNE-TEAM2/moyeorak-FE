import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar.jsx';
import PromotionBanner from "../components/PromotionBanner/PromotionBanner";
import RecommendProgramSection from '../components/RecommendProgramSection/RecommendProgramSection';
import PopupModal from '../components/popupmodal/PopupModal';

const districtToPath = {
  "송파구": "songpa",
  "중구": "jung",
  "성동구": "seongdong",
};

const Home = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  // 팝업에서 지역 선택 시 실행
  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setShowPopup(false);

    const path = districtToPath[district];
    if (path) {
      navigate(`/${path}`);
    }
  };

  // 네비바 드롭다운에서 지역 선택 시 실행
  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);

    const path = districtToPath[district];
    if (path) {
      navigate(`/${path}`);
    }
  };

  return (
    <div>
      <Navbar 
        selectedDistrict={selectedDistrict} 
        onDistrictChange={handleDistrictChange} 
      />
      <PromotionBanner />
      <RecommendProgramSection />
      {showPopup && (
        <PopupModal
          selectedDistrict={selectedDistrict}
          onConfirm={handleDistrictSelect}
        />
      )}
    </div>
  );
};

export default Home;

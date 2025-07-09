import React, { useState } from 'react';
import './PopupModal.css';

const PopupModal = ({ onConfirm }) => {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const REGION_ID_MAP = {
  '중구': 1,
  '성동구': 2,
  '송파구': 3,
};

 const handleConfirm = () => {
  if (selected) {
    const selectedRegionId = REGION_ID_MAP[selected];
    // 지역명과 지역 ID 함께 넘겨주기
    onConfirm({ name: selected, id: selectedRegionId });

    // 지역 ID를 localStorage에도 저장
    localStorage.setItem("selectedRegionId", selectedRegionId);
    localStorage.setItem("selectedRegionName", selected);
  }
};

  return (
    <div className="popup-backdrop">
      <div className="popup-container">
        <div className="popup-text-box">
          <div className="popup-text-line1">공공체육시설 통합 플랫폼</div>
          <div className="popup-text-line2">
            <span className="blue">모여락</span>
            <span>에 오신 걸 환영해요!🏋️</span>
          </div>
          <div className="popup-text-line3">
            원활한 이용을 위해 지역을 선택해주세요!
          </div>
        </div>

        <select
          className="popup-dropdown"
          value={selected}
          onChange={handleChange}
        >
          <option value="">지역을 선택하세요</option>
          <option value="중구">중구</option>
          <option value="성동구">성동구</option>
          <option value="송파구">송파구</option>
        </select>

        {selected && (
          <>
            <div className="popup-text-line4">
              {selected}의 체육시설을 이용하시겠습니까?
            </div>
            <button className="popup-confirm-button" onClick={handleConfirm}>
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupModal;

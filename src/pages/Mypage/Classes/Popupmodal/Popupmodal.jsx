import React from 'react';
import './Popupmodal.css';
import X_black from '../../../../img/X_black.svg';

const Popupmodal = ({ onClose, data }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <div className="popup-title">수강 취소</div>
          <img src={X_black} alt="닫기" className="popup-close" onClick={onClose} />
        </div>

        <div className="popup-info">
          <div className="popup-row">
            <div className="label">강좌명</div>
            <div className="value">{data.title}</div>
          </div>
          <div className="popup-divider" />
          <div className="popup-row">
            <div className="label">기간</div>
            <div className="value">{data.period}</div>
          </div>
          <div className="popup-divider" />
          <div className="popup-row">
            <div className="label">요일/시간</div>
            <div className="value">{data.schedule}</div>
          </div>
          <div className="popup-divider" />
          <div className="popup-row">
            <div className="label">결제금액</div>
            <div className="value">{data.price}</div>
          </div>
          <div className="popup-divider" />
          <div className="popup-row">
            <div className="label">환불금액</div>
            <div className="value">{data.price}</div> {/* 임시 동일 */}
          </div>
          <div className="popup-divider" />
        </div>

        <div className="popup-confirm-text">
          수강 신청을 취소하시겠습니까?
        </div>

        <button className="popup-confirm-button">확인</button>
      </div>
    </div>
  );
};

export default Popupmodal;

import React from 'react';
import './Card.css';
import icon1 from '../../../img/Calendar.svg';
import icon2 from '../../../img/PocketWatch.svg';
import icon3 from '../../../img/MagneticCard.svg';
import icon4 from '../../../img/Person.svg';

const Card = ({ imageUrl, title, details }) => {
  const labels = ['접수기간', '이용기간', '수강료', '대상'];
  const icons = [icon1, icon2, icon3, icon4];

  return (
    <div className="card">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${imageUrl})` }}>
          <div className="card-badge">접수중</div>
        </div>
      <div className="card-title">{title}</div>
      <div className="card-content-wrapper">
        <div className="card-content-1">
          {labels.map((label, index) => (
            <div key={index} className="card-line">
              <img src={icons[index]} alt="" className="card-icon" />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="card-content-2">
          {details.map((value, index) => (
            <div key={index} className="card-line">
              {value}
            </div>
          ))}
        </div>
      </div>
      <div className="card-button-wrapper">
        <button className="card-button">신청하기</button>
      </div>
    </div>
  );
};

export default Card;

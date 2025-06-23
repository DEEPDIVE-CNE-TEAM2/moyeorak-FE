import React from 'react';
import './Card.css';
import icon1 from '../../img/Person.svg';
import icon2 from '../../img/Calendar.svg';
import icon3 from '../../img/PocketWatch.svg';
import icon4 from '../../img/MagneticCard.svg';

const Card = ({ imageUrl, title, details }) => {
  const labels = ['대상', '접수기간', '이용기간', '비용'];
  const icons = [icon1, icon2, icon3, icon4];

  return (
    <div className="card">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
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
    </div>
  );
};

export default Card;

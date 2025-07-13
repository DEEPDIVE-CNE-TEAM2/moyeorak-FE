import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

import icon1 from "../../../../img/Calendar.svg";
import icon2 from "../../../../img/PocketWatch.svg";
import icon3 from "../../../../img/MagneticCard.svg";
import icon4 from "../../../../img/Person.svg";

const Card = ({ id, imageUrl, title, details, status }) => {
  const labels = ["접수기간", "이용기간", "수강료", "대상"];
  const icons = [icon1, icon2, icon3, icon4];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/classReservation/${id}`);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {status === "접수 중" && <div className={styles.badge}>접수중</div>}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.infoWrapper}>
          <div className={styles.labels}>
            {labels.map((label, idx) => (
              <div key={idx} className={styles.line}>
                <img src={icons[idx]} alt="" className={styles.icon} />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className={styles.values}>
            {details.map((value, idx) => (
              <div key={idx} className={styles.line}>
                {value}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button className={styles.button} onClick={handleClick}>
            신청하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

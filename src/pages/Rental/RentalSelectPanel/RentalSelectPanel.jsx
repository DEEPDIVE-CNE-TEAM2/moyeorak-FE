import React from "react";
import styles from "./RentalSelectPanel.module.css";

import { PiSoccerBallFill } from "react-icons/pi";
import { CiBaseball } from "react-icons/ci";
import { FaSwimmer } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";
import { GiShuttlecock } from "react-icons/gi";
import { RiPingPongFill } from "react-icons/ri";


const iconMap = {
  축구: <PiSoccerBallFill size={40} color="#3096E6" />,
  야구: <CiBaseball size={40} color="#3096E6" />,
  수영: <FaSwimmer size={40} color="#3096E6" />,
  테니스: <IoIosTennisball size={40} color="#3096E6" />,
  배드민턴: <GiShuttlecock size={40} color="#3096E6" />,
  탁구: <RiPingPongFill size={40} color="#3096E6" />,
};

const sports = ["축구", "야구", "수영", "테니스", "배드민턴", "탁구"];

const RentalSelectPanel = ({ selectedSport, setSelectedSport }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>종목 선택</div>
      <div className={styles.wrapper}>
        {sports.map((sport) => (
          <button
            key={sport}
            className={`${styles.sportButton} ${selectedSport === sport ? styles.active : ""}`}
            onClick={() => setSelectedSport(sport)}
          >
            <div className={styles.icon}>{iconMap[sport]}</div>
            <div className={styles.label}>{sport}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RentalSelectPanel;

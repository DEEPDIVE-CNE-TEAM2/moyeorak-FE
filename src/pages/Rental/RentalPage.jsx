import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { PiSoccerBallFill } from "react-icons/pi";
import { CiBaseball } from "react-icons/ci";
import { FaSwimmer } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";
import { GiShuttlecock } from "react-icons/gi";
import { RiPingPongFill } from "react-icons/ri";
import styles from "./RentalPage.module.css";

import {
  districts,
  districtToPath,
  districtToRentalPath,
} from "../../constants/districtPaths";

const sportOptions = [
  { name: "축구", icon: <PiSoccerBallFill size={60} /> },
  { name: "야구", icon: <CiBaseball size={60} /> },
  { name: "수영", icon: <FaSwimmer size={60} /> },
  { name: "테니스", icon: <IoIosTennisball size={60} /> },
  { name: "배드민턴", icon: <GiShuttlecock size={60} /> },
  { name: "탁구", icon: <RiPingPongFill size={60} /> },
];

const jungFacilities = [
  {
    name: "손기정 축구장",
    sport: "축구",
    image: "/img/중구축구장.png",
    address: "중구 손기정로 123",
    time: "09:00 - 21:00",
    capacity: "10명",
    contact: "02-1234-5678",
  },
  {
    name: "장충테니스장",
    sport: "테니스",
    image: "/img/중구테니스장.png",
    address: "중구 장충동 12-3",
    time: "08:00 - 20:00",
    capacity: "12명",
    contact: "02-234-5678",
  },
  {
    name: "충무스포츠센터 대체육관 배드민턴장",
    sport: "배드민턴",
    image: "/img/중구배드민턴장.png",
    address: "중구 퇴계로 345",
    time: "09:00 - 21:00",
    capacity: "6명",
    contact: "02-345-6789",
  },
  {
    name: "충무스포츠센터 대체육관 탁구장",
    sport: "탁구",
    image: "/img/중구탁구장.png",
    address: "중구 퇴계로 345",
    time: "09:00 - 21:00",
    capacity: "10명",
    contact: "02-456-7890",
  },
  {
    name: "충무스포츠센터 수영장",
    sport: "수영",
    image: "/img/중구수영장.png",
    address: "중구 필동로 33",
    time: "06:00 - 22:00",
    capacity: "25명",
    contact: "02-567-8901",
  },
  {
    name: "회현체육센터 수영장",
    sport: "수영",
    image: "/img/회현체육센터수영장.png",
    address: "중구 회현동로 11",
    time: "07:00 - 21:00",
    capacity: "20명",
    contact: "02-678-9012",
  },
];

const JungRental = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("중구");
  const navigate = useNavigate();
  const location = useLocation();

  // URL 경로에 따라 selectedDistrict 자동 설정
  useEffect(() => {
    if (location.pathname.includes("/jung")) {
      setSelectedDistrict("중구");
    } else if (location.pathname.includes("/seongdong")) {
      setSelectedDistrict("성동구");
    } else if (location.pathname.includes("/songpa")) {
      setSelectedDistrict("송파구");
    }
  }, [location.pathname]);

  const toggleSelection = (value) => {
    setSelectedSport(value === selectedSport ? null : value);
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    navigate(districtToRentalPath[district]);
  };

  const filteredFacilities = jungFacilities.filter(
    (f) => !selectedSport || f.sport === selectedSport
  );

  return (
    <>
      <Navbar
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}
        districts={districts}
        districtToPath={districtToPath}
        districtToRentalPath={districtToRentalPath}
      />

      <div className={styles.panelWrapper}>
        <div className={styles.sectionTitle}>종목 선택</div>
        <div className={styles.optionsRow}>
          {sportOptions.map((sport, index) => (
            <div
              key={index}
              className={`${styles.sportButton} ${
                selectedSport === sport.name ? styles.selected : ""
              }`}
              onClick={() => toggleSelection(sport.name)}
            >
              <div
                className={styles.icon}
                style={{
                  color: selectedSport === sport.name ? "#3096E6" : "#555",
                }}
              >
                {sport.icon}
              </div>
              <div
                className={styles.label}
                style={{
                  color: selectedSport === sport.name ? "#3096E6" : "#333",
                }}
              >
                {sport.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.cardContainer}>
        {filteredFacilities.length === 0 ? (
          <p className={styles.noInfo}>해당 시설 정보가 없습니다.</p>
        ) : (
          filteredFacilities.map((facility, idx) => (
            <div key={idx} className={styles.card}>
              <img
                src={facility.image}
                alt={facility.name}
                className={styles.image}
              />
              <div className={styles.content}>
                <h3>{facility.name}</h3>
                <p className={styles.info}>
                  <strong>주소 </strong>
                  {facility.address}
                </p>
                <p className={styles.info}>
                  <strong>운영시간 </strong>
                  {facility.time}
                </p>
                <p className={styles.info}>
                  <strong>정원 </strong>
                  {facility.capacity}
                </p>
                <p className={styles.info}>
                  <strong>문의 </strong>
                  {facility.contact}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default JungRental;

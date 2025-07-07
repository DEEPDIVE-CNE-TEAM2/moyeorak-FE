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

const districts = ["중구", "성동구", "송파구"];

const districtToMainPath = {
  중구: "jung",
  성동구: "seongdong",
  송파구: "songpa",
};

const districtToRentalPath = {
  중구: "/jung/rental",
  성동구: "/seongdong/rental",
  송파구: "/songpa/rental",
};

const sportOptions = [
  { name: "축구", icon: <PiSoccerBallFill size={60} /> },
  { name: "야구", icon: <CiBaseball size={60} /> },
  { name: "수영", icon: <FaSwimmer size={60} /> },
  { name: "테니스", icon: <IoIosTennisball size={60} /> },
  { name: "배드민턴", icon: <GiShuttlecock size={60} /> },
  { name: "탁구", icon: <RiPingPongFill size={60} /> },
];

const songpaFacilities = [
  {
    name: "잠실유수지 축구장",
    sport: "축구",
    image: "/img/잠실유수지축구장.png",
    address: "송파구 잠실동 123-45",
    time: "09:00 - 21:00",
    capacity: "20명",
    contact: "02-1234-5678",
  },
  {
    name: "탄천축구장",
    sport: "축구",
    image: "/img/탄천축구장.png",
    address: "송파구 탄천로 456",
    time: "07:00 - 22:00",
    capacity: "20명",
    contact: "02-8765-4321",
  },
  {
    name: "잠실유수지 리틀야구장",
    sport: "야구",
    image: "/img/잠실유수지리틀야구장.png",
    address: "송파구 잠실동 123-46",
    time: "08:00 - 20:00",
    capacity: "25명",
    contact: "02-2222-3333",
  },
  {
    name: "탄천야구장",
    sport: "야구",
    image: "/img/탄천야구장.png",
    address: "송파구 탄천로 457",
    time: "08:00 - 20:00",
    capacity: "25명",
    contact: "02-4444-5555",
  },
  {
    name: "잠실유수지 테니스장",
    sport: "테니스",
    image: "/img/잠실유수지테니스장.png",
    address: "송파구 잠실동 123-47",
    time: "06:00 - 21:00",
    capacity: "17명",
    contact: "02-3333-4444",
  },
  {
    name: "송파테니스장",
    sport: "테니스",
    image: "/img/송파테니스장.png",
    address: "송파구 송파동 789",
    time: "06:00 - 22:00",
    capacity: "16명",
    contact: "02-5555-6666",
  },
];

const SongpaRental = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("송파구");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/jung")) setSelectedDistrict("중구");
    else if (location.pathname.includes("/seongdong")) setSelectedDistrict("성동구");
    else if (location.pathname.includes("/songpa")) setSelectedDistrict("송파구");
  }, [location.pathname]);

  const toggleSelection = (value) => {
    setSelectedSport(value === selectedSport ? null : value);
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    const path = districtToRentalPath[district];
    if (path) navigate(path);
  };

  const filteredFacilities = songpaFacilities.filter(
    (f) => !selectedSport || f.sport === selectedSport
  );

  return (
    <>
      <Navbar
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}
        districts={districts}
        districtToPath={districtToMainPath}
        districtToRentalPath={districtToRentalPath}
      />

      <div className={styles.panelWrapper}>
        <div className={styles.sectionTitle}>종목 선택</div>
        <div className={styles.optionsRow}>
          {sportOptions.map((sport, idx) => (
            <div
              key={idx}
              className={`${styles.sportButton} ${selectedSport === sport.name ? styles.selected : ""}`}
              onClick={() => toggleSelection(sport.name)}
            >
              <div
                className={styles.icon}
                style={{ color: selectedSport === sport.name ? "#3096E6" : "#555" }}
              >
                {sport.icon}
              </div>
              <div
                className={styles.label}
                style={{ color: selectedSport === sport.name ? "#3096E6" : "#333" }}
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
              <img src={facility.image} alt={facility.name} className={styles.image} />
              <div className={styles.content}>
                <h3>{facility.name}</h3>
                <p className={styles.info}><strong>주소 </strong>{facility.address}</p>
                <p className={styles.info}><strong>운영시간 </strong>{facility.time}</p>
                <p className={styles.info}><strong>정원 </strong>{facility.capacity}</p>
                <p className={styles.info}><strong>문의 </strong>{facility.contact}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default SongpaRental;

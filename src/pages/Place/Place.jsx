import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import FacilityCard from "./Facility/FacilityCard";
import styles from "./Place.module.css";
import { getRentalFacilitiesByRegionId } from "../../Api";

const categories = [
  "축구장", "야구장", "수영장", "테니스장", "배드민턴장", "탁구장",
];

// 시설 ID별 이미지 매핑 (필요한 만큼 채워주세요)
const facilityImages = {
  1: "/img/중구축구장.png",
  2: "/img/중구수영장.png",
  3: "/img/회현체육센터수영장.png",
  4: "/img/중구테니스장.png",
  5: "/img/중구배드민턴장.png",
  6: "/img/중구탁구장.png",

  7: "/img/중랑물재생센터축구장.png",
  8: "/img/중랑물재생센터테니스장.png",
  9: "/img/서울숲테니스장.png",
  10: "/img/중랑물재생센터배드민턴장.png",

  11: "/img/잠실유수지축구장.png",
  12: "/img/탄천축구장.png",
  13: "/img/잠실유수지리틀야구장.png",
  14: "/img/탄천야구장.png",
  15: "/img/잠실유수지테니스장.png",
  16: "/img/송파테니스장.png",
};

const Place = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState("축구장");
  const [selectedRegionId, setSelectedRegionId] = useState(
    Number(new URLSearchParams(location.search).get("regionid")) ||
    Number(localStorage.getItem("selectedRegionId")) || 1
  );

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  // 지역별 시설 데이터 받아오기
  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        const data = await getRentalFacilitiesByRegionId(selectedRegionId);
        console.log("시설 목록 데이터:", data);
        setFacilities(data);
      } catch (err) {
        console.error("시설 목록 불러오기 실패:", err);
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, [selectedRegionId]);

  // 카테고리별 필터링
  const filteredFacilities = facilities.filter((f) => f.location.includes(selectedCategory));

  const handleDistrictChange = (districtName) => {
    const regionIdMap = {
      중구: 1,
      성동구: 2,
      송파구: 3,
    };
    const regionId = regionIdMap[districtName];
    localStorage.setItem("selectedRegionName", districtName);
    localStorage.setItem("selectedRegionId", regionId);
    setSelectedRegionId(regionId);
    navigate(`/place?regionid=${regionId}`);
  };

  const districtName = {
    1: "중구",
    2: "성동구",
    3: "송파구",
  }[selectedRegionId];

  return (
    <>
      <Navbar
        selectedDistrict={districtName}
        onDistrictChange={handleDistrictChange}
      />

      <nav className={styles.categoryNav}>
        {categories.map((category) => (
          <span
            key={category}
            className={`${styles.categoryItem} ${
              category === selectedCategory ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </span>
        ))}
      </nav>

      <div className={styles.facilityList}>
        {loading ? (
          <p className={styles.noData}>로딩 중...</p>
        ) : filteredFacilities.length === 0 ? (
          <p className={styles.noData}>해당 시설 정보가 없습니다.</p>
        ) : (
          filteredFacilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={{
                ...facility,
                img: facilityImages[facility.id] || "/img/default.png",
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Place;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RentalDetailPage from "./RentalDetailPage/RentalDetailPage";
import Navbar from "../../components/Navbar/Navbar";
import { fetchRentalDetail } from "../../Api";

const RentalDetailContainer = () => {
  const { id, district } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState(null);
  const [error, setError] = useState(null);

  const regionIdMap = {
    jung: 1,
    seongdong: 2,
    songpa: 3,
  };

  const regionId = regionIdMap[district];

  const districts = ["중구", "성동구", "송파구"];

  const districtNameMap = {
    jung: "중구",
    seongdong: "성동구",
    songpa: "송파구",
  };

  const districtKeyMap = {
    중구: "jung",
    성동구: "seongdong",
    송파구: "songpa",
  };

  const districtToRentalPath = {
    jung: "/jung/rental",
    seongdong: "/seongdong/rental",
    songpa: "/songpa/rental",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("district:", district, "id:", id, "regionId:", regionId);
        if (!regionId || !id) {
          setError("잘못된 접근입니다.");
          return;
        }

        const data = await fetchRentalDetail(regionId, id);
        setFacility(data);
      } catch (err) {
        setError("시설 정보를 불러오는 데 실패했습니다.");
        console.error(err);
      }
    };

    fetchData();
  }, [id, district,  regionId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!facility) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Navbar
        selectedDistrict={districtNameMap[district]}
        onDistrictChange={(d) => {
          const key = districtKeyMap[d];
          const path = districtToRentalPath[key];
          if (path) navigate(path);
        }}
        districts={districts}
        districtToPath={{
          중구: "jung",
          성동구: "seongdong",
          송파구: "songpa",
        }}
        districtToRentalPath={districtToRentalPath}
      />

      <RentalDetailPage
        facilityName={facility.location}
        imageUrl={facility.imageUrl}
        info={{
          종목: facility.category || "-",
          대관시설: facility.location || "-",
          주소: facility.address || "-",
          운영시간: facility.usageTime || "-",
          접수기간: facility.registrationPeriod || "-",
          취소기간: facility.cancelEndDate || "-",
          정원: `${facility.capacity || 0}명`,
          문의: facility.contact || "-",
        }}
        notice={facility.notice}
        guide={facility.guide}
        onApplyClick={() => navigate(`/${district}/rental/reserve/${id}`)}
        onBackClick={() => navigate(`/${district}/rental`)}
      />
    </>
  );
};

export default RentalDetailContainer;

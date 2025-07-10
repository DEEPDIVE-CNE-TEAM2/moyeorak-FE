import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import RentalDetailPage from "./RentalDetailPage/RentalDetailPage";
import { rentalDetailMap } from "./rentalDetailData";
import Navbar from "../../components/Navbar/Navbar";

const RentalDetailContainer = () => {
  const { id, district } = useParams(); // 경로에서 id, district 추출
  const navigate = useNavigate();

  const facility = rentalDetailMap[id];

  if (!facility) {
    return <div>해당 시설 정보를 찾을 수 없습니다.</div>;
  }

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

  const districtNameMap = {
    jung: "중구",
    seongdong: "성동구",
    songpa: "송파구",
  };

  return (
    <>
      <Navbar
        selectedDistrict={districtNameMap[district]}
        onDistrictChange={(d) => {
          const path = districtToRentalPath[d];
          if (path) navigate(path);
        }}
        districts={districts}
        districtToPath={districtToMainPath}
        districtToRentalPath={districtToRentalPath}
      />

      <RentalDetailPage
        facilityName={facility.facilityName}
        imageUrl={facility.imageUrl}
        info={facility.info}
        notice={facility.notice}
        guide={facility.guide}
        onApplyClick={() => navigate(`/${facility.district}/rental/reserve/${id}`)}
        onBackClick={() => navigate(`/${facility.district}/rental`)}
      />
    </>
  );
};

export default RentalDetailContainer;

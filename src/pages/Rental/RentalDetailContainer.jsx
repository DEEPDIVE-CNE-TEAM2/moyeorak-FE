import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import RentalDetailPage from "./RentalDetailPage/RentalDetailPage";
import { rentalDetailMap } from "./rentalDetailData";
import Navbar from "../../components/Navbar/Navbar";

const RentalDetailContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const facility = rentalDetailMap[id];

  if (!facility) {
    return <div>해당 시설 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <Navbar />

      <RentalDetailPage
        facilityName={facility.facilityName}
        imageUrl={facility.imageUrl}
        info={facility.info}
        notice={facility.notice}
        guide={facility.guide}
        onApplyClick={() => navigate(`/rental/reserve/${id}`)}
        onBackClick={() => navigate(`/rental`)}
      />
    </>
  );
};

export default RentalDetailContainer;


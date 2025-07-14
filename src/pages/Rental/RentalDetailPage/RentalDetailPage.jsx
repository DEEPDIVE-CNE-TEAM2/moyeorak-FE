import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RentalDetailPage.module.css";

const RentalDetailPage = ({
  facilityName,
  imageUrl,
  info,
  notice,
  guide,
  onApplyClick,
  regionId,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/rental?selectedRegionId=${regionId}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{facilityName}</h2>

      <div className={styles.infoSection}>
        <img src={imageUrl} alt={facilityName} className={styles.image} />

        <div className={styles.infoWrapper}>
          <table className={styles.infoTable}>
            <tbody>
              {Object.entries(info).map(([key, val]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.buttonGroup}>
            <button className={styles.applyBtn} onClick={onApplyClick}>
              신청하기
            </button>
            <button className={styles.backBtn} onClick={handleBackClick}>
              목록보기
            </button>
          </div>
        </div>
      </div>

      <div className={styles.noticeSection}>
        <h3>준수사항</h3>
        <p className={styles.noticeText}>
          • 이용 시 예약자가 반드시 동반하여야 입장 가능 (신분증 지참) <br />
          • 목적 외의 이용 불가 <br />
          • 운동용품은 이용자가 준비 (대여 불가) <br />
          • 시설 내 음료 외 음식물 반입 금지 <br />
          • 시설 훼손 발생할 경우 손해배상 발생
        </p>

        <p style={{ whiteSpace: "pre-line" }}>{notice}</p>

        <h3>대여안내</h3>
        <p style={{ whiteSpace: "pre-line" }}>{guide}</p>

        <p className={styles.refundTitle}>• 이용료 환불 기준</p>
        <table className={styles.refundTable}>
          <thead>
            <tr>
              <th>취소일</th>
              <th>환불비율</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>대관일 7일 전</td>
              <td>100% 환불</td>
            </tr>
            <tr>
              <td>대관일 1일 전</td>
              <td>30% 환불</td>
            </tr>
            <tr>
              <td>당일</td>
              <td>환불 불가</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalDetailPage;

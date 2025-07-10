import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./ReservePage.module.css";
import facilityData from "./facilityInfo.json";
import Navbar from "../../../components/Navbar/Navbar";
import { createRentalApplication } from "../../../Api";

const ReservePage = () => {
  const { id } = useParams();
  const facility = facilityData[id];
  console.log("ReservePage.jsx: id:", id, "facility:", facility);


  const navigate = useNavigate();
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [people, setPeople] = useState(1);
  const [disabledTimes, setDisabledTimes] = useState([]);

  const disabledDates = facility?.reservedDates || [];
  const maxPeople = facility?.capacity ?? 10; // capacity로 변경

  // 한국 시간 기준 날짜 문자열 반환 (YYYY-MM-DD)
  const getKoreanDateString = (date) => {
    return date.toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
  };

  useEffect(() => {
    if (selectedDate) {
      const dateStr = getKoreanDateString(selectedDate);
      setDisabledTimes(facility?.reservedTimes?.[dateStr] || []);
    } else {
      setDisabledTimes([]);
    }
  }, [selectedDate, facility]);

  const handleMonthChange = (diff) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + diff);

    const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    const newMonthTime = newMonth.getFullYear() * 12 + newMonth.getMonth();
    const prevMonthTime = prevMonth.getFullYear() * 12 + prevMonth.getMonth();
    const nextMonthTime = nextMonth.getFullYear() * 12 + nextMonth.getMonth();

    if (newMonthTime >= prevMonthTime && newMonthTime <= nextMonthTime) {
      setCurrentMonth(newMonth);
    }
  };

  const generateCalendar = () => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const calendar = [];
    let day = new Date(start);

    while (day.getDay() !== 0) {
      day.setDate(day.getDate() - 1);
    }

    while (day <= end || day.getDay() !== 0) {
      calendar.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }

    return calendar;
  };

  const isSameDate = (date1, date2) =>
    date1?.getFullYear() === date2?.getFullYear() &&
    date1?.getMonth() === date2?.getMonth() &&
    date1?.getDate() === date2?.getDate();

  const handleTimeClick = (timeStr) => {
    if (disabledTimes.includes(timeStr)) return;

    if (selectedTimes.includes(timeStr)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== timeStr));
    } else {
      if (selectedTimes.length >= 2) return;
      setSelectedTimes([...selectedTimes, timeStr]);
    }
  };

  const handleApplyClick = async () => {
    if (!selectedDate || selectedTimes.length === 0 || people === 0) {
      alert("날짜, 시간, 인원을 모두 선택해주세요.");
      return;
    }

    if (!facility) {
      alert("시설 정보를 불러올 수 없습니다.");
      return;
    }

    const confirmMsg = `
시설명: ${facility.location}
주소: ${facility.address || "주소 정보 없음"}
이용 날짜: ${selectedDate.toLocaleDateString()}
이용 시간: ${selectedTimes.join(", ")}
인원: ${people}명
신청하시겠습니까?
    `;

    if (window.confirm(confirmMsg)) {
      try {
        const formattedDate = getKoreanDateString(selectedDate);

        await createRentalApplication({
          rentalId: facility.id,
          requestedDate: formattedDate,
          requestedTime: `${selectedTimes[0]} ~ ${selectedTimes[selectedTimes.length - 1]}`,
          note: "", // 필요 시 사용자 입력 연결 가능
          peopleCount: people,
        });

        alert("신청되었습니다.");
        navigate(`/rental`);
      } catch (error) {
        alert("신청 중 오류가 발생했습니다. 다시 시도해주세요.");
        console.error(error);
      }
    }
  };

  const handleCancelClick = () => {
    navigate(`/rental`);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>{facility?.location || "시설 정보 없음"}</h2>
        <div className={styles.content}>
          <div className={styles.calendarBox}>
            <div className={styles.calendarHeader}>
              <IoIosArrowBack className={styles.arrowIcon} onClick={() => handleMonthChange(-1)} />
              <span>
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </span>
              <IoIosArrowForward className={styles.arrowIcon} onClick={() => handleMonthChange(1)} />
            </div>
            <div className={styles.weekdays}>
              {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className={styles.days}>
              {generateCalendar().map((date, i) => {
                const dateStr = getKoreanDateString(date);
                const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const currentOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

                const isSameAsToday = currentOnly.getTime() === todayOnly.getTime();
                const isPastDate = currentOnly < todayOnly;
                const isDateDisabled = disabledDates.includes(dateStr);

                // 오늘이라도 reservedDates에 있으면 비활성화
                const isDisabled = isPastDate || isDateDisabled || (isSameAsToday && isDateDisabled);
                const isSelected = isSameDate(date, selectedDate);

                return (
                  <div
                    key={i}
                    className={`${styles.day} ${isDisabled ? styles.disabled : ""} ${isSelected ? styles.selected : ""}`}
                    onClick={() => !isDisabled && setSelectedDate(date)}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.infoBox}>
            {selectedDate ? (
              <>
                <p className={styles.dateLabel}>
                  {selectedDate.toLocaleDateString()} ({["일", "월", "화", "수", "목", "금", "토"][selectedDate.getDay()]})
                </p>

                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>시간 선택</h4>
                  <div className={styles.timeGrid}>
                    {Array.from({ length: 15 }, (_, i) => i + 8).map((hour) => {
                      const timeStr = `${hour.toString().padStart(2, "0")}:00`;
                      const isDisabled = disabledTimes.includes(timeStr);
                      const isSelected = selectedTimes.includes(timeStr);
                      return (
                        <button
                          key={timeStr}
                          disabled={isDisabled}
                          className={`${styles.timeBtn} ${isDisabled ? styles.disabled : ""} ${isSelected ? styles.selected : ""}`}
                          onClick={() => handleTimeClick(timeStr)}
                        >
                          {timeStr}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>인원 선택</h4>
                  <select
                    className={styles.select}
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                  >
                    {Array.from({ length: maxPeople + 1 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}명
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <p className={styles.notice}>원하는 날짜를 선택해주세요.</p>
            )}

            <div className={styles.buttonGroup}>
              <button className={styles.applyBtn} onClick={handleApplyClick}>
                신청하기
              </button>
              <button className={styles.backBtn} onClick={handleCancelClick}>
                취소하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservePage;

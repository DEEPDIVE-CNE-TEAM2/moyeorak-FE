import React, { useState } from 'react';
import styles from './SelectPanel.module.css';
import swim_black from '../../../img/swim_black.svg';
import swim_blue from '../../../img/swim_blue.svg';
import deleteIcon from '../../../img/delete.svg';

const SelectPanel = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const sports = ['수영', '축구', '테니스'];
  const facilities = ['종합레포츠타운1', '종합레포츠타운2', '종합'];
  const statuses = ['접수중', '접수마감'];

  const getSportIcon = (sport) => {
    if (sport === '수영') {
      return selectedSport === '수영' ? swim_blue : swim_black;
    }
    return swim_black;
  };

  const toggleSelect = (value, selectedValue, setter) => {
    setter(value === selectedValue ? null : value);
  };

  return (
    <>
    <div>
      <div className={styles.wrapper}>
        {/* 종목 선택 */}
        <div className={styles.sectionTitle}>종목 선택</div>
        <div className={styles.sportOptions}>
          {sports.map((sport, index) => (
            <div
              key={index}
              className={`${styles.sportItem} ${selectedSport === sport ? styles.selected : ''}`}
              onClick={() => toggleSelect(sport, selectedSport, setSelectedSport)}
            >
              <img src={getSportIcon(sport)} alt={sport} className={styles.sportIcon} />
              <div className={styles.sportLabel}>{sport}</div>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        {/* 시설 선택 */}
        <div className={styles.sectionTitle}>시설 선택</div>
        <div className={styles.facilityOptions}>
          {facilities.map((facility, index) => (
            <div
              key={index}
              className={`${styles.facilityItem} ${selectedFacility === facility ? styles.selected : ''}`}
              onClick={() => toggleSelect(facility, selectedFacility, setSelectedFacility)}
            >
              {facility}
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        {/* 접수 상태 */}
        <div className={styles.sectionTitle}>접수 상태</div>
        <div className={styles.statusOptions}>
          {statuses.map((status, index) => (
            <div
              key={index}
              className={`${styles.statusItem} ${selectedStatus === status ? styles.selected : ''}`}
              onClick={() => toggleSelect(status, selectedStatus, setSelectedStatus)}
            >
              {status}
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 항목 출력 */}
      <div className={styles.selectedChips}>
        {selectedSport && (
          <div className={styles.chip}>
            {selectedSport}
            <img
              src={deleteIcon}
              alt="삭제"
              className={styles.deleteIcon}
              onClick={() => setSelectedSport(null)}
            />
          </div>
        )}
        {selectedFacility && (
          <div className={styles.chip}>
            {selectedFacility}
            <img
              src={deleteIcon}
              alt="삭제"
              className={styles.deleteIcon}
              onClick={() => setSelectedFacility(null)}
            />
          </div>
        )}
        {selectedStatus && (
          <div className={styles.chip}>
            {selectedStatus}
            <img
              src={deleteIcon}
              alt="삭제"
              className={styles.deleteIcon}
              onClick={() => setSelectedStatus(null)}
            />
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default SelectPanel;

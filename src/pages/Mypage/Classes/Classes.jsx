import React, { useState } from 'react';
import './Classes.css';
import Navbar from '../../../components/Navbar/Navbar';
import Search from '../../../img/search.svg';
import Down from '../../../img/down.svg';
import Popupmodal from './Popupmodal/Popupmodal';

const Classes = () => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const originalRows = [
    {
      period: '2025.05.20 - 2025.06.19',
      title: '수영 (중급반)',
      schedule: '월/수/금 17:00~18:00',
      facility: '구름 실내 수영장',
      instructor: '김구름',
      status: '수강중',
      applyDate: '2025.05.20',
      price: '23,600원',
      inOrOut: '관내',
      cancelAvailable: '불가',
    },
    {
      period: '2025.05.21 - 2025.06.19',
      title: '수영 (중급반)',
      schedule: '월/수/금 17:00~18:00',
      facility: '구름 실내 수영장',
      instructor: '김구름',
      status: '취소',
    },
    {
      period: '2025.05.22 - 2025.06.19',
      title: '수영 (중급반)',
      schedule: '월/수/금 17:00~18:00',
      facility: '구름 실내 수영장',
      instructor: '김구름',
      status: '종료',
    },
  ];

  const sortedRows = [...originalRows].sort((a, b) => {
    const aDate = new Date(a.period.split(' - ')[0]);
    const bDate = new Date(b.period.split(' - ')[0]);
    return sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case '수강중':
        return 'status-badge active';
      case '취소':
        return 'status-badge cancelled';
      case '종료':
        return 'status-badge ended';
      default:
        return 'status-badge';
    }
  };

  const toggleRow = (index) => {
    if (expandedRowIndex === index) {
      setExpandedRowIndex(null);
    } else {
      setExpandedRowIndex(index);
    }
  };

  return (
    <>
      <Navbar />
      <div className="classes-wrapper">
        <div className="classes-inner">
          <div className="sort-bar">
            <button
              className="sort-dropdown"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <img src={Search} alt="search" />
              <span>{sortOrder === 'desc' ? '최근날짜순' : '오래된날짜순'}</span>
              <img src={Down} alt="arrow" />
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => { setSortOrder('desc'); setDropdownOpen(false); }}>최근날짜순</div>
                <div className="dropdown-item" onClick={() => { setSortOrder('asc'); setDropdownOpen(false); }}>오래된날짜순</div>
              </div>
            )}
          </div>

          <table className="classes-table">
            <thead>
              <tr>
                <th>기간</th>
                <th>강좌명</th>
                <th>요일/시간</th>
                <th>시설명</th>
                <th>강사명</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, idx) => (
                <React.Fragment key={idx}>
                  <tr className="clickable-row" onClick={() => row.status === '수강중' && toggleRow(idx)}>
                    <td align="center">{row.period}</td>
                    <td align="center">{row.title}</td>
                    <td align="center">{row.schedule}</td>
                    <td align="center">{row.facility}</td>
                    <td align="center">{row.instructor}</td>
                    <td align="center">
                      <div className={getStatusClass(row.status)}>{row.status}</div>
                    </td>
                  </tr>
                  {expandedRowIndex === idx && row.status === '수강중' && (
                    <>
                      <tr className="detail-row">
                        <td align="center" className="mini-title">신청일</td>
                        <td align="center">{row.applyDate}</td>
                        <td align="center" className="mini-title">관내/관외 여부</td>
                        <td align="center">{row.inOrOut}</td>
                        <td rowSpan="2" colSpan="2" align="center">
                          <button
                            className="cancel-button"
                            onClick={() => {
                              setSelectedRowData(row);
                              setIsModalOpen(true);
                            }}
                          >
                            수강취소
                          </button>
                        </td>
                      </tr>
                      <tr className="detail-row">
                        <td align="center" className="mini-title">결제금액</td>
                        <td align="center">{row.price}</td>
                        <td align="center" className="mini-title">취소 가능 여부</td>
                        <td align="center">{row.cancelAvailable}</td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <Popupmodal
          data={selectedRowData}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRowData(null);
          }}
        />
      )}
    </>
  );
};

export default Classes;

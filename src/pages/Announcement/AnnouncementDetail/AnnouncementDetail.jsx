import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import './AnnouncementDetail.css';

const AnnouncementDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, date, views } = location.state || {};

  const dummyContent = `본문 더미데이터입니다. `;

  return (
    <>
      <Navbar />
      <div className="announcement-detail-wrapper">
        <div className="announcement-detail-header">
          <div className="announcement-title">{title}</div>
          <div className="announcement-meta">
            <div className="announcement-meta-item">
              <span className="announcement-meta-label">등록일 : </span>
              <span className="announcement-meta-value">{date}</span>
            </div>
            <div className="announcement-meta-item">
              <span className="announcement-meta-label">조회수 : </span>
              <span className="announcement-meta-value">{views}</span>
            </div>
          </div>
        </div>

        <div className="announcement-content">{dummyContent}</div>

        <div className="announcement-footer">
          <button className="back-button" onClick={() => navigate('/announcement')}>
            목록보기
          </button>
        </div>
      </div>
    </>
  );
};

export default AnnouncementDetail;

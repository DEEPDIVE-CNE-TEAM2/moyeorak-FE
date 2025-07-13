import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNoticeById, incrementNoticeViewCount } from '../../../Api';
import Navbar from '../../../components/Navbar/Navbar';
import './AnnouncementDetail.css';

const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notice, setNotice] = useState(null);
  const hasFetched = useRef(false); // 중복 방지 플래그

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchNotice = async () => {
      try {
        // 조회수 1회만 증가
        await incrementNoticeViewCount(id);

        // 공지사항 데이터 조회
        const data = await getNoticeById(id);
        if (data) {
          setNotice(data);
        }
      } catch (error) {
        console.error("공지사항 조회 중 에러 발생:", error);
      }
    };

    fetchNotice();
  }, [id]);

  if (!notice) return <div>로딩 중...</div>;

  const formatDate = (isoDate) =>
    new Date(isoDate).toISOString().split('T')[0].replace(/-/g, '.');

  return (
    <>
      <Navbar />
      <div className="announcement-detail-wrapper">
        <div className="announcement-detail-header">
          <div className="announcement-title">{notice.title}</div>
          <div className="announcement-meta">
            <div className="announcement-meta-item">
              <span className="announcement-meta-label">등록일 : </span>
              <span className="announcement-meta-value">{formatDate(notice.createdAt)}</span>
            </div>
            <div className="announcement-meta-item">
              <span className="announcement-meta-label">조회수 : </span>
              <span className="announcement-meta-value">{notice.viewCount}</span>
            </div>
          </div>
        </div>

        <div className="announcement-content">{notice.content}</div>

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

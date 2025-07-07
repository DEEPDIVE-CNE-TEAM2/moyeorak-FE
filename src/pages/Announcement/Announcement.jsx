import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './Announcement.css';
import down from '../../img/down.svg';
import search from '../../img/search.svg';

const dummyAnnouncements = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `동작삼일수영장 ${i + 1}분기 아쿠아로빅 접수일정 안내`,
  date: `2025.07.${(i + 1).toString().padStart(2, '0')}`,
  views: Math.floor(Math.random() * 100),
}));

const ITEMS_PER_PAGE = 11;
const PAGE_GROUP_SIZE = 5;

const Announcement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredAnnouncements, setFilteredAnnouncements] = useState(
    [...dummyAnnouncements].sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  const [searchType, setSearchType] = useState('제목');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) {
      setFilteredAnnouncements(
        [...dummyAnnouncements].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      return;
    }

    const filtered = dummyAnnouncements.filter((item) =>
      item.title.toLowerCase().includes(keyword) // 제목으로만 검색
    );
    setFilteredAnnouncements(
      [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))
    );
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredAnnouncements.length / ITEMS_PER_PAGE);
  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);

  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />
      <div className="announcement-wrapper">
        <div className="announcement-search-bar">
          <div className="search-select-wrapper">
            <div className="search-select" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {searchType}
              <img src={down} alt="dropdown" className="dropdown-icon" />
            </div>
            {isDropdownOpen && (
              <div className="search-options">
                {['제목', '내용', '제목/내용'].map((type) => (
                  <div key={type} className="search-option" onClick={() => handleSearchTypeChange(type)}>
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="search-input-box">
            <input
              type="text"
              className="search-input"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <button className="search-button" onClick={handleSearch}>
              <img src={search} alt="search" className="search-icon" />
            </button>
          </div>
        </div>

        <table className="announcement-table">
          <thead>
            <tr className="announcement-header">
              <th style={{ flex: 1, textAlign: 'center' }}>No.</th>
              <th style={{ flex: 6, textAlign: 'left' }}>제목</th>
              <th style={{ flex: 2, textAlign: 'center' }}>등록일</th>
              <th style={{ flex: 1, textAlign: 'center' }}>조회수</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAnnouncements.map((item, index) => (
              <tr key={item.id} className="announcement-row">
                <td style={{ flex: 1, textAlign: 'center' }}>
                  {filteredAnnouncements.length - ((currentPage - 1) * ITEMS_PER_PAGE + index)}
                </td>
                <td
                  style={{ flex: 6, textAlign: 'left', cursor: 'pointer', color: '#151515' }}
                  onClick={() =>
                    navigate(`/announcement/${item.id}`, {
                      state: {
                        title: item.title,
                        date: item.date,
                        views: item.views,
                      },
                    })
                  }
                >
                  {item.title}
                </td>
                <td style={{ flex: 2, textAlign: 'center' }}>{item.date}</td>
                <td style={{ flex: 1, textAlign: 'center' }}>{item.views}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {groupStart > 1 && (
            <button className="page-btn" onClick={() => setCurrentPage(groupStart - 1)}>
              &lt;
            </button>
          )}
          {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i).map(
            (page) => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}
          {groupEnd < totalPages && (
            <button className="page-btn" onClick={() => setCurrentPage(groupEnd + 1)}>
              &gt;
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Announcement;

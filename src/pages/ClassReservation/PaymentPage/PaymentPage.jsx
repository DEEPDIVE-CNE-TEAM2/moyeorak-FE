import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../../img/아이콘최종.png';
import select from '../../../img/Select.svg';
import './PaymentPage.css';
import { getProgramDetail, enrollProgram } from '../../../Api';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProgramDetail(id)
      .then((res) => {
        setProgram(res);
        setError(null);
      })
      .catch(() => {
        setError('프로그램 정보를 불러오는 데 실패했습니다.');
        setProgram(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const formatFee = (data) => {
    const inPrice = data?.in_price ?? data?.inPrice ?? null;
    const outPrice = data?.out_price ?? data?.outPrice ?? null;
    const oldFee = data?.fee ?? null;

    const inStr = inPrice != null ? `${inPrice.toLocaleString()}원(관내)` : null;
    const outStr = outPrice != null ? `${outPrice.toLocaleString()}원(관외)` : null;
    const feeStr = oldFee != null ? `${oldFee.toLocaleString()}원` : null;

    if (inStr && outStr) return `${inStr} / ${outStr}`;
    if (inStr) return inStr;
    if (outStr) return outStr;
    if (feeStr) return feeStr;
    return '-';
  };

  const handlePayment = async () => {
    const confirmed = window.confirm('신청되었습니다.');

    if (!confirmed) return;

    try {
      const enrollmentData = {
        programTitle: program?.title,
        center: program?.location,
        usagePeriod: program?.usagePeriod,
        usageTime: program?.time,
        paidAmount:
          program?.fee ??
          program?.in_price ??
          program?.inPrice ??
          0,
      };

      await enrollProgram(enrollmentData);

      alert('신청이 완료되었습니다.');
      navigate('/classReservation');
    } catch (error) {
      console.error('신청 실패:', error);
      alert('신청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (loading) return <div className="payment-page">로딩 중...</div>;
  if (error) return <div className="payment-page">{error}</div>;

  return (
    <div className="payment-page">
      <div className="payment-header">
        <img src={logo} alt="로고" className="payment-logo" />
        <div className="payment-divider" />
      </div>

      <div className="payment-content-wrapper">
        <h1 className="payment-title">결제</h1>

        <div className="payment-container">
          <div className="info-box">
            <div className="info-header">강의</div>
            <div className="info-content">
              <div className="lecture-title">{program?.title || '-'}</div>
              <div className="lecture-price">{formatFee(program)}</div>
            </div>
          </div>

          <div className="info-box">
            <div className="info-header">결제수단</div>
            <div className="info-content-column">
              {['신용/체크카드', '휴대폰', '무통장입금'].map((method, idx) => (
                <div className="payment-method" key={idx}>
                  <img src={select} alt="선택" className="method-icon" />
                  <span>{method}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="pay-button" onClick={handlePayment}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

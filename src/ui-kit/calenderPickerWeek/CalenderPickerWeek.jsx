import React, { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { motion as m } from 'framer-motion';
import './calenderPickerWeek.scss';

function CalenderPickerWeek({
  dateList,
  handleDateSelect,
  handlePrevWeek,
  handleNextWeek,
  activeDate,
  className
}) {
  const [startTouchX, setStartTouchX] = useState(null);
  const [endTouchX, setEndTouchX] = useState(null);

  function handleTouchStart(event) {
    setStartTouchX(event.touches[0].clientX);
  }

  function handleTouchMove(event) {
    setEndTouchX(event.touches[0].clientX);
  }

  function handleTouchEnd() {
    if (!startTouchX || !endTouchX) return;
    if (endTouchX - startTouchX > 100) {
      // handle right swipe
      handlePrevWeek();
    } else if (startTouchX - endTouchX > 100) {
      // handle left swipe
      handleNextWeek();
    }
    setStartTouchX(null);
    setEndTouchX(null);
  }
  return (
    <div
      className={`calendar-picker week ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <div className="calendar-picker__prev-arrow-btn" onClick={handlePrevWeek} role="presentation">
        <FontAwesomeIcon icon={faGreaterThan} />
      </div>
      <div className="calendar-picker__dates">
        {dateList.map((date) => (
          <m.div
            key={date}
            onClick={() => handleDateSelect(date)}
            className={`calendar-picker__date ${
              date === activeDate ? 'calendar-picker__date-active' : ''
            }`}
            animate={{ scale: date === activeDate ? 1.1 : 1 }}
            transition={{ type: 'linear' }}>
            <div className="calendar-picker__day">
              <span className="display--tablet">{moment(date, 'YYYY-MM-DD').format('dd')}</span>
              <span className="display--mobile-only">
                {moment(date, 'YYYY-MM-DD').format('dd')[0]}
              </span>
            </div>
            <div className="calendar-picker__dayVal">{moment(date, 'YYYY-MM-DD').format('D')}</div>
          </m.div>
        ))}
      </div>
      <div className="calendar-picker__next-arrow-btn" onClick={handleNextWeek} role="presentation">
        <FontAwesomeIcon icon={faGreaterThan} />
      </div>
    </div>
  );
}

export default CalenderPickerWeek;

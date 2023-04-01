import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import usePageNav from '../../../../utilities/hooks/usePageNav';
import { PageNavContext } from '../../../../utilities/context/PageNavContext';
import InfoDisplay from '../../../../ui-kit/info-display/InfoDisplay';

function FyMonthRangeView() {
  const fyMonthNumber = useSelector((state) => state.entities.projects.core.fyMonth.month);
  const [{ moveToNextPage }] = usePageNav(PageNavContext);
  const fyMonth = moment(fyMonthNumber, 'M').format('MMMM');
  return (
    <div className="flex flex--column full-height">
      <div className="flex-item-grow">
        <InfoDisplay item={{ fyMonth }} name="fyMonth" label="start month" />
      </div>
      <div className="btn-container-grow">
        <button
          type="button"
          className="btn btn--md btn--matte-black"
          onClick={() => moveToNextPage('edit')}>
          edit
        </button>
      </div>
    </div>
  );
}

export default FyMonthRangeView;

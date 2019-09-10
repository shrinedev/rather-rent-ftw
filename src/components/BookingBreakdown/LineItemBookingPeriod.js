import React from 'react';
import { oneOf } from 'prop-types';
import { FormattedMessage, FormattedDate } from '../../util/reactIntl';
import moment from 'moment';
import { LINE_ITEM_NIGHT, propTypes } from '../../util/types';
import { dateFromAPIToLocalNoon } from '../../util/dates';

import css from './BookingBreakdown.css';

const BookingPeriod = props => {
  const { startDate, endDate, dateType } = props;

  const timeFormatOptions =
    dateType === 'date'
      ? {
          weekday: 'long',
        }
      : {
          weekday: 'short',
          hour: 'numeric',
          minute: 'numeric',
        };

  const dateFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  return (
    <div className={css.bookingPeriod}>
      <div className={css.bookingPeriodSection}>
        <div className={css.dayLabel}>
          <FormattedMessage id="BookingBreakdown.bookingStart" />
        </div>
        <div className={css.dayInfo}>
          <FormattedDate value={startDate} {...timeFormatOptions} />
        </div>
        <div className={css.dateInfo}>
          <FormattedDate value={startDate} {...dateFormatOptions} />
        </div>
      </div>
      <div className={css.bookingPeriodSectionRigth}>
        <div className={css.dayLabel}>
          <FormattedMessage id="BookingBreakdown.bookingEnd" />
        </div>
        <div className={css.dayInfo}>
          <FormattedDate value={endDate} {...timeFormatOptions} />
        </div>
        <div className={css.dateInfo}>
          <FormattedDate value={endDate} {...dateFormatOptions} />
        </div>
      </div>
    </div>
  );
};

const LineItemBookingPeriod = props => {
  const { booking, unitType, dateType } = props;

  // Attributes: displayStart and displayEnd can be used to differentiate shown time range
  // from actual start and end times used for availability reservation. It can help in situations
  // where there are preparation time needed between bookings.
  // Read more: https://www.sharetribe.com/api-reference/#bookings
  const { start, end, displayStart, displayEnd } = booking.attributes;
  const localStartDate = dateFromAPIToLocalNoon(displayStart || start);
  const localEndDateRaw = dateFromAPIToLocalNoon(displayEnd || end);

  const isNightly = unitType === LINE_ITEM_NIGHT;
  const endDay = isNightly ? localEndDateRaw : moment(localEndDateRaw).subtract(1, 'days');

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <BookingPeriod startDate={localStartDate} endDate={endDay} dateType={dateType} />
      </span>
    </div>
  );
};

LineItemBookingPeriod.propTypes = {
  booking: propTypes.booking.isRequired,
  dateType: oneOf(['date', 'datetime']).isRequired,
};

export default LineItemBookingPeriod;

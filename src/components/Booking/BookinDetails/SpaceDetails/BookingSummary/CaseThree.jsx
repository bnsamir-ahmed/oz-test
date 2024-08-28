import moment from "moment";

const CaseThree = ({ bookingResult, bookingData, branch }) => {

  const calcTax = (price, discount, total) => {
    if ((price === discount) && (price === total)) {
      return 0;
    } else {
      const tax = total * 14 / 100;
      return tax;
    }
  }

  const calcTotal = (price, discount, total) => {
    if ((price === discount) && (price === total)) {
      return 0;
    } else {
      const tax = calcTax(price, discount, total);
      return Math.floor(total + tax).toFixed(2);
    }
  }

  const calcDuration = (startMoment, endMoment) => {
    const duration = moment.duration(endMoment.diff(startMoment));
    const hours = duration.hours();
    const minutes = duration.minutes();
    return hours + " hours and " + minutes + " minutes"
  }

  return (
    <div className="w-100 bg_white">
      <div className="row" >
        <div className="col-lg-6 col-md-6 col-sm-12 order-summary">
          <div className="order-details">
            <h2>
              {bookingResult?.status === 'paid' ? 'Receipt' : 'Amount Due'}
              <br /> <span style={{
                fontFamily: 'roboto'
              }}>#</span>{bookingResult?.id}
            </h2>
            <div className="d-flex align-items-center justify-content-between">
              <span className="date-period">
                Date Period: {moment.unix(bookingResult?.payload?.check_in).format("MMM DD, YYYY")}
                <br />
                <span className="invoice">Invoice</span>
              </span>
              <div className="location w-40">
                {branch}
              </div>
            </div>
          </div>
          <div className="order-description">
            <div className="pill">
              <div className="d-flex align-items-center justify-content-between line">
                <span className="date-period">Description</span>
                <span className="date-period">Subtotal</span>
              </div>
              <div className="d-flex align-items-center justify-content-between item-box ">
                <span className="item-name">{bookingData?.spaceDetails.title}</span>
                <span className={`item-price ${((bookingResult?.payload?.booking_price - bookingResult?.payload?.booking_discount) >= 0 && (bookingResult?.payload?.booking_discount !== 0)) ? 'promoApplided light' : ''}`}>
                  {bookingResult?.payload?.booking_price}
                  {' '}EGP
                </span>
              </div>
              {/* {(bookingResult?.payload?.booking_price === bookingResult?.payload?.booking_discount) || ()
                ? () : ''} */}
              {bookingResult?.payload?.booking_discount !== 0 && (<div className="d-flex align-items-end justify-content-end item-box ">
                <span className={`item-price`}>
                  {bookingResult?.payload?.booking_price - bookingResult?.payload?.booking_discount} {' '}EGP
                </span>
              </div>)}
              {bookingResult?.payload?.service_price !== 0 && (<div className="d-flex align-items-center justify-content-between item-box ">
                <span className="item-name">{'Services'}</span>
                <span className={`item-price`}>
                  {bookingResult?.payload?.service_price}
                  {' '}EGP
                </span>
              </div>)}
              {bookingResult?.discount !== 0 && (<div className="d-flex align-items-center justify-content-between item-box ">
                <span className="item-name">{'Promo Code'}</span>
                <span className={`item-price`}>
                  {bookingResult?.discount}
                  {' '}EGP
                </span>
              </div>)}
              {bookingResult?.discount !== 0 && (<div className="d-flex align-items-center justify-content-between item-box ">
                <span className="item-name">{'Total'}</span>
                <span className={`item-price`}>
                  {bookingResult?.price}
                  {' '}EGP
                </span>
              </div>)}
            </div>

            <div className="d-flex align-items-center justify-content-between line">
              <span className="date-period">Tax {'14'}%</span>
              <span className="location">
                {Math.floor(calcTax(bookingResult?.payload?.booking_price, bookingResult?.payload?.booking_discount, +bookingResult?.payload?.total_price))} {' '}
                EGP
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between item-box">
              <span className="item-total">Total Price:</span>
              <span className="item-total-price">
                {calcTotal(bookingResult?.payload?.booking_price, bookingResult?.payload?.booking_discount, +bookingResult?.payload?.total_price)}
                {' '}EGP
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 order-summary-black ">
          <div className="order-details">
            <div className="line">
              <h2>{bookingData?.spaceDetails.title}</h2>
            </div>
            <div className="booking-items">
              <span>Start: {moment.unix(bookingResult?.payload?.check_in).format("dddd, MMM. D, YYYY, h:mm A")} </span>
              <span>End: {moment.unix(bookingResult?.payload?.check_out).format("dddd, MMM. D, YYYY, h:mm A")}</span>
              <span>Duration: {calcDuration(moment.unix(bookingResult?.payload?.check_in), moment.unix(bookingResult?.payload?.check_out))}</span>
              <span>Number: {bookingResult?.payload?.guests} Of People</span>

              {bookingResult?.payment_method === 'cash' && (<span>Cash notes: Total payment due in 2 days.</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CaseThree;

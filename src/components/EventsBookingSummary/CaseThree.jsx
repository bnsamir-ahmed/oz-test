import moment from "moment";

const CaseThree = ( {bookingResult, branch} ) => {
    const calcTax = (price) => {
        const tax = price * 14 / 100;
        return tax;
    }

  return (
    <div className="w-100 bg_white">
      <div className="row" >
        <div className="col-lg-6 col-md-6 col-sm-12 order-summary">
          <div className="order-details">
            <h2>
              {bookingResult?.status === 'paid' ? 'Receipt' : 'Amount Due'}
              <br /> <span style={{
                fontFamily:'roboto'
              }}>#</span>{bookingResult?.id}
            </h2>
            <div className="d-flex align-items-center justify-content-between">
              <span className="date-period">
                Date Period: {moment(bookingResult?.payload?.pro_current_start).format("MMM DD, YYYY")}
                <br />
                <span className="invoice">Invoice</span>
              </span>
              <span className="location w-40" >
                {branch}
              </span>
            </div>
          </div>
          <div className="order-description">
            <div className="pill">
              <div className="d-flex align-items-center justify-content-between line">
                <span className="date-period">Description</span>
                <span className="date-period">Subtotal</span>
              </div>
              <div className="d-flex align-items-center justify-content-between item-box ">
                <span className="item-name">{bookingResult?.payload?.event?.event_name}</span>
                <span className={`item-price ${bookingResult?.price_before_discount !== bookingResult?.price ? 'promoApplided light' : ''}`}>
                  {bookingResult?.price_before_discount} {' '}EGP
                </span>
              </div>
              {bookingResult?.price_before_discount !== bookingResult?.price ? (<div className="d-flex align-items-end justify-content-end item-box ">
                <span className={`item-price`}>
                  {bookingResult?.price} {' '}EGP
                </span>
              </div>) : ''}
            </div>

            <div className="d-flex align-items-center justify-content-between line">
              <span className="date-period">Tax {'14'}%</span>
              <span className="location">
                {Math.floor(calcTax(bookingResult?.price))} {' '}
                EGP
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between item-box">
              <span className="item-total">Total Price:</span>
              <span className="item-total-price">
              {Math.floor(bookingResult?.price) + Math.floor(calcTax(bookingResult?.price))} {' '}
                EGP
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 order-summary-black ">
          <div className="order-details">
            <div className="line">
              <h2>{bookingResult?.payload?.event?.event_name}</h2>
            </div>
            <div className="booking-items">
            <span>Start : {moment(bookingResult?.payload?.event?.dates[0]?.check_in_date).format("dddd, MMM. D, YYYY")} </span>
              <span>End : {moment(bookingResult?.payload?.event?.dates[0]?.check_out_date).format("dddd, MMM. D, YYYY")}</span>
              {/* <span>Duration : {bookingResult?.payload?.pro_current_months} Months</span> */}

              {bookingResult?.payment_method === 'cash' && (<span>Cash notes: Total payment due in 2 days.</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CaseThree;

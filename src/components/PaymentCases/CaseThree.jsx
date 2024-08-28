import moment from "moment";

const CaseThree = ( {bookingResult} ) => {

  return (
    <div className="w-100 bg_white">
      <div className="row" >
        <div className="col-lg-6 col-md-6 col-sm-12 order-summary">
          <div className="order-details">
            <h2>
              {bookingResult?.invoice_title}
              <br /> #{bookingResult?.invoice_id}
            </h2>
            <div className="d-flex align-items-center justify-content-between">
              <span className="date-period">
                Date Period: {moment(bookingResult?.invoice_date).format("MMM DD, YYYY")}
                <br />
                <span className="invoice">Invoice</span>
              </span>
              <span className="location w-40" 
              dangerouslySetInnerHTML={{
                __html: bookingResult?.invoice_address?.replace(/\n/g, "<br />"),
              }}>
                {/* {bookingResult.invoice_address} */}
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
                <span className="item-name">{bookingResult?.title}</span>
                <span className="item-price">
                  {bookingResult?.invoice_price} {' '}EGP
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between line">
              <span className="date-period">Tax {bookingResult?.invoice_tax}%</span>
              <span className="location">
                {Math.floor(bookingResult?.invoice_tax_value)} {' '}
                EGP
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between item-box">
              <span className="item-total">Total Price:</span>
              <span className="item-total-price">
                {Math.floor(bookingResult?.invoice_total)} {' '}
                EGP
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 order-summary-black ">
          <div className="order-details">
            <div className="line">
              <h2>{bookingResult?.title}</h2>
            </div>
            <div className="booking-items">
              <span>Date: {moment(bookingResult?.start_date, 'HH:mm:ss').format("dddd, MMM. D, YYYY")} </span>
              {/* <span>
                Time :{bookingResult.course?.start_time}{"-"}
                {bookingResult.course?.end_time}
              </span> */}
              {bookingResult?.payment_type === 'cash' && (<span>Cash notes: {bookingResult?.payment_type}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CaseThree;

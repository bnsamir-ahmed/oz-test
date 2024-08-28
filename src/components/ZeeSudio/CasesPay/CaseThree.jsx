import moment from "moment";

const CaseThree = ( {bookingResult, branch} ) => {
 
  const courseTime = Math.floor(bookingResult.training.end_time.slice(0, 2)) - Math.floor(bookingResult.training.start_time.slice(0, 2)) ;
   
  return (
    <div className="">
      <div className="w-100 row">
        <div className="col-lg-6 col-md-6 col-sm-12 order-summary">
          <div className="order-details">
            <h2>
              {bookingResult.invoice_title}
              <br /> #{bookingResult.invoice_id}
            </h2>
            <div className="d-flex align-items-center justify-content-between">
              <span className="date-period">
                Date Period:{" "}
                {moment(bookingResult.invoice_date).format("MMM DD, YYYY")}
                <br />
                <span className="invoice">Invoice</span>
              </span>
              <span
                className="location w-40">{branch}</span>
            </div>
          </div>
          <div className="order-description">
            <div className="pill">
              <div className="d-flex align-items-center justify-content-between line">
                <span className="date-period">Description</span>
                <span>Subtotal</span>
              </div>
              <div className="d-flex align-items-center justify-content-between item-box ">
                <span className="item-name">
                  {bookingResult.training.title}
                </span>
                <span className="item-price">
                  {bookingResult.invoice_price} EGP
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between line">
              <span className="date-period">
                Tax {bookingResult?.invoice_tax}%
              </span>
              <span className="location">
                {Math.floor(bookingResult.invoice_tax_value)} EGP
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between item-box">
              <span className="item-total">Total Price:</span>
              <span className="item-total-price">
                {Math.floor(bookingResult.invoice_total)} EGP
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 order-summary-black ">
          <div className="order-details">
            <div className="line">
              <h2>{bookingResult.training.title}</h2>
            </div>
            <div className="booking-items">
              <span>
                Date:{" "}
                {moment(bookingResult.training.start_date, "HH:mm:ss").format(
                  "dddd, MMM. D, YYYY"
                )}
              </span>
              <span>
                Time:{" "}
                {moment(bookingResult.training.start_time, "HH:mm:ss").format(
                  "hh:mm a"
                )}
                {"  "}
                {"-"}
                {moment(bookingResult.training.end_time, "HH:mm:ss").format(
                  "hh:mm a"
                )}{" "}
                ({courseTime} hours)
              </span>
              {bookingResult.payment_type === "cash" && (
                <span>Cash notes: {bookingResult.payment_type}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CaseThree;

import { useEffect, useState } from "react";
import Paragraph from "./Paragraph";

const Invoice = () => {

    const invoice = JSON.parse(localStorage.getItem('OZInvoice')) || {};

    const setDate = (roomdate) => {
      const parts = roomdate.split(/[- :]/);
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      const day = parseInt(parts[2]);

      const date = new Date(year, month - 1, day);

      const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
      };

      return date.toLocaleDateString('en-US', options);
  };

  const setTime = (roomdate) => {
    const parts = roomdate.split(/[- :]/);

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    const hour = parseInt(parts[3]);
    const minute = parseInt(parts[4]);

    const date = new Date(year, month - 1, day, hour, minute);

    const timeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    const formattedTime = date.toLocaleTimeString('en-US', timeFormatOptions);

    return formattedTime
  };

    const getPeriod = (start, end) => {
      const dateStart = new Date(start);
      const dateEnd = new Date(end);
      const durationInMs = dateEnd - dateStart;
      const durationHours = Math.floor(durationInMs / (1000 * 60 * 60));
      const durationMinutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));

      return(
          <>
             {durationHours} Hours - {durationMinutes} MIN
          </>
      )
    };

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 order-summary">
                        <div className="order-details">
                            <h2>{invoice?.paymentMethod ==='cash' ? 'Amount Due' : 'Receipt'} 
                              <br/> 
                              <span style={{
                                fontFamily: 'Roboto'
                              }}>#</span>{invoice.invoice_info?.invoice_no}</h2>
                            <div className="d-flex justify-content-between">
                              <div>
                                {invoice.dates && (<span className="date-period">Date Period: {invoice.dates[0]?.check_in_date}
                                  <br/>
                                  <span className="invoice">Invoice</span>
                                </span>)}
                                {invoice.checkIn && (<span className="date-period">Date Period: {setDate(invoice.checkIn)}
                                  <br/>
                                  <span className="invoice">Invoice</span>
                                </span>)}
                              </div>
                              <div>
                                <Paragraph className="location mb-0">{invoice.invoice_info?.address}</Paragraph>
                                <Paragraph className="location mb-0">{invoice.invoice_info?.distance}</Paragraph>
                              </div>
                            </div>
                        </div>
                          <div className="order-description">
                            <div className="pill">
                                <div className="d-flex align-items-center justify-content-between line">
                                    <span className="date-period">Description</span>
                                    <span className="location">Subtotal</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between item-box ">
                                    <span className="item-name">{invoice.title}</span>
                                    <span className="item-price">{invoice.price} EGP</span>
                                </div>
                                {invoice.servicesPrice && (<div className="d-flex align-items-center justify-content-between item-box ">
                                    <span className="item-name">{'services'}</span>
                                    <span className="item-price">{invoice.servicesPrice} EGP</span>
                                </div>)}
                            </div>

                                <div className="d-flex align-items-center justify-content-between line">
                                  <span className="date-period">Tax 14%</span>
                                  {!invoice.totalPrice && (<span className="location">
                                    {(invoice.price * 14) / 100 } EGP
                                  </span>)}
                                  {invoice.totalPrice && (<span className="location">
                                    {(invoice.totalPrice * 14) / 100 } EGP
                                  </span>)}
                                </div>
                                <div className="d-flex align-items-center justify-content-between item-box">
                                  <span className="item-total">
                                    Total Price:
                                  </span>
                                  {!invoice.totalPrice && (<span className="item-total-price">
                                    {(+invoice.price * 14) /
                                      100 +
                                      +invoice.price}{" "}
                                    EGP
                                  </span>)}
                                  {invoice.totalPrice && (<span className="item-total-price">
                                    {(+invoice.totalPrice * 14) /
                                      100 +
                                      +invoice.totalPrice}{" "}
                                    EGP
                                  </span>)}
                                </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 order-summary-black ">
                        <div className="order-details">
                            <div className="line">
                                <h2>{invoice.venue.title}</h2>
                            </div>
                                <div className="booking-items">
                                  {invoice.dates && (<>
                                    <span>
                                      Date : {invoice.dates[0]?.check_in_date}
                                    </span>
                                    <span>
                                      Time : {invoice.dates[0]?.check_in_time} {'-'}
                                      {invoice.dates[0]?.check_out_time}
                                    </span>
                                  </>)}
                                  {invoice.checkIn && (
                                    <>
                                      <span>
                                        Date : {setDate(invoice.checkIn)}
                                      </span>
                                      <span>
                                        Time : {setTime(invoice.checkIn)} {'-'} {setTime(invoice.checkIn)}
                                      </span>
                                    </>
                                  )}
                                  <span>
                                    Number of people :{" "}
                                    {invoice.numberOfPeople} People
                                  </span>
                                    {invoice.payment && (<span>
                                      Cash notes : Total payment due in 2 days.
                                    </span>)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
        </>
    )
};
export default Invoice;
// 3c9a
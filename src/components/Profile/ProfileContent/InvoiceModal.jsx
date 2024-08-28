import {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Paragraph from  '../../UI/Paragraph';

const InvoiceModal = ({show, onHide}) => {

    const [details, setDetails] = useState(JSON.parse(localStorage.getItem('invoiceOZ')));

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('invoiceOZ'));
        setDetails(data);
    },[])


    const setDate = (roomdate) => {

        // const dateObj = new Date(roomdate.replace(' PM', ''));
        // const options = { year: 'numeric', month: 'short', day: 'numeric' };
        // const formattedDate = dateObj.toLocaleDateString('en-US', options);

        // return formattedDate;
        
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

        return formattedTime;
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            keyboard={false}
            centered
            className='modal-invites'>
                <Modal.Body className={`justify-content-center align-items-center p-4`}>
                    <Paragraph className="h2-description">Invoice Detials</Paragraph>
                    <div className="">
                        <div className="d-flex flex-column">
                            <div className=" order-summary">
                            <div className="order-details">
                            <h2>Amount Due<br/>{`# ${details?.invoice_info?.invoice_no}`}</h2>
                            <div
                            className="d-flex align-items-center justify-content-between">
                            <span
                            className="date-period">Date Period: {setDate(details?.check_in_formmated)}<br/>
                            <span
                            className="invoice">Invoice</span></span>
                            <span className="location">{details?.invoice_info?.address}</span>
                            </div>
                            </div>
                            <div className="order-description">
                            <div className="pill">
                            <div
                            className="d-flex align-items-center justify-content-between line">
                            <span
                            className="date-period">Description</span>
                            <span className="location">Subtotal</span>
                            </div>
                            <div
                            className="d-flex align-items-center justify-content-between item-box ">
                            <span
                            className="item-name">Meeting room 01</span>
                            <span className="item-price">
                                {details?.booking_price} EGP
                            </span>
                            </div>
                            </div>
                            <div
                            className="d-flex align-items-center justify-content-between line">
                            <span
                            className="date-period">Tax 14%</span>
                            <span className="location">{details?.booking_price * 14 / 100} EGP</span>
                            </div>
                            <div
                            className="d-flex align-items-center justify-content-between item-box">
                            <span
                            className="item-total">Total Price:</span>
                            <span className="item-total-price">
                            {parseInt(details?.booking_price, 10) + (details?.booking_price * 14 / 100)} EGP
                            </span>
                            </div>
                            </div>
                            </div>
                            <div className="order-summary-black ">
                            <div className="order-details">
                            <div className="line">
                            <h2>{details?.name}</h2>
                            </div>
                            <div className="booking-items">
                            <span>Date : {setDate(details?.check_in_formmated)}</span>
                            <span>Time : {details && setTime(details?.check_in_formmated)} - {details && setTime(details?.check_out_formmated)}</span>
                            <span>Number of people : {details && details?.invites.length} People</span>
                            {/* <span>Cash notes : Total payment due in 2 days.</span> */}
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
        </Modal>
    )
};

export default InvoiceModal;


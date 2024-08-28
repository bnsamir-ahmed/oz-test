import Modal from 'react-bootstrap/Modal';
import Paragraph from  '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import { useState } from 'react';
import CancelationReasonModal from './CancelationReasonModal';

const CancelBookingModalConfirm = (props)=>{
    const [show, setShow] = useState(false);
    const handelOpen = () => {
        props.onHide()
        setShow(true)}
    const handelClose = () => setShow(false);
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                keyboard={false}
                centered
                className='modal-invites'>
                    <Modal.Body className={`justify-content-center align-items-center text-center p-5`}>
                        <Paragraph className="h2-description">Are you sure for cancel booking ?</Paragraph>
                        <div className="row g-3 text-center justify-content-between">
                            <div className='col-6'>
                                <Button 
                                    tagType='link'
                                    className="btn btn_outline_black outline_grey auth_btn_padding btn_default w-100" 
                                    onClick={props.onHide}> 
                                    No                                               
                                </Button>
                            </div>
                            <div className='col-6'>
                                <Button 
                                    tagType='link'
                                    className="btn btn_outline_black btn_default auth_btn_padding w-100"
                                    onClick={handelOpen}> 
                                    Yes                                               
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
            </Modal>
            <CancelationReasonModal 
                show={show}
                onHide={handelClose}
                booking_id={props.booking_id} 
            />
        </>
    );
}
export default CancelBookingModalConfirm;
import Modal from 'react-bootstrap/Modal';
import Paragraph from  './Paragraph';


const TermsAndConditionsModal = (props) => {
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                keyboard={false}
                centered
                className='modal-invites'>
                    <Modal.Body className={`justify-content-center align-items-center p-4`}>
                        <Paragraph className="h2-description">Terms & Conditions</Paragraph>
                    </Modal.Body>
            </Modal>
        </>
    )
};
export default TermsAndConditionsModal;
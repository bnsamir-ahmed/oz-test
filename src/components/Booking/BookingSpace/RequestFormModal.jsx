import Modal from 'react-bootstrap/Modal';
import RequestForm from './RequestForm';

const RequestFormModal = (props) => {

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                centered
                backdropClassName="custom-backdrop">
                     <Modal.Header closeButton style={{border: 'none'}}></Modal.Header>
                    <Modal.Body className={`justify-content-center align-items-center p-5 pt-3`}>
                        <RequestForm venueId={props.venueId}/>
                    </Modal.Body>
            </Modal>
            
        </>
    )

}
export default RequestFormModal;
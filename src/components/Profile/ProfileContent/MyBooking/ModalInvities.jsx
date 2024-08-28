import Modal from 'react-bootstrap/Modal';
import Paragraph from  '../../../UI/Paragraph';
import Button from '../../../UI/Button';

const ModalInvities = (props) => {
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                keyboard={false}
                centered
                className='modal-invites'>
                    <Modal.Body className={`justify-content-center align-items-center p-5`}>
                        <Paragraph className="h2-description">Invites</Paragraph>
                        <div className='invited_person'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex align-items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <path d="M7.11914 30.571C7.11914 30.571 10.8342 25.8281 20.0008 25.8281C29.1675 25.8281 32.8826 30.571 32.8826 30.571" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M19.9967 3.32812C10.792 3.32812 3.33008 10.79 3.33008 19.9948C3.33008 29.1995 10.792 36.6615 19.9967 36.6615C29.2014 36.6615 36.6634 29.1995 36.6634 19.9948C36.6634 10.79 29.2014 3.32812 19.9967 3.32812Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M20 20C22.7615 20 25 17.7615 25 15C25 12.2386 22.7615 10 20 10C17.2385 10 15 12.2386 15 15C15 17.7615 17.2385 20 20 20Z" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <Paragraph className='ms-3 grey-span mb-0'>Admin</Paragraph>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
            </Modal>
        </>
    );
}
export default ModalInvities;
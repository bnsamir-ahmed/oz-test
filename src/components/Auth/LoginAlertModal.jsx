import Modal from 'react-bootstrap/Modal';
import Paragraph from  '../UI/Paragraph';
import Button from '../UI/Button';

import './Auth.css';

const LoginAlert = (props) => {
    
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                keyboard={false}
                backdropClassName="custom-backdrop"
                centered>
                    <Modal.Header closeButton style={{border: 'none'}}></Modal.Header>
                    <Modal.Body className={`justify-content-center align-items-center p-4`}>
                        <div className="text-center">
                        <Paragraph className="hand-write mb-0">Please,</Paragraph>
                        <Paragraph className="bold-head">login first</Paragraph>
                            <Button    
                                tagType='link'
                                to={'/login'}
                                className='btn btn_outline_black w-75 py-2'>Login</Button>
                        </div>
                    </Modal.Body>
            </Modal>
        </>
    )

}
export default LoginAlert;
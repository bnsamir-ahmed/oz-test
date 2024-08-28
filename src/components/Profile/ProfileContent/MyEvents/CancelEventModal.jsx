import Modal from 'react-bootstrap/Modal';
import Paragraph from  '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import {cancelEventAttend } from '../../../../apis/Events';
import { useNavigate } from 'react-router-dom';
import { Modal as modal } from 'antd';

const CancelEventModal = (props) => {

    const navigate = useNavigate();

    const cancel = async () => {
        try{
            const res = await cancelEventAttend(props.token, props.userId, props.event_attend_id);
            modal.success({
                title: 'success',
                content: res.message,
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            });
            props.onHide();
            navigate('/profile/myevents');
        }catch (error){
            Modal.error({
                title: error.response.data.status  || "Error",
                content: error.response.data.message || "An error occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            });
        }
    };

    return (
        <>
             <Modal
                show={props.show}
                onHide={props.onHide}
                keyboard={false}
                centered
                className='modal-invites'>
                    <Modal.Body className={`justify-content-center align-items-center text-center p-5`}>
                        <Paragraph className="h2-description">Are you sure for cancel Attending event ?</Paragraph>
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
                                    onClick={cancel}> 
                                    Yes                                               
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
            </Modal>
        </>
    )
}
export default CancelEventModal;
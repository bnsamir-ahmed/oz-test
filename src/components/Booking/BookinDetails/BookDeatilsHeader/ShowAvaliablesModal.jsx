import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Paragraph from '../../../UI/Paragraph';
import Button from '../../../UI/Button';

const ShowAvaliablesModal = (props) => {

    const setTime = (obj) =>{
        const date = new Date(obj);
        const time = date.toLocaleTimeString('en-US', { timeStyle: 'medium' });
        return time;
    };

    return (
        <>
            <Modal
                    show={props.show}
                    onHide={props.onHide}
                    keyboard={false}
                    backdropClassName="custom-backdrop"
                    centered>
                        <Modal.Body className={`justify-content-center align-items-center p-4`}>
                            <div className="bold-head mb-3 p-0">Room isn't available</div>
                            <Paragraph className="bold-head mb-3 p-0">avaliable Times</Paragraph>
                            <ul>
                                {props.avaliableDate && props.avaliableDate.map((item, index)=>{
                                    return (
                                        <div className="form-check" key={index}>
                                            <p>
                                                from: {setTime(item.from)} - to : {setTime(item.to)}
                                            </p>
                                        </div>
                                    )
                                })
                                }
                            </ul>
                        </Modal.Body>
            </Modal>
        </>
    )
};

export default ShowAvaliablesModal;
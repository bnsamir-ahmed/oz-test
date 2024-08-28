import React, { useState } from 'react';
import {Formik} from 'formik';
import Button from '../../../UI/Button';
import mobileLabel from '../../../../assets/images/icons/Smartphone 2.png';
import submit_mark from '../../../../assets/images/submit_mark.svg';
import editProfile from '../../../../assets/images/icons/editprofile.png';
import { RequestUpdateUserInfo } from '../../../../apis/User';
import OtpModal from './OtpModal';
import { Modal } from 'antd';

const RequestChangePhone = ({prevPhone}) => {

    const [disabledPhone, setDisabledPhone] = useState(true);
    const [show, setShow] = useState(false);
    const [keyInput, setInputKey] = useState('');
    const [oldValue, setOldValue] = useState('');
    const [newValue, setNewValue] = useState('');

    const handleClose = () => setShow(false);

    const requestUpdateData = async (key, old_value, new_value) => {
        try {
            const result = await RequestUpdateUserInfo(key, old_value, new_value);
            setShow(true);
            setInputKey(key);
            setOldValue(old_value);
            setNewValue(new_value);

        } catch (error) {
            Modal.error({
                title: error.response.data.status || "Error",
                content: error.response.data.message || "An Unknown Error Occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    phone: prevPhone ? prevPhone : '',
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    requestUpdateData('phone', prevPhone, values.phone)
                }}
                enableReinitialize>
                {({ 
                    values, 
                    handleChange,
                    handleBlur,
                    handleSubmit }) => (
                    <form className="profile-edit">
                        <div className="form__group field my-3">
                            <label htmlFor="phone"
                                className="form__label d-flex align-items-center justify-content-start">
                                {disabledPhone && <img src={mobileLabel} alt="name" className="me-2"/>}
                                Mobile Number
                            </label>
                            <div className='input-group'>
                                <input 
                                    id="phone" 
                                    placeholder="Phone No." 
                                    className="form-control form__field" 
                                    type='number'
                                    disabled={disabledPhone}
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {disabledPhone && <Button
                                    tagType='link'
                                    className="p-0 input-group-text" 
                                    id="inputGroupPrepend2"
                                    onClick={(e)=>{e.preventDefault();
                                        setDisabledPhone(!disabledPhone)}}>
                                    <img src={editProfile} alt='editIcon'/>
                                    </Button>}
                                {!disabledPhone && <Button
                                    tagType='button'
                                    type='submit'
                                    onClick={handleSubmit}
                                    className="p-0 input-group-text" 
                                    id="inputGroupPrepend2">
                                    <img src={submit_mark} alt='editIcon'/>
                                </Button>}
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            <OtpModal
                show={show}
                onHide={handleClose}
                keyInput={keyInput}
                newValue={newValue}
                oldValue={oldValue}
            />
        </>
    )
};
export default RequestChangePhone;
import { useEffect, useState, useContext } from 'react';
import {Formik} from 'formik';
import * as Yup from "yup";
import Modal from 'react-bootstrap/Modal';
import Paragraph from  '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import { getListMembershipTypes } from '../../../../apis/MembershipApi';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import { addExtraBundle } from '../../../../apis/User';
import { Modal as modal } from 'antd';

const ExtrabundlesModal = (props) => {

    const [types, setTypes] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(()=>{
        const getMemebershipTypes = async () => {
            try {
                const result = await getListMembershipTypes(token, 'yes');
                setTypes([...result['corporate'], ...result['individual']]);
            }catch (err){console.log(err)}
        }
        getMemebershipTypes();
    },[token]);

    const addExtra = async (values)=>{
        try{
            const result = await addExtraBundle(token, values.bundle);
            modal.success({
                title: result.status,
                content: result.message,
                centered: true,
                maskClosable: true,
                closable: true,
                footer: false
            })
            props.onHide()
        }catch(error){
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
                    <Modal.Body className={`justify-content-center align-items-center p-4`}>
                        <Paragraph className="h2-description">business bundles</Paragraph>
                        <Formik
                            initialValues={{
                                bundle: '',
                            }}
                            onSubmit={async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                addExtra(values)
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    bundle: Yup.string().required('Please Select Any Bundel')
                                })
                            }
                            >
                                {({ 
                                    values, 
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit }) => (

                                    <form className='m-4' onSubmit={handleSubmit}>
                                        { types && types.map((type, index) => {
                                            return (
                                                <div className="d-flex justify-content-start align-items-center form-check border-bottom p-3" key={index}>
                                                    <input 
                                                        className={
                                                            errors.cancelReason && touched.cancelReason
                                                            ? "form-check-input mt-0 ms-0 me-3 is-radio-invalid"
                                                            : "form-check-input mt-0 ms-0 me-3"
                                                        } 
                                                        type="radio" 
                                                        name='bundle' 
                                                        value={type.id} 
                                                        id={type.id}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}/>
                                                    <label className="form-check-label cancel_label" htmlFor={type.id}>
                                                        {type.name}
                                                    </label>
                                                </div>
                                            )
                                        })}
                                        {errors.bundle && touched.bundle && <p className='text-danger mb-0'>{errors.bundle}</p>}
                                        <div className='text-center mt-3'>
                                            <Button 
                                                tagType='button'
                                                type='submit'
                                                className="btn btn_outline_black btn_default auth_btn_padding"> 
                                                save                                               
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                    </Modal.Body>
            </Modal>
        </>
    );
}
export default ExtrabundlesModal;
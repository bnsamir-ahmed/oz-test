import { useState, useEffect, useContext } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Paragraph from '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import { getVenuesById, createIssue } from '../../../../apis/config';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import { Modal } from 'antd';

const AddPlacesIssueDetails = ()=>{

    const [venues, setVenues] = useState([]);
    const { branchId, userId } = useContext(AuthContext);
    const {case_id, type_id, id} = useParams();
    const caseId = case_id.split('_')[1];
    const typeId = type_id.split('_')[1];

    useEffect(()=>{
        const source = axios.CancelToken.source();

        getVenuesById(source, branchId).then(res=>{
            setVenues(res);
        }).catch(err=>{console.log(err)})

        return ()=>source.cancel();
    },[]);

    const submitIssue = async (values) => {
        try {
            const result = await createIssue(userId, 
                caseId,
                typeId,
                id,
                values.picked,
                branchId,
                values.comment,
                values.code);
                Modal.success({
                    title: result.message,
                    content: result.message,
                    footer: false,
                    centered: true,
                    closable: true,
                    maskClosable: true,
                });
        }catch (error){
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
            <div className="container py-4 px-sm-5 px-3">
                <div className="head-form">
                    <h2>Add place & comment</h2>
                </div>
                <div>
                    <Formik
                        initialValues={{
                            code: '',
                            picked: '',
                            comment: ''
                        }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            submitIssue(values);
                        }}>
                            {({ 
                                values, 
                                handleChange,
                                handleBlur,
                                handleSubmit }) => (
                                    <form className="profile-edit" onSubmit={handleSubmit}>
                                        <div className="form__group field my-3">
                                            <label htmlFor="code"
                                                className="form__label d-flex align-items-center justify-content-start">
                                                Location
                                            </label>
                                            <div className='input-group'>
                                                <input 
                                                    id="code" 
                                                    placeholder="Enter your code" 
                                                    className="form-control form__field" 
                                                    type='text'
                                                    value={values.code}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </div>
                                        <div className='form__group field my-3'>
                                            {venues && venues.map((venue, index) => {
                                                return (
                                                    <div className='card card_event p-3 mb-3' key={index}>
                                                        <div className='row g-3 align-items-center'>
                                                            <div className='col-lg-3 col-12 d-flex align-items-center'>
                                                                <img src={venue.logo} alt='event-img' width={'100%'} height={'125px'} style={{
                                                                    objectFit:'cover'
                                                                }}/>
                                                            </div>
                                                            <div className='col-lg-7 col-md-8 col-12'>
                                                                <Paragraph className='card-title mb-0'>{venue.title}</Paragraph>
                                                            </div>
                                                            <div className='col-lg-2 col-md-4 col-12 d-flex justify-content-end'>
                                                                <input
                                                                    name='picked' 
                                                                    className="form-check-input issue_checkbox" 
                                                                    type='radio' 
                                                                    value={venue.id}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    id="flexCheckDefault"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="form__group field my-3">
                                            <label htmlFor="comment"
                                                className="form__label d-flex align-items-center justify-content-start">
                                                comment
                                            </label>
                                            <div className='input-group'>
                                                <input 
                                                    id="comment" 
                                                    placeholder="Enter your comment" 
                                                    className="form-control form__field" 
                                                    type='text'
                                                    value={values.comment}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center py-3">
                                            <Button 
                                                tagType='button'
                                                type="submit" 
                                                className="btn_outline_black auth_btn_padding">Confirm</Button>
                                        </div>
                                    </form>
                                )}
                    </Formik>
                </div>
            </div>
        </>
    )
};
export default AddPlacesIssueDetails;
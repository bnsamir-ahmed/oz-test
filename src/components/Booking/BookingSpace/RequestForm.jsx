import { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import Button  from '../../UI/Button';
import Paragraph from '../../UI/Paragraph';
import {requestBooking} from '../../../apis/Booking';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import {Modal as modal} from 'antd';

const RequestForm = ({venueId})=>{

    const {token, userId, branchId} = useContext(AuthContext);

    const handleSubmit = async (values)=>{
        try{
            const result = await requestBooking(token, userId, branchId, 
                venueId, values.date, values.company_name, values.activities, values.comments);
                modal.success({
                    title: result.status,
                    content: result.message,
                    footer: false,
                    centered: true,
                    closable: true,
                    maskClosable: true
                });
        }catch(error){
            modal.error({
                title: error.response.data.status  || "Error",
                content: error.response.data.message || "An error occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            });
        }
    }
    return (
        <>
            <Formik 
                initialValues={
                    { 
                        company_name: '',
                        activities: '',
                        comments: '',
                        date: ''
                    }
                }
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 0));
                    handleSubmit(values);
                }}
                validationSchema={Yup.object().shape({
                    company_name: Yup.string().required(),
                    comments: Yup.string().required(),
                    date: Yup.string().required()
                })}>
            {props => {
                const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset
                } = props;
            return (
                <form className="row" onSubmit={handleSubmit}>
                    <Paragraph className="bold-head mb-3 p-0">Inquire</Paragraph>
                    <div className="form__group field my-3 group-check">
                        <label htmlFor="company_name" className="form__label">Company Name</label>
                        <input 
                            id='company_name'
                            type="text"
                            className={
                                errors.company_name && touched.company_name
                                ? "form__field is-invalid"
                                : "form__field"
                            }
                            placeholder="Enter Your Company Name"
                            name="company_name"
                            value={values.company_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        /> 
                        {errors.company_name && touched.company_name && <p className='text-danger mb-0'>{errors.company_name}</p>}
                    </div>
                    <div className="form__group field my-3">
                        <label htmlFor="date"
                            className="form__label d-flex align-items-center justify-content-start">select date</label>
                        <input 
                            type={"date"}
                            id="date" 
                            name="date"
                            placeholder="select Date"
                            className="form__field"
                            value={values.date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                           />
                        {errors.date && touched.date && <p className='text-danger mb-0'>{errors.date}</p>}
                    </div>
                    {/* <div className="form__group field my-3 group-check">
                        <label htmlFor="activities" className="form__label">Activities</label>
                        <Select
                            id='activities'
                            value={values.activities || undefined}
                            defaultValue={values.activities || undefined}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form__field placeholderSelect"
                            placeholder={'Select user activities'}
                            bordered={false}>
                                <Select.Option value="company">company</Select.Option>
                                <Select.Option value="individual">individual</Select.Option>
                                <Select.Option value="startup">startup</Select.Option>
                        </Select>
                        {errors.activities && touched.activities && <p className='text-danger mb-0'>{errors.activities}</p>}
                    </div> */}
                    <div className="form__group field my-3 group-check">
                        <label htmlFor="comments" className="form__label">Comments</label>
                        <input 
                            id='comments'
                            type="text"
                            className={
                                errors.comments && touched.comments
                                ? "form__field is-invalid"
                                : "form__field"
                            }
                            placeholder="Enter Your Comments"
                            name="comments"
                            value={values.comments}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        /> 
                        {errors.comments && touched.comments && <p className='text-danger mb-0'>{errors.comments}</p>}
                    </div>
                    
                    <div className="d-flex justify-content-center py-3">
                        <Button 
                            tagType='button'
                            type="submit" 
                            className="btn_outline_black">Submit</Button>
                    </div>
                </form>
            )}}
            </Formik>
        </>
    )
}
export default RequestForm;



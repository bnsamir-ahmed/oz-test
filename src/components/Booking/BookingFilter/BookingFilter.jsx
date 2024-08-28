import React, { useContext } from 'react';
import { Formik } from 'formik';
import { getFacilities, getFilters } from '../../../apis/FilterBooking';
import './BookingFilter.css';
import Button from '../../UI/Button';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import { Modal, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';

const BookingFilter = ({ isOpen, placeId, getFilteredData }) => {

    const { token, userId, branchId } = useContext(AuthContext);

    const capacityList = [
        '+1',
        '+2',
        '+3',
        '+4',
        '+5',
        '+6',
        '+7',
        '+8',
        '+9',
        '+10',
    ];

    const { error, data: facilities } = useQuery({
        queryKey: ['get-facilites'],
        queryFn: ({ signal }) => getFacilities(token, signal)
    });

    const handleSubmit = async (values) => {
        try {
            const result = await getFilters(
                token,
                userId,
                branchId,
                placeId,
                values.date,
                values.capacity,
                values.facilities);
            getFilteredData(result);
        }
        catch (error) {
            Modal.error({
                title: error.response.data.status || "Error",
                content: error.response.data.message || "An Unknown Error Occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            })
        }
    }
    return (
        <>
            {isOpen && (
                <Formik
                    initialValues={
                        {
                            date: '',
                            capacity: '',
                            facilities: '',
                        }
                    }
                    onSubmit={async values => {
                        await new Promise(resolve => setTimeout(resolve, 0));
                        handleSubmit(values);
                    }}>
                    {props => {
                        const {
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        } = props;
                        return (
                            <div className='border-top'>
                                <div className="container-fluid">
                                    <form className="form-filter" onSubmit={handleSubmit}>
                                        <div className="filter-component row g-3 d-flex align-items-center justify-content-around">
                                            <div className='col-xxl-3 col-md-2'>
                                                <div className="input-group">
                                                    <input
                                                        type="date"
                                                        name='date'
                                                        value={values.date}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className="form__field placeholderSelect"
                                                        placeholder='Select date' />
                                                </div>
                                            </div>
                                            <div className='col-xxl-3 col-md-3'>
                                                <Select
                                                    id='capacity'
                                                    name='capacity'
                                                    defaultValue={values.capacity || undefined}
                                                    value={values.capacity || undefined}
                                                    className="form__field placeholderSelect"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    bordered={false}
                                                    placeholder={'Choose capacity'}
                                                >
                                                    {capacityList && capacityList.map((item, index) => (
                                                        <Select.Option key={index} value={item}>
                                                            {item}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className='col-xxl-3 col-md-3'>
                                                <Select
                                                    id='facilities'
                                                    name='facilities'
                                                    defaultValue={values.facilities || undefined}
                                                    value={values.facilities || undefined}
                                                    className="form__field placeholderSelect"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    bordered={false}
                                                    placeholder={'Choose facilities'}
                                                >
                                                    {facilities && facilities.map((item, index) => (
                                                        <Select.Option key={index} value={item.id}>
                                                            {item.title}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </div>

                                            <div className='col-xxl-2 col-md-2 justify-content-end d-flex'>
                                                <Button
                                                    tagType='button'
                                                    type='submit'
                                                    className="btn_outline_black py-2 px-4 text-center">
                                                    apply
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                    {error && (<div className="alert alert-danger" role='alert'>{error.message}</div>)}
                                </div>
                            </div>
                        )
                    }}
                </Formik>
            )}
        </>
    );
};

export default BookingFilter;

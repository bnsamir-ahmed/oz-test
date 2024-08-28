import React, { useState, useEffect, useContext } from 'react';
import { Formik } from 'formik';
import { changePassword } from '../../../../apis/User';
import * as Yup from "yup";
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import { Modal } from 'antd';

const ChangePassword = () => {

    const { userProfileData } = useContext(AuthContext)

    const changePasswordInfo = async (values) => {
        try {
            const result = await changePassword(userProfileData.email, values.currentPassword, values.newPassword);
            Modal.success({
                title: result.status,
                content: result.message,
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            })
            values.currentPassword = ''
            values.newPassword = ''
            values.confirmPassword = ''
        } catch (error) {
            Modal.error({
                title: error.response.data.status || "Error",
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
                initialValues={{
                    email: userProfileData ? userProfileData.email : '',
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    changePasswordInfo(values);
                }}
                validationSchema={Yup.object().shape({
                    currentPassword: Yup.string().required(),
                    newPassword: Yup.string()
                        .required('Password is required')
                        .min(8, "Password must be at least 8 characters.")
                        .matches(/[0-9]/, "You must enter at least one number.")
                        .matches(/[a-z]/, "You must enter at least one lowercase letter.")
                        .matches(/[A-Z]/, "You must enter at least one uppercase letter.")
                        .matches(/[#?!@$%^&*-]/, "You must enter at least one symbols."),
                    confirmPassword: Yup.string().required()
                        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                })}
                enableReinitialize>
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props
                    return (
                        <section className="changepass-style py-4 px-sm-5 px-0">
                            <div className="container">
                                <form className="profile-edit" onSubmit={handleSubmit}>
                                    <div className="flex-column align-items-center">
                                        <div className="col-12">
                                            <div className="head-form">
                                                <h2>Change Password</h2>
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-12">
                                            <div className="form__group field my-3">
                                                <label htmlFor="email" className="form__label">Email</label>
                                                <input
                                                    id='email'
                                                    type="email"
                                                    className="form__field ms-0"
                                                    name="email"
                                                    value={values.email}
                                                    disabled
                                                />
                                                {errors.email && touched.email && <p className='text-danger mb-0'>{errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-12">
                                            <div className="form__group field my-3">
                                                <label htmlFor="currentPassword"
                                                    className="form__label d-flex align-items-center justify-content-start">
                                                    Current Password
                                                </label>
                                                <input
                                                    id="currentPassword"
                                                    name="currentPassword"
                                                    type="password"
                                                    placeholder="Current Password"
                                                    className={
                                                        errors.phone && touched.phone
                                                            ? "form__field is-invalid ms-0"
                                                            : "form__field ms-0"
                                                    }
                                                    value={values.currentPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.currentPassword && touched.currentPassword && <p className='text-danger mb-0'>{errors.currentPassword}</p>}
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-12">
                                            <div className="form__group field my-3">
                                                <label htmlFor="newPassword"
                                                    className="form__label d-flex align-items-center justify-content-start">
                                                    New Password
                                                </label>
                                                <input
                                                    id="newPassword"
                                                    name="newPassword"
                                                    type="password"
                                                    placeholder="new Password"
                                                    className={
                                                        errors.newPassword && touched.newPassword
                                                            ? "form__field ms-0 is-invalid"
                                                            : "form__field ms-0"
                                                    }
                                                    value={values.newPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.newPassword && touched.newPassword && <p className='text-danger mb-0'>{errors.newPassword}</p>}
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-12">
                                            <div className="form__group field my-3">
                                                <label htmlFor="confirmPassword"
                                                    className="form__label d-flex align-items-center justify-content-start">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type="password"
                                                    placeholder="confirm Password"
                                                    className={
                                                        errors.confirmPassword && touched.confirmPassword
                                                            ? "form__field ms-0 is-invalid"
                                                            : "form__field ms-0"
                                                    }
                                                    value={values.confirmPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.confirmPassword && touched.confirmPassword && <p className='text-danger mb-0'>{errors.confirmPassword}</p>}
                                            </div>
                                        </div>

                                        <div className="col-lg-12 text-center">
                                            <button type="submit" className="btn btn_default btn_outline_black ms-3">
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    )
                }}
            </Formik >
        </>
    );
};

export default ChangePassword;

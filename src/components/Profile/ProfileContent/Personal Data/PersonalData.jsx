import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import genderLabel from "../../../../assets/images/icons/Male.png";
import birthdayLabel from "../../../../assets/images/icons/Calendar Mark.png";
import jobLabel from "../../../../assets/images/icons/Case.png";
import industryLabel from "../../../../assets/images/icons/Layers Minimalistic.png";
import companyLabel from "../../../../assets/images/icons/Buildings.png";
import cityLabel from "../../../../assets/images/icons/Streets Map Point.png";
import nationalityLabel from "../../../../assets/images/icons/Global.png";
import interestLabel from "../../../../assets/images/icons/interest.png";
import knowLabel from "../../../../assets/images/icons/Group 37057.png";
import provideLabel from "../../../../assets/images/icons/Hand Stars.png";
import aboutLabel from "../../../../assets/images/icons/Document Add.png";
import hobbiesLabel from "../../../../assets/images/icons/Widget 4.png";
import "../PersonalContent.css";
import {
  getUserInfo,
  updateUserInfo,
  getInterests,
  getHobbies,
} from "../../../../apis/User";
import { SiteConfigContext } from "../../../../apis/context/SiteConfigContext";
import { AuthContext } from "../../../../apis/context/AuthTokenContext";
import { DisableContext } from "../../../../apis/context/DisableStateContext";
import RequestChangeName from "./RequestChangeName";
import RequestChangeEmail from "./RequestChangeEmail";
import RequestChangePhone from "./RequestChangePhone";
import { Select, Modal } from "antd";

const PersonalData = () => {
  const [userInfo, setUserInfo] = useState({});
  const [custom, setCustom] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [hobbiesList, setHobbiesList] = useState([]);
  const [interestsList, setInterestsList] = useState([]);
  const [reload, setReload] = useState(false);
  const [focus, setFocused] = useState(false);
  const siteConfig = useContext(SiteConfigContext);
  const { token, userId, modifyUserData } = useContext(AuthContext);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const { restState, image } = useContext(DisableContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getUserInfo(token, userId, signal)
      .then((res) => {
        setUserInfo(res["user_data"]);
        setCustom(res["custom"]);
        setSelectedHobbies(res["custom"]?.fid_11.split(","));
        setSelectedInterests(res["custom"]?.fid_12.split(","));
        modifyUserData(res["user_data"]);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => controller.abort();
  }, [reload]);

  const handleChangeInterests = (data) => {
    setSelectedInterests(data);
  };

  const handleChangeHobbies = (data) => {
    setSelectedHobbies(data);
  };

  useEffect(() => {
    getInterests(token).then((res) => {
      const optionList = res.map((item) => {
        return {
          label: item.title,
          value: item.id,
        };
      });
      setInterestsList(optionList);
    });
    getHobbies(token).then((res) => {
      const optionList = res.map((item) => {
        return {
          label: item.title,
          value: item.id,
        };
      });
      setHobbiesList(optionList);
    });
  }, [token]);

  const updateData = async (values) => {
    try {
      const result = await updateUserInfo(values);
      Modal.success({
        title: result.message,
        content: result.message,
        footer: false,
        centered: true,
        closable: true,
        maskClosable: true,
      });
      setDisabled(true);
      restState(disabled);
      setReload(true);
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
          avatar: image,
          gender: userInfo ? userInfo.gender : "",
          birthday: userInfo ? userInfo.birthday : "",
          nationality: custom ? custom.fid_8 : "",
          jobTitle: custom ? custom?.fid_5 : "",
          industry: custom ? custom?.fid_6 : "",
          city: custom ? custom?.fid_7 : "",
          companyName: userInfo ? userInfo.working : "",
          howDidYouKnowUs: custom ? custom?.fid_10 : "",
          serviceProvide: custom ? custom?.fid_9 : "",
          about: userInfo ? userInfo.about : "",
          hobbies: selectedHobbies,
          interest: selectedInterests,
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          updateData(values);
        }}
        enableReinitialize
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          } = props;
          return (
            <div className="container py-4 px-sm-5 px-2">
              <form className="profile-edit mb-5" onSubmit={handleSubmit}>
                <div className="row align-items-center">
                  <div className="col-lg-12">
                    <div className="head-form">
                      <h2>Personal data</h2>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <RequestChangeName prevName={userInfo.name} />
                  </div>

                  <div className="col-lg-6">
                    <RequestChangeEmail prevEmail={userInfo.email} />
                  </div>

                  <div className="col-lg-6">
                    <RequestChangePhone prevPhone={userInfo.phone_number} />
                  </div>

                  <div className="col-lg-6">
                    <div className="form__group field my-3">
                      <label
                        htmlFor="gender"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        {disabled && (
                          <img src={genderLabel} alt="name" className="me-2" />
                        )}
                        Gender
                      </label>
                      <Select
                        id="gender"
                        defaultValue={values.gender || undefined}
                        value={values.gender || undefined}
                        className="form__field ant placeholderSelect"
                        onBlur={handleBlur}
                        onChange={(value) => setFieldValue("gender", value)}
                        bordered={false}
                        disabled={disabled}
                        placeholder={"select gender"}
                      >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                      </Select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form__group field my-3">
                      <label
                        htmlFor="birthday"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        {disabled && (
                          <img
                            src={birthdayLabel}
                            alt="name"
                            className="me-2"
                          />
                        )}
                        Birth of date
                      </label>
                      <input
                        type={focus ? "date" : "text"}
                        id="birthday"
                        name="birthday"
                        placeholder="Birthday Date"
                        className="form__field"
                        value={values.birthday}
                        onChange={handleChange}
                        onBlur={() => setFocused(false)}
                        onFocus={() => setFocused(true)}
                        disabled={disabled}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form__group field my-3">
                      <label
                        htmlFor="jobTitle"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        <img src={jobLabel} alt="jobTitle" className="me-2" />
                        Job title
                      </label>
                      <input
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="job Title"
                        className="form__field"
                        type="text"
                        disabled={disabled}
                        value={values.jobTitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form__group field my-3">
                      <label
                        htmlFor="companyName"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        {disabled && (
                          <img src={companyLabel} alt="name" className="me-2" />
                        )}
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        placeholder="Company Name"
                        className="form__field"
                        disabled={disabled}
                        value={values.companyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form__group field my-3">
                      <label
                        htmlFor="industry"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        {disabled && (
                          <img
                            src={industryLabel}
                            alt="name"
                            className="me-2"
                          />
                        )}
                        Industry
                      </label>
                      <Select
                        id="industry"
                        defaultValue={values.industry || undefined}
                        value={values.industry || undefined}
                        className="form__field ant placeholderSelect"
                        onBlur={handleBlur}
                        onChange={(value) => setFieldValue("industry", value)}
                        bordered={false}
                        disabled={disabled}
                        placeholder={"select industry"}
                      >
                        {siteConfig &&
                          Object.entries(
                            siteConfig.profile_dropdown?.fid_6.data
                          ).map(([key, value]) => (
                            <Select.Option key={key} value={key}>
                              {value}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form__group field my-3">
                      <label
                        htmlFor="city"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        {disabled && (
                          <img src={cityLabel} alt="name" className="me-2" />
                        )}
                        City
                      </label>
                      <Select
                        id="city"
                        defaultValue={values.city || undefined}
                        value={values.city || undefined}
                        className="form__field ant placeholderSelect"
                        onBlur={handleBlur}
                        onChange={(value) => setFieldValue("city", value)}
                        bordered={false}
                        disabled={disabled}
                        placeholder={"select city"}
                      >
                        {siteConfig &&
                          Object.entries(
                            siteConfig.profile_dropdown.fid_7.data
                          ).map(([key, value]) => (
                            <Select.Option key={key} value={key}>
                              {value}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form__group field my-3">
                      <label
                        htmlFor="nationality"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        {disabled && (
                          <img
                            src={nationalityLabel}
                            alt="name"
                            className="me-2"
                          />
                        )}
                        Nationality
                      </label>
                      <Select
                        id="nationality"
                        defaultValue={values.nationality || undefined}
                        value={values.nationality || undefined}
                        className="form__field ant placeholderSelect"
                        onBlur={handleBlur}
                        onChange={(value) =>
                          setFieldValue("nationality", value)
                        }
                        bordered={false}
                        disabled={disabled}
                        placeholder={"select nationality"}
                      >
                        {siteConfig &&
                          Object.entries(
                            siteConfig.profile_dropdown.fid_8.data
                          ).map(([key, value]) => (
                            <Select.Option key={key} value={key}>
                              {value}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form__group field my-3 array-field">
                      <label
                        htmlFor="interest"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        {disabled && (
                          <img
                            src={interestLabel}
                            alt="name"
                            className="me-2"
                          />
                        )}
                        Interest
                      </label>
                      <Select
                        id="Interests"
                        className="form__field ant placeholderSelect"
                        onBlur={handleBlur}
                        onChange={(value) => handleChangeInterests(value)}
                        bordered={false}
                        disabled={disabled}
                        placeholder="Interests"
                        defaultValue={selectedInterests || undefined}
                        value={selectedInterests || undefined}
                        options={interestsList}
                        mode="multiple"
                        allowClear
                      ></Select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form__group field my-3">
                      <label
                        htmlFor="howDidYouKnowUs"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        {disabled && (
                          <img src={knowLabel} alt="name" className="me-2" />
                        )}
                        How did you know us ?
                      </label>
                      <Select
                        id="howDidYouKnowUs"
                        defaultValue={values.howDidYouKnowUs || undefined}
                        value={values.howDidYouKnowUs || undefined}
                        className="form__field ant placeholderSelect"
                        onBlur={handleBlur}
                        onChange={(value) =>
                          setFieldValue("howDidYouKnowUs", value)
                        }
                        bordered={false}
                        disabled={disabled}
                        placeholder={"How did you know us"}
                      >
                        {siteConfig &&
                          Object.entries(
                            siteConfig.profile_dropdown.fid_10.data
                          ).map(([key, value]) => (
                            <Select.Option key={key} value={key}>
                              {value}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form__group field my-3">
                      <label
                        htmlFor="serviceProvide"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        {disabled && (
                          <img src={provideLabel} alt="name" className="me-2" />
                        )}
                        What Service can you Provide ?
                      </label>
                      <Select
                        id="serviceProvide"
                        defaultValue={values.serviceProvide || undefined}
                        value={values.serviceProvide || undefined}
                        className="form__field ant placeholderSelect"
                        onBlur={handleBlur}
                        onChange={(value) =>
                          setFieldValue("serviceProvide", value)
                        }
                        bordered={false}
                        disabled={disabled}
                        placeholder={"What Service can you Provide"}
                      >
                        {siteConfig &&
                          Object.entries(
                            siteConfig.profile_dropdown.fid_9.data
                          ).map(([key, value]) => (
                            <Select.Option key={key} value={key}>
                              {value}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form__group field my-3">
                      <label
                        htmlFor="about"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        {disabled && (
                          <img src={aboutLabel} alt="about" className="me-2" />
                        )}
                        About Me
                      </label>
                      <input
                        id="about"
                        name="about"
                        type="text"
                        disabled={disabled}
                        placeholder="Tell us More About You"
                        className="form__field"
                        value={values.about}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form__group field my-3  array-field">
                      <label
                        htmlFor="hobbies"
                        className="form__label d-flex align-items-center justify-content-start"
                      >
                        {disabled && (
                          <img src={hobbiesLabel} alt="name" className="me-2" />
                        )}
                        Hobbies
                      </label>
                      <Select
                        id="hobbies"
                        className="form__field ant placeholderSelect"
                        onBlur={handleBlur}
                        onChange={(value) => handleChangeHobbies(value)}
                        bordered={false}
                        disabled={disabled}
                        placeholder="Hobbies"
                        defaultValue={selectedHobbies || undefined}
                        value={selectedHobbies || undefined}
                        options={hobbiesList}
                        mode="multiple"
                        allowClear
                      ></Select>
                    </div>
                  </div>
                  <div className="col-lg-12 text-center">
                    <button
                      type="button"
                      className="btn btn_outline_black btn_default"
                      onClick={() => {
                        setDisabled(!disabled);
                        restState(disabled);
                      }}
                    >
                      {disabled ? <>Edit Profile</> : <>Cancel</>}
                    </button>
                    {!disabled && (
                      <button
                        type="submit"
                        className="btn btn_default btn_outline_black ms-3"
                      >
                        save
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default PersonalData;

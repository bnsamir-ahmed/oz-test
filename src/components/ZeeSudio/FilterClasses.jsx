import React, { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
// import {
//   getWings,
//   getFloors,
//   getFacilities,
//   getFilters,
// } from "../../../apis/FilterBooking";
// import SweetAlert2 from "react-sweetalert2";
// import "./BookingFilter.css";
import Button from "../UI/Button";
// import { AuthContext } from "../../../apis/context/AuthTokenContext";

const BookingFilter = ({ isOpen, placeId, getFilteredData }) => {
  const [wings, setWings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [swalProps, setSwalProps] = useState({});
//   const { token, userId } = useContext(AuthContext);






  return (
    <>
      {isOpen && (
        <Formik
          initialValues={{
            date: "",
            wings: "",
            floors: "",
            capacity: "",
            facilities: "",
            favorites: 0,
          }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 0));
            // handleSubmit(values);
          }}
        >
          {(props) => {
            // const { values, handleChange, handleBlur, handleSubmit } = props;
            return (
              <div className="container-fluid">
                <form
                  className="form-filter"
                  //  onSubmit={handleSubmit}
                >
                  <div className="filter-component row g-3 d-flex align-items-center justify-content-around">
                    <div className="col-xxl-2 col-md-2">
                      <div className="input-group">
                        {/* <input
                          type="date"
                          name="date"
                     
                          className="form__field placeholderSelect"
                          placeholder="Select date"
                        /> */}
                        <input
                          type="text"
                          className="form__field placeholderSelect"
                          placeholder="Search by Name"
                          //   onChange={handelSearch}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-2 col-md-2">
                      <div className="input-group">
                        <input
                          type="date"
                          name="date"
                          //   value={values.date}
                          //   onChange={handleChange}
                          //   onBlur={handleBlur}
                          className="form__field placeholderSelect"
                          placeholder="Select date"
                        />
                      </div>
                    </div>

                    <div className="col-xxl-2 col-md-3">
                      <select
                        id="facilities"
                        name="facilities"
                        // value={values.facilities}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        className="form__field placeholderSelect"
                      >
                        <option disabled="">Select class</option>
                        {facilities &&
                          facilities.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-xxl-2 col-md-2">
                      <div className="form-check">
                        <input
                          id="favorites"
                          name="favorites"
                          placeholder="Add Price"
                          type="text"
                          className="form__field placeholderSelect"
                          //   value={values.favorites}
                          //   onChange={() => {
                          //     if (values.favorites === 1) {
                          //       values.favorites = 0;
                          //     } else {
                          //       values.favorites = 1;
                          //     }
                          //   }}
                          //   onBlur={handleBlur}
                        />
                        {/* <label className="form-check-label" htmlFor="favorites">
                          Only Favorites
                        </label> */}
                      </div>
                    </div>
                    <div className="col-xxl-2 col-md-2">
                      <Button
                        tagType="button"
                        type="submit"
                        className="btn_default button-outLine px-4 btn-bg-white btn-filter text-center"
                      >
                        apply
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default BookingFilter;

import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { Select } from "antd";
import { FiSearch } from "react-icons/fi";
import Button from "../UI/Button";
import { getGymCategories, getTrainingClasses } from "../../apis/ZeeStudio";
import { AuthContext } from "../../apis/context/AuthTokenContext";

const ClassesFilter = ({
  isOpen,
  getFilterDate,
  getFilterSearch,
  getFilterCategorey,
}) => {
  const { token, branchId } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  const [search_txt, setSearch_txt] = useState("");
  const [course_date, setCourse_date] = useState("");
  const [course_categorey, setCourse_categorey] = useState("");
  const [course_price, setCourse_price] = useState("");

  const Clearinput = (e) => {
    e.preventDefault();
    setSearch_txt("");
    setCourse_date("");
    setCourse_categorey("");
    setCourse_price("");
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getCategories = async () => {
      try {
        const result = await getGymCategories(token, branchId, signal);
        setCategories(result);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    return () => controller.abort();
  }, []);

  return (
    <>
      {isOpen && (
        <div className="container-fluid border-top">
          <form className="form-filter">
            <div className="filter-component row justify-content-between">
              <div className="col-xl-3 col-md-6 col-sm-6">
                <div className="input-group">
                  <input
                    name="search"
                    value={search_txt}
                    type="text"
                    className="form__field placeholderSelect"
                    placeholder="Search by ads tittle, keyword..."
                    onChange={(e) => {
                      setSearch_txt(e.target.value);
                      getFilterSearch(e.target.value);
                    }}
                  />
                  <span className="icon-custom">
                    <FiSearch />
                  </span>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-sm-6">
                <div className="input-group">
                  <input
                    type="date"
                    name="date"
                    value={course_date}
                    onChange={(e) => {
                      setCourse_date(e.target.value);
                      getFilterDate(e.target.value);
                    }}
                    className="form__field placeholderSelect"
                    placeholder="Date"
                  />
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-sm-6 mb-2">
                <Select
                  id="class_type"
                  defaultValue={course_categorey || undefined}
                  value={course_categorey || undefined}
                  className="form__field placeholderSelect"
                  onChange={(value) => {
                    setCourse_categorey(value);
                    getFilterCategorey(value);
                  }}
                  bordered={false}
                  placeholder={"select class"}
                >
                  {categories.map((item, index) => (
                    <Select.Option key={index} value={item.id}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              {/* <div className="col-xl-2 col-md-6 col-sm-6 ">
                <div className="input-group">
                  <input
                    type="text"
                    name="text"
                    value={course_price}
                    onChange={(e) => {
                      setCourse_price(e.target.value);
                      getFilterDate(e.target.value);
                    }}
                    className="form__field placeholderSelect"
                    placeholder="add price"
                  />
                </div>
              </div> */}
              <div className="col-xl-2 col-md-12 col-sm-6 btn-filter-responsive d-flex justify-content-end">
                <Button
                  tagType="button"
                  type="button"
                  onClick={Clearinput}
                  className="btn_outline_black  btn-default-padding text-center "
                  // style={{Width:"100%"}}
                >
                  clear
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ClassesFilter;

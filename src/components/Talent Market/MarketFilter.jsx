import { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { getServices } from "../../apis/Market";
import { AuthContext } from "../../apis/context/AuthTokenContext";
import Button from "../UI/Button";
import { filterProducts } from "../../apis/Market";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Select } from "antd";
import { FiSearch } from "react-icons/fi";

const MIN = 50;
const MAX = 1000;

const MarketFilter = ({
  isOpen,
  getFilteredData,

}) => {
  const { token, userId, branchId } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [swalProps, setSwalProps] = useState({});
  const [value, setValue] = useState([MIN, MAX]);
  const [minValue, setminValue] = useState(MIN);
  const [maxValue, setmaxValue] = useState(MAX);
  const [searchText, setSearchText] = useState("");
  const handelSearch = (event)=>{
      setSearchText(event.target.value);
  };
  const handleSliderChange = (newValue) => {
    setValue(newValue);
    setminValue(newValue[0]);
    setmaxValue(newValue[1]);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getServices(token, userId, branchId, signal)
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {});

    return () => controller.abort();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const result = await filterProducts(
        token,
        userId,
        searchText,
        values.types,
        minValue,
        maxValue,
        branchId
      );
      getFilteredData(result);
    } catch (error) {
      setSwalProps({
        show: true,
        icon: "error",
        title: error.response.data.status,
        text: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      {isOpen && (
        <Formik
          initialValues={{
            types: "",
            prices: "",
            favorites: 0,
          }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 0));
            handleSubmit(values);
          }}
        >
          {(props) => {
            const {
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              handelSearch,
            } = props;
            return (
              <div className="container-fluid">
                <form className="form-filter" onSubmit={handleSubmit}>
                  <div className="filter-component row g-sm-0 g-3 d-flex align-items-center justify-content-around">
                    <div className="col-xl-3 col-md-6 col-sm-6">
                      <Select
                        id="types"
                        defaultValue={values.types || undefined}
                        value={values.types || undefined}
                        className="form__field p-0 placeholderSelect"
                        onBlur={handleBlur}
                        onChange={(value) => setFieldValue("types", value)}
                        bordered={false}
                        placeholder={"Choose type"}
                      >
                        {services &&
                          services?.map((item, index) => (
                            <Select.Option key={index} value={item.id}>
                              {item.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                    {/* <div className="col-xl-3 col-md-6 col-sm-6 align-self-end">
                      <RangeSlider
                        min={MIN}
                        max={MAX}
                        step={10}
                        value={value}
                        onInput={handleSliderChange}
                      />
                      <span>
                        price: [{minValue}, {maxValue}] EGP
                      </span>
                    </div> */}
                    <div className="col-xl-2 col-md-6 col-sm-6 ">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form__field placeholderSelect"
                          placeholder="Search by Name"
                          onChange={handelSearch}
                        />
                        <span className="icon-custom">
                          <FiSearch />
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-1 col-md-6 col-sm-6">
                      <div className="form-check">
                        <input
                          id="favorites"
                          name="favorites"
                          value={values.favorites}
                          type="checkbox"
                          className="form-check-input"
                          onChange={() => {
                            if (values.favorites === 1) {
                              values.favorites = 0;
                            } else {
                              values.favorites = 1;
                            }
                          }}
                          onBlur={handleBlur}
                        />
                        <label className="form-check-label" htmlFor="favorites">
                          Only Favorites
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-2 col-md-12 col-sm-6 btn-filter-responsive">
                      <Button
                        tagType="button"
                        type="submit"
                        className="btn_outline_black  btn-default-padding text-center  btn_default"
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
export default MarketFilter;

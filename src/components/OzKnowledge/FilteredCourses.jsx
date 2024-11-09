import { useState, useContext, useEffect } from 'react';
import { Layout, Menu,  InputNumber, DatePicker, Select } from 'antd';
import { useNavigate } from "react-router-dom";
import CourseCard from './CourseCard';
import FilterCourses from './FilterCourses';
import { getCoursesList, getCategoriesList, getInstructorsList } from '../../apis/OzKnowledge';
import { AuthContext } from '../../apis/context/AuthTokenContext';
import Button from '../UI/Button';
import Paragraph from '../UI/Paragraph';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import SkeletonCard from "../UI/SkeletonCard";


const FilteredCourses = () => {

     const settings = {
       dots: false,
       arrows: true,
       slidesToShow: 3,
       slidesToScroll: 1,
       centerMode: true,
       centerPadding: "40px 0px 0px",
       responsive: [
         {
           breakpoint: 1300,
           settings: {
             slidesToShow: 2,
           },
         },
         {
           breakpoint: 992,
           settings: {
             slidesToShow: 1,
           },
         },
         {
           breakpoint: 575,
           settings: {
             slidesToShow: 1,
             centerMode: false,
             centerPadding: "60px",
             dots: false,
           },
         },
       ],
     };

    const { id } = useParams();
    const [collapsed, setCollapsed] = useState(true);
    const [courses, setCourses] = useState([]);


    const [categories, setCategories] = useState([]);
    const [trainers, setTrainers] = useState([]);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [categoryId, setCategoryId] = useState(id);
    const [categoryIds, setCategoryIds] = useState([]);
    const [isFirstChange, setIsFirstChange] = useState(true);
    const [sellerType, setSellerType] = useState('');
    const [trainerId, setTrainerId] = useState('');

    const { token, branchId } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const categoryIds = localStorage.getItem('coursesIdsOz').split(',');
        const numArray = categoryIds.map(Number);
        setCategoryId(id);
        setCategoryIds(numArray);
    }, [id]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getCourses = async () => {
            try {
                const result = await getCoursesList(token,
                    branchId,
                    startDate,
                    endDate,
                    priceFrom,
                    priceTo,
                    sellerType,
                    trainerId,
                    id,
                    '10',
                    page,
                    signal);

                setCourses(result);
            } catch (error) {
                console.error(error);
            }
        };

        getCourses();

        return () => controller.abort();
    }, [
        token,
        branchId,
        startDate,
        endDate,
        priceFrom,
        priceTo,
        sellerType,
        trainerId,
        id,
        page 
    ]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getCategories = async () => {
            try {
                const result = await getCategoriesList(token, signal);
                setCategories(result);
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();

        return () => controller.abort();
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getInstructors = async () => {
            try {
                const result = await getInstructorsList(token, branchId, 10, 0, signal);
                setTrainers(result);
            } catch (error) {
                // console.log(error);
            }
        }
        getInstructors();
        return () => controller.abort();
    }, []);

    const handleCheckboxChange = (event, ids) => {
        if (isFirstChange) {
            setIsFirstChange(false);
            setCategoryId([]);
        }
        const value = +event.target.value;
        const { checked } = event.target;
        if (checked) {
            setCategoryId((prevValues) => [...prevValues, value]);
        } else {
            setCategoryId((prevValues) => prevValues.filter((val) => val !== value));
            if (categoryId.length === 1) {
                setCategoryId(ids);
                setIsFirstChange(true)
            }
        }
    };

    const onChangeSeller = (e) => {
        setSellerType(e.target.value);
    };

    const onChangeDateStart = (dateString) => {
        setStartDate(dateString);
    };

    const onChangeDateEnd = (dateString) => {
        setEndDate(dateString);
    };

    const handelPriceChangeTo = (value) => {
        setPriceTo(value)
    };

    const handelPriceChangeFrom = (value) => {
        setPriceFrom(value)
    };

    const restState = () => {
        setTrainerId('');
        setSellerType('');
        setPriceTo('');
        setPriceFrom('');
        setEndDate('');
        setStartDate('');
        handelCheckState();
        setIsFirstChange(true);
        setCategoryId(categoryIds);
    };

    const handelCheckState = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checkbox.checked = false;
            }
        });
    };

    const items = [
        {
            key: 'sub1',
            icon: null,
            label: 'CATEGORY',
            children: categories && categories?.map(item => {
                return {
                    key: `cat_${item.id}`,
                    icon: (<img src={item.image} alt='icon' width='24px' height='24px' />),
                    label: item?.title,
                    children: item?.sub_category.map(e => {
                        return {
                            key: e.id,
                            label: (
                                <div className='form-check' key={e.id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name={item.title}
                                        id={e.id}
                                        value={e.id}
                                        onChange={(event) => handleCheckboxChange(event, item.ids)}
                                    />
                                    <label className="form-check-label" htmlFor={e.id}>
                                        {e.title}
                                    </label>
                                </div>
                            ),
                        }
                    }),
                    onTitleClick: () => {
                        setCategoryId(item.ids);
                        setCategoryIds(item.ids);
                        setIsFirstChange(true);
                        handelCheckState();
                        navigate(`/courses/${item.id}`);

                    }
                }
            })
        },
        {
            type: 'divider',
        },
        {
            key: 'sub2',
            icon: null,
            label: 'SELLER TYPE',
            children: [
                {
                    key: 'sub21',
                    label: (
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={onChangeSeller} value={'member'} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Member
                            </label>
                        </div>),
                },
                {
                    key: 'sub22',
                    label: (
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={onChangeSeller} value={'public'} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Public
                            </label>
                        </div>),
                }
            ],
        },
        {
            type: 'divider',
        },
        {
            key: 'sub3',
            icon: null,
            label: 'PRICES',
            children: [
                {
                    key: 'sub31',
                    label: (
                        <div className='m-2'>
                            <div className='d-flex justify-content-evenly'>
                                <div className='col-5'>
                                    <InputNumber
                                        controls={false}
                                        addonAfter="EGP"
                                        defaultValue={priceFrom}
                                        onChange={handelPriceChangeFrom}
                                        type="number"
                                    />
                                </div>
                                <div className='col-5'>
                                    <InputNumber
                                        type="number"
                                        controls={false}
                                        addonAfter="EGP"
                                        defaultValue={priceTo}
                                        onChange={handelPriceChangeTo}
                                    />
                                </div>
                            </div>
                            {/* <Slider 
                                range
                                step={10}
                                max={400}
                                min={0}
                                defaultValue={[priceFrom, priceTo]}
                                // value={[priceFrom, priceTo]}
                                onChange={onChangeSlider}
                            /> */}
                        </div>
                    ),
                }
            ]
        },
        {
            type: 'divider',
        },
        {
            key: 'sub4',
            label: 'Date Course',
            children: [
                {
                    key: 'sub41',
                    label: (
                        <div className='d-flex justify-content-evenly my-2'>
                            <div className='col-5'>
                                <DatePicker
                                    size={'large'}
                                    placeholder="From"
                                    value={startDate}
                                    onChange={onChangeDateStart} />
                            </div>
                            <div className='col-5'>
                                <DatePicker
                                    size={'large'}
                                    placeholder="To"
                                    value={endDate}
                                    onChange={onChangeDateEnd} />
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            type: 'divider',
        },
        {
            key: 'sub5',
            label: 'Select instructor',
            children: [
                {
                    key: 'sub51',
                    label: (
                        <div className='my-2'>
                            <Select
                                id='user_type'
                                defaultValue={trainerId || undefined}
                                value={trainerId || undefined}
                                className="form__field placeholderSelect"
                                onChange={(value) => {
                                    setTrainerId(value)
                                }}
                                bordered={false}
                                placeholder={'Select instructor'}
                            >
                                {trainers && trainers.map((item) => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    )
                }
            ]
        }

    ];

    const rootSubmenuKeys = ['sub1', `cat_${id}`];
    const [openKeys, setOpenKeys] = useState(['sub1', `cat_${id}`]);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

        if (latestOpenKey?.includes('cat_')) {
            if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                setOpenKeys(latestOpenKey ? ['sub1', latestOpenKey] : ['sub1']);
            } else {
                setOpenKeys(latestOpenKey ? ['sub1', latestOpenKey] : rootSubmenuKeys);
            }
        } else {
            setOpenKeys(['sub1', latestOpenKey, ...keys])
        }
    };
      const [open ,setOpen] =useState(false)
      const handleOpen = () =>{
        setOpen(!open)
      }
    return (
      <>
        <FilterCourses
          courses_length={courses.length}
          openFilter={handleOpen}
        />
        <section className="container-fluid px-70 py-5 position-relative">
          <div className="row g-3">
            {/* <button className="filter-mob" onClick={handleOpen}>
              {" "}
              <span className="mx-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.1538 8.61538V10.4615C19.0031 10.4615 19.6923 11.1508 19.6923 12H20.6154V11.0769H21.4102C21.254 10.5261 20.9592 10.0188 20.5471 9.60671C19.9124 8.97198 19.0515 8.61538 18.1538 8.61538Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M21.4102 11.0769H20.6154V12H21.5385C21.5385 11.6851 21.4946 11.3746 21.4102 11.0769Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M23.0769 12.9231C23.3217 12.9231 23.5565 12.8258 23.7296 12.6527C23.9027 12.4796 24 12.2448 24 12C24 11.7552 23.9027 11.5204 23.7296 11.3473C23.5565 11.1742 23.3217 11.0769 23.0769 11.0769V12.9231Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M23.0769 12.9231V11.0769H21.4102C21.4946 11.3746 21.5385 11.6851 21.5385 12C21.5385 12.3149 21.4946 12.6254 21.4102 12.9231H23.0769Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M20.6154 12.9231H21.4102C21.4946 12.6254 21.5385 12.3149 21.5385 12H20.6154V12.9231Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M19.6923 12C19.6923 12.8492 19.0031 13.5385 18.1538 13.5385V15.3846C19.0515 15.3846 19.9124 15.028 20.5471 14.3933C20.9592 13.9812 21.254 13.4739 21.4102 12.9231H20.6154V12H19.6923Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M18.1538 15.3846V13.5385C17.3046 13.5385 16.6154 12.8492 16.6154 12H14.7692C14.7692 12.8977 15.1258 13.7585 15.7606 14.3933C16.3953 15.028 17.2562 15.3846 18.1538 15.3846Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M14.7692 12H16.6154C16.6154 11.1508 17.3046 10.4615 18.1538 10.4615V8.61538C17.2562 8.61538 16.3953 8.97198 15.7606 9.60671C15.1258 10.2415 14.7692 11.1023 14.7692 12Z"
                    fill="#BDBDBD"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.923077 2.46154C0.678262 2.46154 0.443473 2.55879 0.270363 2.7319C0.0972523 2.90501 0 3.1398 0 3.38462C0 3.62943 0.0972523 3.86422 0.270363 4.03733C0.443473 4.21044 0.678262 4.30769 0.923077 4.30769H8.74368C8.89985 4.85852 9.19468 5.36586 9.60671 5.7779C10.2415 6.41264 11.1023 6.76923 12 6.76923C12.8977 6.76923 13.7585 6.41264 14.3933 5.7779C14.8053 5.36586 15.1002 4.85852 15.2563 4.30769H23.0769C23.3217 4.30769 23.5565 4.21044 23.7296 4.03733C23.9027 3.86422 24 3.62943 24 3.38462C24 3.1398 23.9027 2.90501 23.7296 2.7319C23.5565 2.55879 23.3217 2.46154 23.0769 2.46154H15.2563C15.1002 1.91071 14.8053 1.40337 14.3933 0.991331C13.7585 0.356592 12.8977 0 12 0C11.1023 0 10.2415 0.356592 9.60671 0.991331C9.19468 1.40337 8.89985 1.91071 8.74368 2.46154H0.923077ZM0.923077 11.0769C0.678262 11.0769 0.443473 11.1742 0.270363 11.3473C0.0972523 11.5204 0 11.7552 0 12C0 12.2448 0.0972523 12.4796 0.270363 12.6527C0.443473 12.8258 0.678262 12.9231 0.923077 12.9231H12C12.2448 12.9231 12.4796 12.8258 12.6527 12.6527C12.8258 12.4796 12.9231 12.2448 12.9231 12C12.9231 11.7552 12.8258 11.5204 12.6527 11.3473C12.4796 11.1742 12.2448 11.0769 12 11.0769H0.923077ZM12 19.6923C11.7552 19.6923 11.5204 19.7896 11.3473 19.9627C11.1742 20.1358 11.0769 20.3706 11.0769 20.6154C11.0769 20.8602 11.1742 21.095 11.3473 21.2681C11.5204 21.4412 11.7552 21.5385 12 21.5385H23.0769C23.3217 21.5385 23.5565 21.4412 23.7296 21.2681C23.9027 21.095 24 20.8602 24 20.6154C24 20.3706 23.9027 20.1358 23.7296 19.9627C23.5565 19.7896 23.3217 19.6923 23.0769 19.6923H12ZM13.5385 3.38462C13.5385 4.23385 12.8492 4.92308 12 4.92308C11.1508 4.92308 10.4615 4.23385 10.4615 3.38462C10.4615 2.53538 11.1508 1.84615 12 1.84615C12.8492 1.84615 13.5385 2.53538 13.5385 3.38462Z"
                    fill="black"
                  />
                  <path
                    d="M0.923077 19.6923C0.678262 19.6923 0.443473 19.7896 0.270363 19.9627C0.0972523 20.1358 0 20.3706 0 20.6154C0 20.8602 0.0972523 21.095 0.270363 21.2681C0.443473 21.4412 0.678262 21.5385 0.923077 21.5385V19.6923Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M0.923077 19.6923V21.5385H2.58984C2.50543 21.2407 2.46154 20.9303 2.46154 20.6154C2.46154 20.3004 2.50543 19.99 2.58984 19.6923H0.923077Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M5.84615 24V22.1538C4.99692 22.1538 4.30769 21.4646 4.30769 20.6154H3.38462V21.5385H2.58984C2.746 22.0893 3.04083 22.5966 3.45287 23.0087C4.08761 23.6434 4.9485 24 5.84615 24Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M2.58984 21.5385H3.38462V20.6154H2.46154C2.46154 20.9303 2.50543 21.2407 2.58984 21.5385Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M3.38462 19.6923H2.58984C2.50543 19.99 2.46154 20.3004 2.46154 20.6154H3.38462V19.6923Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M4.30769 20.6154C4.30769 19.7662 4.99692 19.0769 5.84615 19.0769V17.2308C4.9485 17.2308 4.08761 17.5874 3.45287 18.2221C3.04083 18.6341 2.746 19.1415 2.58984 19.6923H3.38462V20.6154H4.30769Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M7.38462 20.6154H9.23077C9.23077 19.7177 8.87418 18.8568 8.23944 18.2221C7.6047 17.5874 6.74381 17.2308 5.84615 17.2308V19.0769C6.69538 19.0769 7.38462 19.7662 7.38462 20.6154Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M7.38462 20.6154C7.38462 21.4646 6.69538 22.1538 5.84615 22.1538V24C6.74381 24 7.6047 23.6434 8.23944 23.0087C8.87418 22.3739 9.23077 21.513 9.23077 20.6154H7.38462Z"
                    fill="#BDBDBD"
                  />
                </svg>
              </span>{" "}
              Filter
            </button> */}
            <div
              className={
                open
                  ? "col-xxl-4 col-xl-3 col-lg-3 filter_side open"
                  : "col-xxl-4 col-xl-3 col-lg-3 filter_side "
              }
            >
              <Layout.Sider>
                <Menu
                  theme="light"
                  items={items}
                  openKeys={openKeys}
                  mode="inline"
                  inlineCollapsed={collapsed}
                  onOpenChange={onOpenChange}
                />
              </Layout.Sider>
              <Button
                tagType="link"
                onClick={restState}
                className="button-outLine px-4 btn-bg-white btn-filter text-center mt-4"
              >
                clear
              </Button>
            </div>
            <div className="col-xxl-8 col-lg-9 ps-3">
              <div className="row g-3 row-cols-lg-3 row-cols-md-2 row-cols-1 filter-deskTop-card">
                {courses &&
                  courses.map((item) => {
                    return (
                      <div className="col" key={item.id}>
                        <CourseCard coursesDetails={item} />
                      </div>
                    );
                  })}
                {courses && courses.length === 0 && (
                  <Paragraph className="empty">
                    there is not classes yet
                  </Paragraph>
                )}
              </div>
              <div className="filter-mobile-card">
                <Slider {...settings} className="slick_knowledge py-5">
                  {courses?.map((item, index) => {
                    return (
                      <div className="px-sm-2 px-0" key={index}>
                        <CourseCard coursesDetails={item} />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </>
    );
};

export default FilteredCourses;
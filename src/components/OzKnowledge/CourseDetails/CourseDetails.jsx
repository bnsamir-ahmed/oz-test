import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import { getCoursesById } from '../../../apis/OzKnowledge';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Skeleton, Alert, Modal } from 'antd';
import MainHeaderWrapper from '../../UI/MainHeaderWrapper';
import Paragraph from '../../UI/Paragraph';
import Button from '../../UI/Button';
import star from '../../../assets/images/icons/star.svg';
import confirmedIcon from '../../../assets/images/icons/check.svg';
import Counter from './Counter';
import AboutCourse from './AboutCourse';
import PopularCourses from '../PopularCourses';
import AboutInstractor from './AboutInstractor';
import LoginAlert from "../../Auth/LoginAlertModal";
import * as DOMPurify from 'dompurify';
import AddToFavButton from '../../UI/AddToFavButton';
import moment from 'moment';

const CourseDetails = () => {

    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const [showLogin, setShowLogin] = useState(false);

    const handelClose = () => setShowLogin(false);

    const { isPending, error, data: course } = useQuery({
        queryKey: ['courseDetails', id],
        queryFn: ({ signal }) => getCoursesById(token, id, signal)
    });

    const navigate = useNavigate();

    const navigatePayment = (value) => {
        if (token) {
            const gymCourseDetails = {
                id: value.id,
                title: value.title,
                date: value.start_date,
                duration: value.course_hours,
                schedule: value.schedule,
                price: value.price,
                level: value.category?.title,
            };
            localStorage.setItem("OZCourseDetails", JSON.stringify(gymCourseDetails));
            navigate(`/course-bookingSummary`);
        } else {
            setShowLogin(true);
        }
    };
    const CompareDates = (endDate) => {
        const dateToCompare = moment(endDate, "YYYY-MM-DD");
        const today = moment();
        return today > dateToCompare ? false : true
    };

    return (
        <>
            <div className='position-relative'>
                <AddToFavButton
                    is_favorite={course?.is_favorite}
                    id={course?.id}
                    add_fav={true}
                    type='zee_knowladge'
                />
                <MainHeaderWrapper
                    image={course?.image}
                    height='670px'>
                    <div className={`container-fluid px-70`}>
                        <div className='col-xl-6 col-lg-9 col-12'>
                            {isPending && (<Skeleton active paragraph={{ rows: 2 }} />)}
                            <Paragraph className='head_paragraph mb-4' style={{
                                fontSize: '2.25rem'
                            }}>{course?.title}</Paragraph>
                            <div className='description mb-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course?.details) }}></div>
                            <div className='conrse_details d-flex mb-4'>
                                <div className='d-flex align-items-center'>
                                    <img src={star} alt='star icon' />
                                    {isPending && (<Skeleton.Input style={{ width: 80 }} active />)}
                                    <span className='rate ms-2'>{course?.rate}</span>
                                    <span className='reviews mx-3'>({course?.reviews} Reviews)</span>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="4" height="4" rx="2" fill="#F2EFF2" />
                                    </svg>
                                    <span className='reviews ms-2'>Published By</span>
                                    {isPending && (<Skeleton.Input style={{ width: 80 }} active />)}
                                    <span className='reviews mx-3'>{course?.trainer?.name}</span>
                                    <img src={confirmedIcon} alt='confirmed Icon' />
                                </div>
                            </div>
                            {(CompareDates(course?.end_date)) && <Button tagType='link' className="btn white_bg_btn me-2" onClick={() => { navigatePayment(course) }}>Attend</Button>}
                        </div>
                    </div>
                </MainHeaderWrapper>
                {error && (<Alert message={error.message} type="error" showIcon />)}
            </div>
            {/* <Counter
                course_hours={course?.course_hours}
                total_assignment={course?.total_assignment}
                video_lessons={course?.video_lessons}
                student_enrolled={course?.student_enrolled}
            /> */}
            <AboutCourse descriptions={course?.descriptions} isPending={isPending} />
            <AboutInstractor instractor={course?.trainer} isPending={isPending} />
            <PopularCourses />
            <LoginAlert show={showLogin} onHide={handelClose} />
            {/* {console.log(course)} */}
        </>
    )
};
export default CourseDetails;
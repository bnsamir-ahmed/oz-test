import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Skeleton } from "antd";
import moment from 'moment';
import MainHeaderWrapper from '../../UI/MainHeaderWrapper';
import Paragraph from '../../UI/Paragraph';
import coursetrack from '../../../assets/images/trackcourse.png';
import Button from '../../UI/Button';
import CourseProgress from './CourseProgress';
import CourseSections from './CourseSections';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import { getKnwoldgeByid } from '../../../apis/OzKnowledge';
import star from '../../../assets/images/icons/star.svg';
import RateCourseModal from './RateCourseModal';

const CourseTracting = () => {

  const [openRateModal, setOpenRateModal] = useState(false);
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  const closeRateModal = () => setOpenRateModal(false);

  const { data: classes, isPending } = useQuery({
    queryKey: ['Knowledge-history-id', id],
    queryFn: ({ signal }) => getKnwoldgeByid(token, id, signal)
  });

  const HandelRate = () => {
    setOpenRateModal(true);
  }

  const CompareDates = (endDate) => {
    const dateToCompare = moment(endDate, "YYYY-MM-DD");
    const today = moment();
    return today > dateToCompare ? true : false
  };

  return (
    <>
      <MainHeaderWrapper
        image={coursetrack}
        height="670px"
        special_flex="justify-content-center"
      >
        <div className={`container`}>
          {isPending ? (
            <Skeleton active paragraph={{ rows: 3 }} />)
            : (
              <div className="col-12 text-center">
                <Paragraph className="main_header_title mb-3">
                  Course Details
                </Paragraph>
                <Paragraph className="head_paragraph mb-3">
                  {classes?.training?.title}
                </Paragraph>
                {(classes?.is_rated) && (
                  <div className='d-flex align-items-center justify-content-center conrse_details'>
                    <img src={star} alt='star icon' />
                    <span className='rate ms-2'>{classes?.rate}</span>
                    <span className='reviews mx-3'>({classes?.reviews} Reviews)</span>
                  </div>
                )}
                {(!classes?.is_rated && CompareDates(classes?.training.end_date)) && (
                  <Button tagType='link' className="rate_btn p-0 px-2" onClick={() => HandelRate()}>rate</Button>
                )}
              </div>
            )}
        </div>
      </MainHeaderWrapper>
      <CourseProgress details={classes} />
      <CourseSections details={classes?.training} />
      <RateCourseModal
        open={openRateModal}
        handleCancel={closeRateModal}
        courseId={classes?.course_id}
      />
    </>
  );
};
export default CourseTracting;
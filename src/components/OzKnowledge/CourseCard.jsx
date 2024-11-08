import { Rate, Badge } from 'antd';
import Paragraph from '../UI/Paragraph';
import Button from '../UI/Button';
import AddToFavButton from '../UI/AddToFavButton';
import { AuthContext } from '../../apis/context/AuthTokenContext';
import { useContext } from 'react';

const CourseCard = ({ coursesDetails }) => {
    const { token, branchId } = useContext(AuthContext);

    return (
        <>
            {/* {console.log(token )} */}
            <div className='card'>

                <div className='card-header header_course'>
                    <AddToFavButton is_favorite={coursesDetails.is_favorite} id={coursesDetails.id} add_fav={true} type={'zee_knowladge'} />

                    <img src={coursesDetails.image} className="card-img-top" alt={coursesDetails.title}
                        style={{
                            height: '229px',
                            objectFit: 'cover'
                        }} />
                    <div className='padge_grey'>
                        <span>{coursesDetails.category?.title}</span>
                    </div>
                </div>
                <div className='card-body'>
                    <Paragraph className='courseCardTitle dynamic_wraper_1'>{coursesDetails.title}</Paragraph>
                    <div className='d-flex align-items-center'>
                        <Rate disabled allowHalf defaultValue={coursesDetails.rate} />
                        <span className='rate_count ms-2'>{`(${coursesDetails.rate})`}</span>
                    </div>
                    <div className='d-flex justify-content-between align-items-center pt-4'>
                        {token && coursesDetails?.allow_free === 1 ?
                            <Paragraph className='courseCardTitle mb-0'> Free</Paragraph> :

                            <Paragraph className='courseCardTitle mb-0'>{Math.floor(coursesDetails.price)} EGP</Paragraph>
                        }
                        <Button
                            tagType='link'
                            to={`/coursedetails/${coursesDetails.id}`}
                            className='course_btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6 18L18 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8.25 6H18V15.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
};
export default CourseCard;
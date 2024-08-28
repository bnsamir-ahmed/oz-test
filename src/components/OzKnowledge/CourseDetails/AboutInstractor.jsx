import Paragraph from '../../UI/Paragraph';
import confirmedIcon from '../../../assets/images/icons/check.svg';
import star from '../../../assets/images/icons/star.svg';
import videoIcon from '../../../assets/images/icons/video.svg';
import { Skeleton } from 'antd';
import * as DOMPurify from 'dompurify';

const AboutInstractor = ({instractor, isPending}) => {
    return (
        <>
            <section className="py-5">
                <div className="container-fluid px-70">
                    <h1 className="course_details_title mb-5">about instractor</h1>
                    <div className="row align-items-center">
                        <div className="col-xxl-3 col-xl-4 col-md-6 col-12">
                            {isPending && (<Skeleton.Image className="w-100" active />)}

                            <img 
                                src={instractor?.image} 
                                alt={isPending ? '' : 'oz instractor'} 
                                width= '307px' 
                                height={isPending ? '' : '324px'}
                            />
                        </div>
                        <div className='col-xxl-9 col-xl-8 col-md-6 col-12'>
                            <div className='d-flex align-items-center  mb-3'>
                                {isPending && (<Skeleton.Input style={{ width: 80 }} active />)}
                                <h1 className="course_details_title mb-0">{instractor?.name}</h1>
                                <img src={confirmedIcon} alt='confirmed Icon' className='ms-2'/>
                            </div>
                            {isPending && (<Skeleton paragraph active/>)}
                            <div className='course_details_light_desc opacity-100' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(instractor?.description) }}></div>
                            <div className='d-flex align-items-center  mb-4'>
                                <div className='d-flex align-items-center'>
                                    <img src={star} alt='star icon'/>
                                    {isPending && (<Skeleton.Input style={{ width: 80 }} active />)}
                                    <span className='rate mx-2 fw-semibold'>{instractor?.rating}</span> 
                                    <span className='reviews'>Instructor Rating</span>
                                </div>
                                <div className='d-flex align-items-center ms-3'>
                                    <img src={videoIcon} alt='confirmed Icon'/>
                                    {isPending && (<Skeleton.Input style={{ width: 80 }} active />)}
                                    <span className='reviews mx-2 fw-semibold'>{instractor?.courses}</span>
                                    <span className='reviews'>Courses</span>
                                </div>
                            </div>
                            {/* <Paragraph className='course_details_light_desc mb-4'>
                                Joe Natoli has launched five successful online courses with Udemy on the topics of User Experience (UX) and User Interface (UI) Design, with more than 180,000+ students enrolled to date.
                            </Paragraph>
                            <Paragraph className='course_details_light_desc'>
                                Joe has been preaching and practicing the gospel of User Experience (UX) to Fortune 100, 500 and Government organizations for nearly three decades. That work includes commercial industry leaders like Google Ventures, Kroll/Duff + Phelps, Broadridge, Conde Nast, Johns Hopkins, Mettler-Toledo, PHH Arval, SC Johnson and Wolters Kluwer, as well as government agencies like the National Science Foundation, National Institutes of Health and the Dept. of Homeland Security.
                            </Paragraph> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};
export default AboutInstractor;
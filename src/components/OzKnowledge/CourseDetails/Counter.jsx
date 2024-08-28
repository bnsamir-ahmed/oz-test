import CountUp from 'react-countup';
import Paragraph from '../../UI/Paragraph';

const Counter = ({course_hours, total_assignment, video_lessons, student_enrolled}) => {
    return (
        <>
            <section className="container-fluid px-70">
                <div className="row row-cols-md-4 row-cols-2 g-3 justify-content-center py-5">
                    <div className="col">
                        <div className="d-flex flex-column justify-content-between align-items-center">
                            <CountUp 
                                end={course_hours} 
                                separator="," 
                                enableScrollSpy 
                                scrollSpyOnce 
                                className="counter_blue mb-3"
                                suffix="+"
                            />
                            <Paragraph className='mb-0 p-counter opacity-100 fw-semibold'>Hours of Course</Paragraph>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-flex flex-column justify-content-between align-items-center">
                            <CountUp 
                                end={total_assignment} 
                                separator="," 
                                enableScrollSpy 
                                scrollSpyOnce 
                                className="counter_blue mb-3"
                                suffix="+"
                            />
                            <Paragraph className='mb-0 p-counter opacity-100 fw-semibold'>Total Assignments</Paragraph>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-flex flex-column justify-content-between align-items-center">
                            <CountUp 
                                end={video_lessons} 
                                separator="," 
                                enableScrollSpy 
                                scrollSpyOnce 
                                className="counter_blue mb-3"
                                suffix="+"
                            />
                            <Paragraph className='mb-0 p-counter opacity-100 fw-semibold'>Video Lessons</Paragraph>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-flex flex-column justify-content-between align-items-center">
                            <CountUp 
                                end={student_enrolled} 
                                separator="," 
                                enableScrollSpy 
                                scrollSpyOnce 
                                className="counter_blue mb-3"
                                suffix="+"
                            />
                            <Paragraph className='mb-0 p-counter opacity-100 fw-semibold'>Students Enrolled</Paragraph>
                        </div>
                    </div>
                
                </div>
            </section>
        </>
    )
};
export default Counter;
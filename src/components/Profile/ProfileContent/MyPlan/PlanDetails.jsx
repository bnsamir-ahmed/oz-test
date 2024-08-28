import React, { useEffect, useState, useContext } from 'react';
import moment from "moment";
import { useParams } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import MainHeaderWrapper from '../../../UI/MainHeaderWrapper';
import Paragraph from '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import ProfileActions from '../ProfileActions';
import ExtrabundlesModal from '../MyPlan/ExtrabundlesModal';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PlanDetails = () => {

    const {id} = useParams();
    const [show, setShow] = useState(false);
    const plan = JSON.parse(localStorage.getItem('myProPlanOZ'));
    const { token } = useContext(AuthContext);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    return (
        <>     
            <div className='position-relative'>
                <MainHeaderWrapper image={plan?.image} special_flex={`justify-content-md-center`}>
                    <div className="container text-center">
                        <Paragraph className="text-one">plan details</Paragraph>
                        <Paragraph className="text-two">{plan?.name}</Paragraph>
                        {plan?.time_progress >= 90 && (
                            <Button 
                                tagType='link' 
                                className='btn_outline mt-4'
                                onClick={handleOpen}>Add Extra</Button>
                        )}
                    </div>
                </MainHeaderWrapper>
            </div>
            <section className="space-details">
                <div className="container-fluid">
                    <div className="row px-0">
                        <div className="col-lg-8 col-12 p-0 py-5 border-right">
                            <div className="space-description px-sm-5 px-3 mb-5">
                                <Paragraph className="h2-description color-grey">
                                    Plan Details
                                </Paragraph>
                                <div>
                                    <div className="head-form">
                                        <h2>Time Progress</h2>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className='col-11'>
                                            <ProgressBar 
                                                    completed={plan?.time_progress}
                                                    bgColor={'#D0DF00'}
                                                    baseBgColor={'#C5CED340'} />
                                            <div className='my-3 d-flex justify-content-between'>
                                                <span className='grey-span'>{moment(plan?.pro_current_start).format("dddd, MMM. D, YYYY")}</span>
                                                <span className='grey-span'>{moment(plan?.pro_current_end).format("dddd, MMM. D, YYYY")}</span>
                                            </div>
                                        </div>
                                        <span className='completed_percentage'>{plan?.time_progress}%</span>  
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="space-description px-sm-5 px-3 py-5">
                                {plan?.amenities &&
                                    plan?.amenities.map((item,index)=>{
                                        return (
                                            <div className='d-flex justify-content-between pb-3 align-items-center' key={index}>
                                                <Paragraph className='mb-0 amenities'>
                                                    {item?.title}
                                                </Paragraph>
                                                <div style={{
                                                    width: '64px',
                                                    height: '64px'
                                                }}>
                                                    <CircularProgressbarWithChildren 
                                                        value={item?.progress}
                                                        valueEnd={100} 
                                                        styles={buildStyles({
                                                            pathTransitionDuration: 0.5,
                                                            pathColor: `#D0DF00`,
                                                            trailColor: '#C5CED340',
                                                            backgroundColor: '#fff'
                                                        })}
                                                    >
                                                        <span className='progress_percentage'>{item?.progress}%</span>
                                                    </CircularProgressbarWithChildren>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='col-lg-4 col-12 p-sm-5 p-3'>
                            <ProfileActions details={plan}/>
                        </div>
                    </div>
                </div>
            </section>
            <ExtrabundlesModal 
                show={show}
                onHide={handleClose}/>
        </>
    )
};

export default PlanDetails;

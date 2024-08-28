import { useEffect, useState } from 'react';
import Button from '../UI/Button';
import Paragraph from '../UI/Paragraph';

const ContactAdminReply = () => {

    const [details, setDetails] = useState(JSON.parse(localStorage.getItem('replydetailsOZ')));

    useEffect(()=>{
        setDetails(JSON.parse(localStorage.getItem('replydetailsOZ')))
    },[]);

    const setDate = (roomdate) => {
        const date = new Date(roomdate);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };

        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
            <div className="navigator border_bottom">
                <div className='container-fluid d-flex flex-sm-row flex-column justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                            <h1 className="title-name mb-0">Contact Admin History</h1>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="2"
                                height="127"
                                viewBox="0 0 2 127"
                                fill="none"
                            >
                                <path d="M1 0L1.00001 127" stroke="#BDBDBD" stroke-width="1.5"/>
                            </svg>
                    </div>
                </div>
            </div>
            <div className="container py-5">
                <div className="col-12 issue_description">
                    <div className="pt-4 pb-2 px-3">
                        <div className="d-flex align-items-center">
                            <Paragraph className='issue mb-0 ms-2'>{details.subject}</Paragraph>
                        </div>
                    </div>
                    <hr />
                    <div className="p-4">
                        <div className="">
                            <Paragraph className="date-title mb-4">Date & Time</Paragraph>
                                <div className="price-list mb-4  d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M7.25586 4.45298V2.96875" stroke="#BDBDBD" stroke-width="1.43939" stroke-linecap="round"/>
                                        <path d="M16.8535 4.45298V2.96875" stroke="#BDBDBD" stroke-width="1.43939" stroke-linecap="round"/>
                                        <path d="M2.45898 9.39844H21.6509" stroke="#BDBDBD" stroke-width="1.43939" stroke-linecap="round"/>
                                        <path d="M2.45898 12.369C2.45898 8.63744 2.45898 6.77164 3.58322 5.61238C4.70746 4.45312 6.51689 4.45312 10.1358 4.45312H13.9741C17.593 4.45312 19.4024 4.45312 20.5267 5.61238C21.6509 6.77164 21.6509 8.63744 21.6509 12.369V14.348C21.6509 18.0796 21.6509 19.9454 20.5267 21.1047C19.4024 22.2639 17.593 22.2639 13.9741 22.2639H10.1358C6.51689 22.2639 4.70746 22.2639 3.58322 21.1047C2.45898 19.9454 2.45898 18.0796 2.45898 14.348V12.369Z" stroke="black" stroke-width="1.43939"/>
                                        <path d="M17.813 16.3227L15.8938 16.3227M15.8938 16.3227L13.9746 16.3227M15.8938 16.3227L15.8938 14.3438M15.8938 16.3227L15.8938 18.3017" stroke="black" stroke-width="1.43939" stroke-linecap="round"/>
                                        </svg> 
                                    <span className='date-history ms-2'>{setDate(details.updated_at)}</span>
                                </div>
                        </div>
                        <div className="my-4">
                            <Paragraph className="date-title mb-4">Comment</Paragraph>
                                <div className="price-list mb-4">
                                    <span className='p-text-history'>{details.message}</span>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 issue_description mt-5">
                    <div className="p-4">
                        <div className="">
                            <Paragraph className="date-title mb-4">Date & Time</Paragraph>
                                <div className="price-list mb-4  d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M7.25586 4.45298V2.96875" stroke="#BDBDBD" stroke-width="1.43939" stroke-linecap="round"/>
                                        <path d="M16.8535 4.45298V2.96875" stroke="#BDBDBD" stroke-width="1.43939" stroke-linecap="round"/>
                                        <path d="M2.45898 9.39844H21.6509" stroke="#BDBDBD" stroke-width="1.43939" stroke-linecap="round"/>
                                        <path d="M2.45898 12.369C2.45898 8.63744 2.45898 6.77164 3.58322 5.61238C4.70746 4.45312 6.51689 4.45312 10.1358 4.45312H13.9741C17.593 4.45312 19.4024 4.45312 20.5267 5.61238C21.6509 6.77164 21.6509 8.63744 21.6509 12.369V14.348C21.6509 18.0796 21.6509 19.9454 20.5267 21.1047C19.4024 22.2639 17.593 22.2639 13.9741 22.2639H10.1358C6.51689 22.2639 4.70746 22.2639 3.58322 21.1047C2.45898 19.9454 2.45898 18.0796 2.45898 14.348V12.369Z" stroke="black" stroke-width="1.43939"/>
                                        <path d="M17.813 16.3227L15.8938 16.3227M15.8938 16.3227L13.9746 16.3227M15.8938 16.3227L15.8938 14.3438M15.8938 16.3227L15.8938 18.3017" stroke="black" stroke-width="1.43939" stroke-linecap="round"/>
                                        </svg> 
                                    <span className='date-history ms-2'>{setDate(details.reply_at)}</span>
                                </div>
                        </div>
                        <div className="my-4">
                            <Paragraph className="date-title mb-4">Reply</Paragraph>
                                <div className="price-list mb-4">
                                    <span className='p-text-history'>{details.reply}</span>
                                </div>
                        </div>
                    </div>
                </div>             
            </div>
        </>
    )
};
export default ContactAdminReply;
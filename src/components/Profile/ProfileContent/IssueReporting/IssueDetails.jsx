import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from "../../../../apis/context/AuthTokenContext";
import { getChatHistoryDetails } from '../../../../apis/Market';
import Paragraph from "../../../UI/Paragraph";

const IssueDetails = () => {
    const {id} = useParams()
    const [report, setHistory] = useState({});
    const {userId} = useContext(AuthContext);

    useEffect(()=>{
        const getHistory =  async () => {
            try{
                const result = await getChatHistoryDetails(id, userId);
                setHistory(result);
            }catch(error){

            }
        } 
        getHistory()
    },[]);

    const setDate = (roomdate) => {
        const date = new Date(roomdate);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };

        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
            <div className="container py-4">
                <div className="head-form d-flex justify-content-between">
                    <h2>Issue History</h2>
                </div>
                <div className="col-12 issue_description">
                    <div className="py-4 px-3">
                        <div className="d-flex align-items-center">
                            <img src={report.ticket_category?.image} alt={report.ticket_category?.name}/>
                            <Paragraph className='issue mb-0 ms-2'>{report.ticket_category?.name}</Paragraph>
                        </div>
                        <Paragraph className='issue mt-3 mb-0'>{report.case_type?.name}</Paragraph>
                    </div>
                    <hr /> 
                    <div className="p-sm-4 p-2">
                        {/* <div className="space-price">
                            <Paragraph className="h2-description mb-3">{report.ticket_sub_category?.name}</Paragraph>
                        </div> */}
                        <div className="space-price mb-5">
                            <Paragraph className="h2-description mb-3">Date & Time</Paragraph>
                                <div className="price-list">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M7.30469 3.85559V2.48438" stroke="#BDBDBD" stroke-width="1.37121" stroke-linecap="round"/>
                                    <path d="M16.4473 3.85559V2.48438" stroke="#BDBDBD" stroke-width="1.37121" stroke-linecap="round"/>
                                    <path d="M2.73633 8.42969H21.0192" stroke="#BDBDBD" stroke-width="1.37121" stroke-linecap="round"/>
                                    <path d="M2.73633 11.1725C2.73633 7.72506 2.73633 6.00134 3.80731 4.93036C4.87829 3.85938 6.60202 3.85938 10.0495 3.85938H13.706C17.1535 3.85938 18.8772 3.85938 19.9482 4.93036C21.0192 6.00134 21.0192 7.72506 21.0192 11.1725V13.0008C21.0192 16.4482 21.0192 18.172 19.9482 19.2429C18.8772 20.3139 17.1535 20.3139 13.706 20.3139H10.0495C6.60202 20.3139 4.87829 20.3139 3.80731 19.2429C2.73633 18.172 2.73633 16.4482 2.73633 13.0008V11.1725Z" stroke="black" stroke-width="1.37121"/>
                                    <path d="M17.3616 14.8361L15.5334 14.8361M15.5334 14.8361L13.7051 14.8361M15.5334 14.8361L15.5334 13.0078M15.5334 14.8361L15.5334 16.6644" stroke="black" stroke-width="1.37121" stroke-linecap="round"/>
                                </svg>
                                    <span className="ms-2">{setDate(report.date)}</span>
                                </div>
                        </div>
                        <div className="space-price my-5">
                            <Paragraph className="h2-description mb-3">Area</Paragraph>
                                <div className="price-list">
                                    <span>{report.venue?.title}</span>
                                </div>
                        </div>
                        <div className="space-price my-5">
                            <Paragraph className="h2-description mb-3">comment</Paragraph>
                                <div className="price-list">
                                    <span>{report.description}</span>
                                </div>
                        </div>
                        <div className="space-price my-5">
                            <Paragraph className="h2-description mb-3">status</Paragraph>
                                <div className="price-list">
                                    <span style={{
                                        color: '#05B15D'
                                    }}>{report.ticket_status?.name}</span>
                                </div>
                        </div>
                    </div>
                </div>             
            </div>

        </>
    )
};
export default IssueDetails;
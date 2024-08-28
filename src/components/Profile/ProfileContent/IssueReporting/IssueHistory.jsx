import { useContext, useEffect, useState } from "react";
import { getChatHistory } from '../../../../apis/Market';
import { AuthContext } from "../../../../apis/context/AuthTokenContext";
import Button from '../../../UI/Button';
import Paragraph from '../../../UI/Paragraph';

const IssueHistory = () => {
    const [reports, setHistory] = useState([]);
    const {userId} = useContext(AuthContext);

    useEffect(()=>{
        const getHistory =  async () => {
            try{
                const result = await getChatHistory(userId);
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
            <div className="container px-lg-5 px-md-3 p-0">
                <div className="head-form d-flex justify-content-between">
                    <h2>Report history</h2>
                </div>
                <div className="col-12 space-description">
                    { reports && reports.map(item=>{
                        return (
                            <Button className='p-0 d-block' tagType='link' to={`/profile/issueDetails/${item.id}`}>
                                <div className='d-flex justify-content-between align-items-center border-bottom my-5'>
                                    <div className='d-flex align-items-center'>
                                        <img src={item.ticket_sub_category.image} alt={item.ticket_sub_category.name} />
                                        <Paragraph className='ms-3 service_catering mb-0'>{item.ticket_sub_category.name}</Paragraph>
                                    </div>
                                    <div className="d-flex">
                                        <Paragraph className='mb-0 text-date me-2'>{setDate(item.date)}</Paragraph>
                                        <span className="seprator"></span>
                                        <Paragraph className={`mb-0 ms-2 status ${item.ticket_status?.name === 'Open' ? 'open' : ''}`}>{item.ticket_status.name}</Paragraph>
                                    </div>
                                </div>
                            </Button>
                        )
                        })
                    }
                </div>             
            </div>
        </>
    )
};

export default IssueHistory;
import { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { getTicketCategories } from '../../../../apis/config';
import Button from '../../../UI/Button';
import Paragraph from '../../../UI/Paragraph';
import './IssueReporting.css';

const IssueType = () => {

    const {case_id} = useParams();

    const [issues, setIssues] = useState([]);

    useEffect(()=>{
        const source = axios.CancelToken.source();

        getTicketCategories(source).then(res=>{
            setIssues(res);
        }).catch(err=>{console.log(err)})

        return ()=>source.cancel();
    },[]);

    return (
        <div className="container py-4 px-sm-5 px-3">
            <div className="head-form">
                <h2>Ticket Type</h2>
            </div>
            <div className="row row-cols-xxl-3 row-cols-lg-2 row-cols-md-2 row-cols-1 g-3 space-description">
                {issues && issues.map((issue, index)=>{
                    return (
                        <div className='col' key={index}>
                            <Button className='p-0 issue_type_box' tagType='link' to={`/profile/subissueType/${case_id}/type_${issue.id}`}>
                                <img src={issue.image} alt={issue.name} />
                                <Paragraph className='service_catering mb-0'>{issue.name}</Paragraph>
                            </Button>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
};
export default IssueType;
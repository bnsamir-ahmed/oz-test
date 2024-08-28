import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { getSubCategories } from '../../../../apis/config';
import Button from "../../../UI/Button";
import Paragraph from "../../../UI/Paragraph";

const SubissueType = () => {

    const {case_id, type_id} = useParams();
    const id = type_id.split('_')[1];
    const [subIssues, setSubIssues] = useState([]);

    useEffect(()=>{
        const source = axios.CancelToken.source();

        getSubCategories(source, id).then(res=>{
            setSubIssues(res);
        }).catch(err=>{console.log(err)})

        return ()=>source.cancel();
    },[id]);

    return (
        <div className="container py-4 px-sm-5 px-3">
            <div className="head-form">
                <h2>Ticket Type</h2>
            </div>
            <div className="row row-cols-xxl-3 row-cols-lg-2 row-cols-md-2 row-cols-1 g-3 space-description">
                {subIssues && subIssues.map((issue,index)=>{
                    return (
                        <div className='col' key={index}>
                            <Button className='p-0 issue_type_box' tagType='link' to={`/profile/issueplace/${case_id}/${type_id}/${issue.id}`}>
                                <Paragraph className='service_catering mb-0'>{issue.name}</Paragraph>
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};
export default SubissueType;
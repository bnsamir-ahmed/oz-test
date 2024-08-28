import React , {useContext, useEffect} from 'react';
import PrivateEventsHeader from "../components/PrivateEvents/PrivateEventsHeader/PrivateEventsHeader";
import PrivateEventsDetails from "../components/PrivateEvents/PrivateEventsDetails";
import { DataContext } from '../apis/context/SiteDataContext';

const PrivateEvents = () => {
    const { data, isPending, ResetPageName } = useContext(DataContext);

    useEffect(()=>{
        ResetPageName('private_events');
    },[]);

    return (
        <>
            <PrivateEventsHeader configData={data} pending={isPending}/>
            <PrivateEventsDetails/>
        </>
    );
};

export default PrivateEvents;

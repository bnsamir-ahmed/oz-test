import { useContext } from "react";
import BecomeMember from "../components/Membership/BecomeMembber/BecomeMember";
import MembershipTypes from "../components/Membership/MembershipTypes/MembershipTypes";
import MembershipHeader from "../components/Membership/MembershipHeader/MembershipHeader";
import Services from "../components/Membership/Services/Services";
import { DataContext } from '../apis/context/SiteDataContext';

const Spaces = () => {
    const { getComponentValue } = useContext(DataContext);
    
    return (
        <>
            <MembershipHeader title={'spaces'}/>
            <BecomeMember configData= {getComponentValue('page_space')}/>
            <MembershipTypes title={'Corporate'} subTitle={'Spaces Corporate'}/>
            <Services/>
        </>
    );
};
export default Spaces;
import React from 'react';
import IndividualHeader from "../components/Individual/IndividualHeader/IndividualHeader";
import IndividualTypes from "../components/Individual/IndividualTypes/IndividualTypes";
import MembershipCompared from "../components/Membership/MembershipsCompared/MembershipCompared";
import Services from "../components/Membership/Services/Services";
import MembershipTypes from "../components/Membership/MembershipTypes/MembershipTypes";

const Individual = () => {
    return (
        <>
            <IndividualHeader/>
            <IndividualTypes/>
            <MembershipCompared/>
            <Services/>
            <MembershipTypes/>
        </>
    );
};

export default Individual;

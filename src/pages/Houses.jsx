import React, { useContext } from 'react';
import HousesLocations from "../components/Houses/HousesLocations";
import JoinCommunityWhite from "../components/MonoBlocks/JoinCommunityWhite/JoinCommunityWhite";
import { DataContext } from '../apis/context/SiteDataContext';

const Houses = () => {
    const { getComponentValue, isPending } = useContext(DataContext);

    return (
        <>
            <HousesLocations configData={getComponentValue('page_location')} pending={isPending} />
            <JoinCommunityWhite/>
        </>
    );
};

export default Houses;

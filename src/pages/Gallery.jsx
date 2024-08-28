import { useEffect, useState, useContext } from 'react';
import GalleryHeader from "../components/Gallery/GalleryHeader/GalleryHeader";
import GalleryShow from "../components/Gallery/GalleryShow/GalleryShow";
import { config } from '../apis/config';
import { DataContext } from '../apis/context/SiteDataContext';

const Gallery = () => {

    const { data, isPending, ResetPageName } = useContext(DataContext);

    useEffect(()=>{
        ResetPageName('gallery');
    },[]);
    
    return (
        <>
            <GalleryHeader configData={data} pending={isPending}/>
            <GalleryShow/>
        </>
    );
};

export default Gallery;

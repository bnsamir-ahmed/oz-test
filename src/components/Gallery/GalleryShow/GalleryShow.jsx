import {useState, useEffect, useContext} from 'react';
import './GalleryShow.css';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import Media from "../../Media/Media";
import ShareButton from '../../UI/ShareButton';
import { getGalleryData } from '../../../apis/config';
import { AuthContext } from '../../../apis/context/AuthTokenContext';

const GalleryShow = () => {

    const [galleryData, setGalleryData] = useState([]);
    const [activeTab, setActiveTab] = useState("");
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const { isPending, error, data } = useQuery({
        queryKey: ['gallery-data'],
        queryFn: ({signal}) => getGalleryData(token, signal)
    });

    useEffect(()=>{
        // setGalleryData(response.data.data);
        // const initialTab = Object.keys(response.data.data)[0];
        // setActiveTab(initialTab);
        // getGalleryData();
    },[]);

    useEffect(() => {
        if(data) {
            const initialTab = Object.keys(data)[0];
            setActiveTab(initialTab);
            setGalleryData(data[initialTab]);
        }
    }, [data]);

    const HandleActive = (value) => {
        setActiveTab(value);
        setGalleryData(data[value]);
    };

    return (
        <>
        {console.log(galleryData)}
            <section className="gallery-show">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="head-date">
                                <h2>My 2023</h2>
                            </div>
                        </div>
                        <div className="filterButtons">
                            {data && 
                                Object.keys(data)?.map((category, index) => {
                                    return (
                                        <button
                                            key={index} 
                                            className={`btn btn-outline btn-filter-gallery border-0 ${category === activeTab ? 'active' : ''}`}
                                            type="button" 
                                            onClick={() => HandleActive(category)}>{category}</button>
                                    )
                                })
                            }
                        </div>
                        <div className='container'>
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1024: 4}}>
                                <Masonry columnsCount={3} gutter="30px">
                                    {galleryData ? galleryData?.map((gallery) => {
                                        const {image, id, category, text, date, title} = gallery;
                                        return (
                                            <div key={id} className={`gallery-item mx-auto ${category}`}>
                                                <div className="position-relative m-auto">
                                                    <Media
                                                        type="img" className="w-100" src={gallery.image} alt={`Gallery Item ${id}`}/>
                                                    <div className="gallery-description">
                                                       <ShareButton border={true} shareUrl={image} fav_dark={true} title={title}/>
                                                        <div className='py-5'></div>
                                                        <div className='text-center'>
                                                            <h3>{title}</h3>
                                                            <span>{date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }): ''}
                                </Masonry>

                            </ResponsiveMasonry>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default GalleryShow;


import { useEffect, useState } from 'react';
import MainHeaderWrapper from '../UI/MainHeaderWrapper';
import Paragraph from '../UI/Paragraph';
import { fetchOzies, ozy } from '../../apis/config';
import classes from '../UI/MainHeaderWrapper.module.css';
// import MainHeaderWrapper from '../UI/MainHeaderWrapper';

const OzysHeader = () => {
    const videosArr = [
        {
            id: '1',
            image: 'https://dashboard.ozcoworkingpark.com/assets/logos/oz_logo.png',
            title: 'Paul'
        },
        {
            id: '2',
            image: 'https://dashboard.ozcoworkingpark.com/assets/logos/oz_logo.png',
            title: 'Papa\' Jones'
        },
        {
            id: '3',
            image: 'https://dashboard.ozcoworkingpark.com/assets/logos/oz_logo.png',
            title: 'City Drink'
        },
    ]
    // const [videos, setVideos] = useState(videosArr);
    const [videos, setVideos] = useState([]);

    const [videoTitle, setVideoTitle] = useState('');
    const [videoTitles, setVideoTitles] = useState();
    const [currentIndex, setCurrentIndex] = useState(0)


    const getVideoTitle = (title) => {
        setVideoTitle(title);
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchOzies();
                // setVideoTitles(response)
                setVideos(response)

            } catch (error) {
                console.log(error);

            }
        }
        getData();
    }, [])
    const [ozysList, setOzysList] = useState([]);
    useEffect(() => {
        const ozyList = async () => {
            try {
                const response = await ozy();
                setOzysList(response)

            } catch (error) {
                console.log(error);

            }
        }
        ozyList()
    }, [])
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                videos.length > 0 ? (prevIndex + 1) % videos.length : 0
            );
        }, 3000); // Change every 3 seconds

        return () => clearInterval(timer); // Cleanup on unmount
    }, [videos]);
    // const currentItem = videos?.currentIndex?.value

    useEffect(() => {
        const timerVideo = setInterval(() => {
            setCurrentIndex((prev) => ozysList.length > 0 ? (prev + 1) % ozysList.length : 0)
        },3000);
        return () => clearInterval(timerVideo);
    }, [ozysList])

    return (
        <>


            <div className='position-relative'>
                <div className="position-relative"
                   style={{
                    backgroundImage: `url(${ozysList[currentIndex]?.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                }}
                >
                    <div className={`${classes.header_bg} justify-content-center`} >
                        <div className="container index-z">
                            {/* <video src=""></video> */}
                            {/* <img
                                className={`${classes.video_bg}`}
                                alt="oz video"
                                src={ozysList[currentIndex]?.image}
                               
                            /> */}
                            <div className='d-flex flex-column align-items-center'>
                                <Paragraph className="text-two"> {videos[currentIndex]?.value}</Paragraph>
                                <Paragraph className="text-two">{'X'}</Paragraph>
                                <Paragraph className="text-two">{'OZ'}</Paragraph>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
};
export default OzysHeader;

import { useEffect, useState } from 'react';
import MainHeaderWrapper from '../UI/MainHeaderWrapper';
import Paragraph from '../UI/Paragraph';
import { fetchOzies , ozy } from '../../apis/config';

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


    const getVideoTitle = (title) => {
        setVideoTitle(title);
    }
    useEffect(()=>{
        const getData = async ()=>{
            try{
                const response = await fetchOzies();
                // setVideoTitles(response)
                setVideos(response)

            }catch(error){
                console.log(error);
                
            }
        }
        getData();
    },[])
    const [ozysList, setOzysList] = useState([]);
    useEffect(()=>{
        const ozyList = async () =>{
            try{
                const response = await ozy();
                setOzysList(response)
                
            }catch(error){
                console.log(error);
                
            }
        }
        ozyList()
    },[])
  

    

    return (
        <>
        {/* {console.log(videoTitle) } */}
        {console.log(videos) }

            <div className='position-relative'>
                <MainHeaderWrapper video={videos} media={ozysList} special_flex={`justify-content-center`} getVideoTitle={getVideoTitle}>
                    <div className="container">
                        <div className='d-flex flex-column align-items-center'>
                            <Paragraph className="text-two">{videoTitle}</Paragraph>
                            <Paragraph className="text-two">{'X'}</Paragraph>
                            <Paragraph className="text-two">{'OZ'}</Paragraph>
                        </div>

                    </div>
                </MainHeaderWrapper>
            </div>
        </>
    )
};
export default OzysHeader;
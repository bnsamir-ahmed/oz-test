
import { useState } from 'react';
import MainHeaderWrapper from '../UI/MainHeaderWrapper';
import Paragraph from '../UI/Paragraph';

const OzysHeader = () => {
    const videosArr = [
        {
            id: '1',
            video: '',
            title: 'Paul'
        },
        {
            id: '2',
            video: '',
            title: 'Papa\' Jones'
        },
        {
            id: '3',
            video: '',
            title: 'City Drink'
        },
    ]
    const [videos, setVideos] = useState(videosArr);
    const [videoTitle, setVideoTitle] = useState('');

    const getVideoTitle = (title) => {
        setVideoTitle(title);
    }

    return (
        <>
            <div className='position-relative'>
                <MainHeaderWrapper video={videos} special_flex={`justify-content-center`} getVideoTitle={getVideoTitle}>
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
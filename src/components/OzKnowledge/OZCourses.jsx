import { useParams } from 'react-router-dom';
import MainHeaderWrapper from '../UI/MainHeaderWrapper';
import Paragraph from '../UI/Paragraph';
import img from '../../assets/images/Rectangle_3.png';
import CoursesDetails from './CoursesDetails';
import { useEffect, useState } from 'react';

const OZCourses = () => {
    const { id } = useParams();

    const categories = JSON.parse(localStorage.getItem('courseOzCat'));
    const [category, setCategory] = useState({});

    useEffect(()=>{
        const getFiltercat = () => {
            categories.map((item) => {
                if (item.id === +id){
                    setCategory(item);
                }
            });
        }
        getFiltercat()
    },[id, categories])

    return (
        <>
            <MainHeaderWrapper 
                image={category?.image} 
                height='585px'>
                <div className={`container-fluid px-70`}>
                    <div className='col-xl-6 col-lg-9 col-12'>
                        <Paragraph className='main_header_title mb-3'>OZ Knowledge</Paragraph>
                        <Paragraph className='head_paragraph mb-3'>{category?.title}</Paragraph>
                        <Paragraph className='description mb-0'>{''}</Paragraph>
                    </div>
                </div>
            </MainHeaderWrapper>
            <CoursesDetails />
        </>
    )
};
export default OZCourses;
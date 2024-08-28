import { Skeleton } from 'antd';

const AboutCourse = ({descriptions, isPending}) => {
    return (
        <>
            <section className="border-of-section py-5">
                <div className="container-fluid px-70">
                    <h1 className="course_details_title mb-5">about course</h1>
                    {isPending && (<Skeleton active paragraph={{rows: 3}} />)}

                    <div dangerouslySetInnerHTML={{ __html: descriptions}}></div>
                    {/* <Paragraph className='course_details_desc mb-4'>Covers pretty much everything you need to know about UX</Paragraph>
                    <Paragraph className='course_details_light_desc mb-4'>
                        This course will teach you everything you need to know about UX, including design, content, and coding. And you'll learn from the ground up, so it doesn't matter how much experience you have when you start.
                        You'll be exposed to principles and strategies, but, more importantly, you'll learn how to actually apply these abstract concepts by coding three different websites for three very different audiences.
                    </Paragraph>
                    <ul className="ps-3 course_details_light_list">
                        <li>Apply UX strategies to a site's content & design</li>
                        <li>Understand Information Architecture to enhance the content on your website</li>
                        <li>Know what dictates how your website should look</li>
                        <li>Design and code a B2B website, a B2C blog, and an ecommerce site</li>
                    </ul> */}
                </div>
            </section>
        </>
    )
};
export default AboutCourse;
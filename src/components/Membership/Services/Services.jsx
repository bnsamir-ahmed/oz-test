import './Services.css';
import vector from "../../../assets/images/Vector.png";
import ServicesList from "./ServicesList";
import { useLocation } from "react-router-dom";
import Paragraph from '../../UI/Paragraph';
import { getMembershipAmenities } from '../../../apis/MembershipApi';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';

const Services = () => {
    const location = useLocation();
    const isMembershipPage = location.pathname === '/membership';

    const { error, data: amenities, isPending } = useQuery({
        queryKey: ['listmembership-services'],
        queryFn: () => getMembershipAmenities()
    });

    return (
        <>
            <section className={`membership-component ${isMembershipPage ? 'yellow-background p-60' : ''} py-5`}>
                <div className="position-relative d-md-block d-none">
                    <img
                        src={vector}
                        className="position-absolute"
                        style={{ top: "0px", left: "0", width: "100px" }}
                        alt="shape"
                    />
                </div>
                <div className="container-fluid px-70">
                    <div className="head-content-left-shape text-left position-relative ms-4" style={{ zIndex: '99' }}>
                        <Paragraph className="bold-head mb-4 ">What you'll get</Paragraph>
                        <Paragraph className="text-content text-secondary">Enjoy the boundlessness of possibilities at OZ:</Paragraph>
                    </div>
                    <div className="row">
                        {isPending ? (
                            <div className="col-lg-4 col-md-6 col-sm-12 my-0 my-xl-4 my-md-4">
                                <div className="features">
                                    <Skeleton.Avatar active className="mb-3"/>
                                    <Skeleton paragraph={{ rows: 2}} title={true} active />
                                </div>
                            </div>
                        )
                            : (
                                amenities.map((amenity) => {
                                    const { id, title, image, description } = amenity;
                                    return (
                                        <div className="col-lg-4 col-md-6 col-sm-12 my-0 my-xl-4 my-md-4" key={id}>
                                            <ServicesList id={id} title={title} image={image} description={description} />
                                        </div>
                                    )
                                })
                            )}
                    </div>
                </div>
            </section>
            {error && <Paragraph className='alert alert-danger my-5'>{error.message}</Paragraph>}

        </>
    );
};

export default Services;

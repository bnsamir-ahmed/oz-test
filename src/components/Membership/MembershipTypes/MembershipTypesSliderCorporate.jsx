import React, { useContext } from 'react';
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import { getListMembershipTypes } from '../../../apis/MembershipApi';
import MembershipTypesList from './MembershipTypesList';
import Paragraph from '../../UI/Paragraph';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import SkeletonCard from '../../UI/SkeletonCard';

const MembershipTypesSliderCorporate = ({ currentMemberId }) => {

    const { token } = useContext(AuthContext);

    const { error, data: types, isPending } = useQuery({
        queryKey: ['listMembershipTypes-corporate', token],
        queryFn: ({ signal }) => getListMembershipTypes(token, "no", signal)
    });

    const settings = {
        dots: false,
        arrows: true,
        slidesToShow:
            types && types.corporate
                ? types.corporate.length > 3
                    ? 3
                    : currentMemberId
                        ? types.corporate.length - 1
                        : types.corporate.length
                : 0,
        slidesToScroll: 1,
        infinite: false,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow:
                        types && types.corporate
                            ? types.corporate.length > 3
                                ? 3
                                : currentMemberId
                                    ? types.corporate.length - 1
                                    : types.corporate.length
                            : 0,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            },
            {
                breakpoint: 3,
                settings: "unslick",

            }
        ]

    };

    return (
        <>
            {
                isPending ? (
                    <div className='row'>
                        {[1, 2, 3].map((n, index) => {
                            return (
                                <div className="col-4 px-2" key={index}>
                                    <SkeletonCard />
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <>
                        {types && types['corporate']?.lenght > 1 ?
                            (
                                <Slider {...settings} className='corporate_slider'>
                                    {types && types['corporate']?.map((listMembershipType) => {
                                        const { id, name, link, description, logo } = listMembershipType;
                                        if (currentMemberId !== id) {
                                            return (
                                                <div className="col-xl-4 col-sm-12 px-2" key={id}>
                                                    <MembershipTypesList
                                                        id={id}
                                                        name={name}
                                                        link={link}
                                                        description={description}
                                                        image={logo}
                                                    />
                                                </div>
                                            )
                                        }
                                    })}
                                </Slider>
                            )
                            :
                            (
                                <>
                                    {types && types['corporate']?.map((listMembershipType) => {
                                        const { id, name, link, description, logo } = listMembershipType;
                                        if (currentMemberId !== id) {
                                            return (
                                                <div className="col-xl-4 col-sm-12 px-2" key={id}>
                                                    <MembershipTypesList
                                                        id={id}
                                                        name={name}
                                                        link={link}
                                                        description={description}
                                                        image={logo}
                                                    />
                                                </div>)
                                        }
                                    })}
                                </>
                            )
                        }
                    </>
                )
            }
            {error && <Paragraph>there is no membership type to display</Paragraph>}
        </>
    );

}
export default MembershipTypesSliderCorporate;
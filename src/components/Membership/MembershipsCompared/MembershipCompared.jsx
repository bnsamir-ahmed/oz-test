import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import check from '../../../assets/images/icons/twemoji_check-mark.svg';
import './MembershipCompared.css';
import Media from '../../Media/Media';
import {getMembershipOptions} from '../../../apis/MembershipApi';

const MembershipCompared = (key, value) => {
    const [listMembershipsTypes, setListMembershipsTypes] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');
    const [selectedDiscount, setSelectedDiscount] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedAmenities, setSelectedAmenities] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMembershipOptions(id);
                setListMembershipsTypes(result);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    if (listMembershipsTypes.length === 0) {
        return <div>Loading...</div>; // Placeholder while data is being fetched
    }

    const filteredOptions = listMembershipsTypes
        .flatMap(function (type) {
            return type.options.map(function (option) {
                return {
                    ...type,
                    ...option,
                    typeId: type.id,
                    typeDescription: type.description,
                };
            });
        })
        .filter(function (option) {
            return option.typeId === `${id}`;
        });

    const uniqueAmenityTitles = new Set();

    filteredOptions.forEach((option) => {
        option.amenities.forEach((amenity) => {
            uniqueAmenityTitles.add(amenity.title);
        });
    });

    const handleCheckout = (type) => {
        const selectedOption = filteredOptions.find((option) => option.type === type);

        if (selectedOption) {
            const {discount, price, amenities} = selectedOption;

            setSelectedType(type);
            setSelectedDiscount(discount);
            setSelectedPrice(price);
            setSelectedAmenities(amenities);
            // Save selected type, discount, and price in local storage
            localStorage.setItem('selectedType', type);
            localStorage.setItem('selectedDiscount', discount);
            localStorage.setItem('selectedPrice', price);
            localStorage.setItem('selectedAmenities', JSON.stringify(amenities));
        }

        // Navigate to the inquiry page with selected type as a parameter
        navigate('/joinus');
    };

    return (
        <>
            <section className="memberships-compared p-60 table-responsive">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="head-content pb-5">
                                <h2 className="large-head">Learn More</h2>
                            </div>

                            <table className="table table-compared">
                                <thead>
                                <tr>
                                    <th className="table-head" style={{textAlign: 'left'}} scope="col">
                                        Memberships compared
                                    </th>
                                    {filteredOptions[0].options.map((option) => (
                                        <th className="table-head" scope="col" key={option.id}>
                                            {option.type}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {[...uniqueAmenityTitles].map((amenityTitle, index) => (
                                    <tr key={index}>
                                        <th className="table-item" scope="row">
                                            {amenityTitle}
                                        </th>
                                        {filteredOptions[0].options.map((subOption) => (
                                            <td key={subOption.id}>
                                                {subOption.amenities.some((amenity) => amenity.title === amenityTitle) ? (
                                                    <Media type="img" src={check} alt={check}/>
                                                ) : null}
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                                <tr>
                                    <th className="table-item" scope="row">
                                        Price for membership
                                    </th>
                                    {filteredOptions[0].options.map((option) => (
                                        <td key={option.id}>
                                            <del className="member_discount">{option.discount} / Monthly</del>
                                            <br/>
                                            <strong className="current_price">{option.price} / Monthly</strong>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <th className="table-item" scope="row">
                                        checkout
                                    </th>

                                    {filteredOptions[0].options.map((option) => (
                                        <td key={option.id}>
                                            <button className="button-one-outline btn-bg-white"
                                                    onClick={() => handleCheckout(option.type)}>Apply
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MembershipCompared;

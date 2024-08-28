import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import './MebershipOptions.css';
import {useParams} from "react-router-dom";
import MembershipSingleOptionList from "./MembershipSingleOptionList";
import ServicesList from "./ServicesList";
import vector from "../../../assets/images/Vector.png";
import Locations from "../../Locations/Locations";
import {getMembershipOptions} from "../../../apis/Api";
import Media from "../../Media/Media";

const MembershipSingleOption = () => {
    const {id} = useParams();
    const [singleOption, setSingleOption] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const result = await getMembershipOptions(id);
            setSingleOption(result);
            console.log(result);
        };
        fetchData();
    }, [id]);


    // const  filteredOptions = singleOption.flatMap((type) => type.options.filter((option) => option.id === `${id}`));
    // const filteredOptions = singleOption.flatMap(function(type) {
    //     return type.options.map(function(option) {
    //         return {
    //             id: option.id,
    //             type: option.type,
    //             logo: option.logo,
    //             cancellation_policy: option.cancellation_policy,
    //             typeId: type.id,
    //
    //         };
    //     }).concat({
    //         id: type.id,
    //         type: type.type,
    //         logo: type.logo,
    //         cancellation_policy:type.description
    //         // typeId: type.id
    //     });
    // }).filter(function(option) {
    //     return option.id === `${id}`;
    // });
    // console.log(filteredOptions);

    // Make Function FilteredOptions to Get only on ID Properties not all
    const filteredOptions = singleOption.flatMap(function (type) {
        return type.options.map(function (option) {
            return {
                ...type, // include all the properties of the type object
                ...option, // include all the properties of the option object
                typeId: type.id,
                typeName: type.name
            };
        });
    }).filter(function (option) {
        return option.id === `${id}`;
    });
    console.log(filteredOptions);


    return (
        <>

            {/*<!--Start Become a member-->*/}
            <section className="become-member p-60">
                <Container>
                    {filteredOptions.map((option, index) => {
                        const {id, name, description, image, typeDescription, typeName, amenities, title} = option;
                        return (
                            <Row>
                                <MembershipSingleOptionList id={id} name={name} description={description}
                                                            typeName={typeName} image={image} amenities={amenities}/>

                            </Row>
                        )
                    })}
                </Container>
            </section>
            {/* <!--End Become a member-->*/}
            {/*Start Section What-get*/}
            <section className="what-get p-60">
                <div className="position-relative">
                    <Media
                        type="img" src={vector} className="position-absolute"
                        style={{top: "0px", left: "0", width: "100px"}} alt="shape"/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="head-content-left-shape text-left pb-3 position-relative">
                                <h3 className="bold-head pb-5">What you'll get</h3>
                                <p className="text-content text-secondary">Lorem ipsum dolor sit amet, consectetur
                                    dipiscing elit eius mod tempor incididunt ut labore </p>
                            </div>
                        </div>


                        {filteredOptions.map((option, index) => {
                            const {id, name, description, image, typeDescription, typeName, amenities, title} = option;
                            return (
                                <>
                                    {amenities.length > 0 ? (
                                        amenities.map((amenity, index) => {
                                            const {title, id, logo, how_many_hours} = amenity;
                                            return (
                                                <ServicesList title={title} id={id} logo={logo}
                                                              how_many_hours={how_many_hours}/>
                                            )

                                        })
                                    ) : (
                                        <h4> Available Soon🧨⛔🧨⛔🧨⛔🧨⛔🧨⛔🧨 </h4>
                                    )}
                                </>
                            )
                        })}

                    </div>
                </div>
            </section>
            {/*End Section What-get*/}

            {/*Start Our Locations*/}
            <Locations/>
            {/*END*/}
        </>
    );
};

export default MembershipSingleOption;

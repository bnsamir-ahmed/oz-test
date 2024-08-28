import React from 'react';
import {individualTypes} from "../../../Data/IndividualsTypesData";
import IndividualTypesList from "./IndividualTypesList";
import './IndividualTypes.css';

const IndividualTypes = () => {
    return (
        <>

            <section className="Individual-types p-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="head-content pb-5">
                                <h2 className="hand-write text-center p-0">Individual Option</h2>
                            </div>
                        </div>
                            {individualTypes.map((individualType,index)=>{
                                const {id, img, name} = individualType;
                                return(
                                    <div className="col-lg-4 col-md-6 col-sm-12 my-1">
                                    <IndividualTypesList id={id} name={name} img={img}/>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </section>


        </>
    );
};

export default IndividualTypes;

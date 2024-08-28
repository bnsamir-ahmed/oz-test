import React from "react";
import vector from "../assets/images/Vector.png";
import ContactusForm from '../components/Forms/ContactUS/ContactusForm';

const Contactus = () => {

    return (
        <>
            <section className="contactus auth my-5">
                <div className="position-relative">
                    <div className='img_float'>
                        <img
                            src={vector} 
                            alt="shape"/>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="pb-3 position-relative">
                                <div className="text-shape">
                                    <h1 className="hand-write">Lets Connect,</h1>
                                    <h3 className="bold-head">Schedule a tour, say hello</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-card p-md-5 p-3">
                                <ContactusForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contactus;

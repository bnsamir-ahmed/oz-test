import React from "react";
import "../MonoBlocks.css";
import {Link} from "react-router-dom";

const JoinCommunityWhite = () => {
    return (
        <>
            <section className="monoBlock bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="content-block">
                                <h1 className="text-h1">JOIN OUR COMMUNITY </h1>
                                <p className="text-p">
                                    Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod
                                    Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod
                                    Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod
                                    Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod
                                    Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod
                                </p>
                            </div>
                            <div className="buttons d-flex justify-content-center align-items-center">
                                <Link to="/contactus" href="src/components/MonoBlocks#"
                                      className="btn button-outLine btn-bg-white">
                                    Connect
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JoinCommunityWhite;

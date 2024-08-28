import React from 'react';
import './MonoBlocks.css';
 
const MonoBlock = (props) => {
    const {configMonoBlock, link, className, numberOfLinksToShow} = props;
    const links = Array.isArray(link) ? link.slice(0, numberOfLinksToShow) : [];
// console.log(configData);
    return (
        <>
            <section className={`monoBlock ${className}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="content-block">
                                {/* {configData ? configData.map((configItem, index) => (
                                    <React.Fragment key={index}>
                                       {configItem.key === 'home_page_mono_block_title' && <h1 className="text-h1">{configItem.value}</h1>}
                                        {configItem.key === 'home_page_mono_block_description' && <p className="text-p">{configItem.value}</p>}
                                    </React.Fragment>
                                )): ''} */}
                            </div>
                            <div
                                className="buttons d-lg-flex d-md-flex d-sm-block my-3 justify-content-center align-items-center text-center">
                                {links.map((linkText, index) => (
                                    <a key={index} href="#" className={`btn button-outLine my-3 ${linkText.className}`}>
                                        {linkText.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MonoBlock;

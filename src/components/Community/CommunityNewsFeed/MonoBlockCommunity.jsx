
import React from "react";
import Paragraph from "../../UI/Paragraph";
import { Skeleton } from "antd";
const MonoBlockCommunity = (props) => {
    return (
        <>
            <section className={` border-top mt-4`}>
                <div className="monoBlock bgBlack mt-4 community">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="content-block text-center">
                                    {props.pending ? (
                                        <Skeleton active paragraph={{ rows: 3 }} />
                                    ) : (
                                        props.configData.map((configItem, index) => (
                                            <React.Fragment key={index}>
                                                {configItem.key === "community_page_header_description" && (
                                                    <Paragraph className='white_monoBlock_title'>
                                                        {configItem.value}
                                                    </Paragraph>
                                                )}
                                            </React.Fragment>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default React.memo(MonoBlockCommunity);
import React from "react";
import "./CommunityNewsFeed.css";
import Media from "../../Media/Media";

const CommunityNewsList = ({id, img}) => {
    return (
        <>
            <figure className="" key={id}>
                <Media
                    src={img}
                    type="img"
                    className="figure-img img-fluid image-box w-100"
                    alt="news feed"
                />
            </figure>
        </>
    );
};

export default CommunityNewsList;

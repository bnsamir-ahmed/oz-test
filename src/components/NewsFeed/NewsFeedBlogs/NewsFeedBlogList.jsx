import React from 'react';
import Card from "react-bootstrap/Card";
import './NewsFeedBlog.css';
import {NavLink} from "react-router-dom";
import Media from "../../Media/Media";

const NewsFeedBlogList = ({id, img, text, title, category}) => {
    return (
        <>
            <NavLink to={`/community/newsfeed/singleFeed/${id}`}>
                <Card className="Card-news" key={id}>
                    <Media
                        type="img" 
                        src={img} 
                        className="card-img-top rounded-0 " 
                        title={title}/>
                    <Card.Body>
                        <span className="feed-category">{category}</span>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>{text.slice(0,50)}...</Card.Text>
                    </Card.Body>
                </Card>
            </NavLink>

        </>
    );
};

export default NewsFeedBlogList;

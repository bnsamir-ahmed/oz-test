import React from "react";
import Card from "react-bootstrap/Card";
import Button from "../../UI/Button";

const CommunityEventsList = ({id, text, title, img, linkText}) => {
    return (
        <>
            <Card className="image-box">
                {/*<Card.Img variant="top" className="rounded-0" title={title}/>*/}
                <img type="img" src={img} className="card-img-top rounded-0" title={title} alt={title}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{text}</Card.Text>
                    <Button href="#">{linkText}</Button>
                </Card.Body>
            </Card>
        </>
    );
};

export default CommunityEventsList;

import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "../../UI/Button";
import AddToFavButton from '../../UI/AddToFavButton';
import { useNavigate } from "react-router-dom";

const BookingSpaceList = ({id, img, description, price, name, amenities, is_favorite, default_price_per}) => {
    const navigate = useNavigate()
    return (
        <>
            <Card className="book-card" key={id}>

                <div className="position-relative">
                    <img 
                        src={img} 
                        className="card-img-top rounded-0" 
                        title="desk room" 
                        height='309px' 
                        onClick={()=>{navigate(`/bookingDetails/${id}`)}}
                    />

                    <AddToFavButton is_favorite={is_favorite} id={id} add_fav={true} type={'booking'}/>


                </div>
                <Card.Body>
                    <Card.Title onClick={()=>{navigate(`/bookingDetails/${id}`)}} style={{
                        cursor: 'pointer'
                    }} className='dynamic_wraper_1'>{name}</Card.Title>

                    <ul className="list-options ">
                        {amenities?.slice(0, 3).map((single, index) => {
                            return (
                                <li className="list-option-item" key={index}>{single.name}</li>
                            )
                        })}
                    </ul>
                    <Card.Text className='dynamic_wraper'>{description}</Card.Text>
                    <div
                        className="d-flex justify-content-between align-items-center card-footer p-0">
                        <span className="price-hour">{price} EGP / {default_price_per}</span>
                        <Button to={`/bookingDetails/${id}`} tagType='link' className='btn_outline_black'>Book Now</Button>
                    </div>

                </Card.Body>


            </Card>
        </>
    );
};

export default BookingSpaceList;

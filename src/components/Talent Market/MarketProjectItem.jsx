import Card from "react-bootstrap/Card";
import Button from "../UI/Button";
import Paragraph from "../UI/Paragraph";
import Media from "../Media/Media";
import AddToFavButton from '../UI/AddToFavButton';
import { useNavigate } from "react-router-dom";

const MarketProjectItem = ({id, title, image, category, category_logo, user, description, lastseen, is_favorite})=>{

    const setHours = (seconds) => {
        const milliseconds = seconds * 1000;
        const date = new Date(milliseconds);
        return date.getUTCHours();
    };
    const navigate = useNavigate();

    return (
        <>

            <Card className="book-card" key={id}>

                <div className="position-relative">
                    <Media 
                        type="img" 
                        src={image} 
                        className="card-img-top rounded-0" 
                        title="desk room" 
                        height='309px'
                        onClick={()=>{navigate(`/projectDetails/${id}`)}}
                    />

                    <AddToFavButton is_favorite={is_favorite} id={id} add_fav={true} type={'market'}/>


                </div>
                <Card.Body>
                    <Card.Title onClick={()=>{navigate(`/projectDetails/${id}`)}}>{title}</Card.Title>
                    <div className="d-flex  my-3">
                        <Paragraph className="list-option-item m-0 d-flex align-items-center me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className='me-2' width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4.27148 18.3457C4.27148 18.3457 6.5005 15.5 12.0005 15.5C17.5005 15.5 19.7296 18.3457 19.7296 18.3457" stroke="#BDBDBD" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.998 2C6.4752 2 1.99805 6.47715 1.99805 12C1.99805 17.5228 6.4752 22 11.998 22C17.5208 22 21.998 17.5228 21.998 12C21.998 6.47715 17.5208 2 11.998 2Z" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#BDBDBD" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>{user}
                        </Paragraph>
                        <Paragraph className="list-option-item m-0 d-flex align-items-center me-3">
                            <img src={category_logo} alt={category} />
                            {category}
                        </Paragraph>
                    </div>
                   
                    <Card.Text>{description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center card-footer p-0">
                        <Paragraph className='mb-0 black-span'>{setHours(parseInt(lastseen, 10))} hrs ago</Paragraph>
                        <Button to={`/projectDetails/${id}`} tagType='link' className='btn_outline_black px-3 py-2'>View Details</Button>
                    </div>

                </Card.Body>


            </Card>
        </>
    )
};
export default MarketProjectItem;
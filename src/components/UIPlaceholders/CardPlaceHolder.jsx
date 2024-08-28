import Placeholder from 'react-bootstrap/Placeholder';
import { Card } from 'react-bootstrap';

const CardPlaceHolder = () => {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                <Placeholder as={Card.Title} animation="wave">
                    <Placeholder xs={6}  bg='secondary' style={{
                        textAlign: 'start'
                    }}/>
                </Placeholder>
                <Placeholder as={Card.Text} animation="wave">
                     <Placeholder xs={12}  bg='secondary'/>
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
                </Card.Body>
            </Card>
        </>
    )
};
export default CardPlaceHolder;
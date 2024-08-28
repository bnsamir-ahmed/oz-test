import { useState } from 'react';
import OzysHeader from './OzysHeader';
import OzysList from './OzysList';
import imgPaul from '../../assets/images/image 11.png';
import imgPapa from '../../assets/images/image 18.png';
import imgCity from '../../assets/images/image 19.png';


const Ozys = () => {
    const List = [
        {
            id: '1',
            img: imgPaul,
            title: 'Paul',
            description: 'Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod '

        },
        {
            id: '2',
            img: imgPapa,
            title: 'Papa\' Jones',
            description: 'Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod '
        },
        {
            id: '3',
            img: imgCity,
            title: 'City Drink',
            description: 'Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod '

        }
    ];
    const [ozys, setOzys] = useState(List);

    return (
        <>
            <OzysHeader />
            <section className="private-events-details border-top">
                <div className="container-fluid">
                    {ozys.map((item, index) => {
                        const {id, title, img, description} = item;
                        return (
                            <div className="row border-of-section" key={index}>
                                <OzysList 
                                    id={id} 
                                    img={img} 
                                    index={index}
                                    title={title}
                                    description={description}
                                />
                            </div>
                        )
                    })}

                </div>
            </section>
        </>
    )
};
export default Ozys;
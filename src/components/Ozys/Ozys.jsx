import { useEffect, useState } from 'react';
import OzysHeader from './OzysHeader';
import OzysList from './OzysList';
import imgPaul from '../../assets/images/image 11.png';
import imgPapa from '../../assets/images/image 18.png';
import imgCity from '../../assets/images/image 19.png';
import { ozys } from '../../apis/config';
import axios from 'axios'; // Ensure axios is imported

const Ozys = () => {
    // Hard-coded initial list as fallback or default items
    const defaultList = [
        {
            id: '1',
            img: imgPaul,
            title: 'Paul',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod '
        },
        {
            id: '2',
            img: imgPapa,
            title: 'Papa\' Jones',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod '
        },
        {
            id: '3',
            img: imgCity,
            title: 'City Drink',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod '
        }
    ];

    const [ozysList, setOzysList] = useState([]);
    const [ozysLists, setOzysLists] = useState([]);

    useEffect(() => {
        const fetchOzies = async () => {
            try {
                const config = {
                    method: 'get',
                    url: `https://dashboard.ozcoworkingpark.com/api/ozies`,
                    headers: {
                        'Accept': 'application/json', // Set the Accept header to JSON
                    },
                };

                // Make the request
                const response = await axios(config);
                // console.log(response);
                setOzysList(response.data.data)

                // Assuming the actual data is within `response.data.data`
                if (response.data && response.data.data) {
                    setOzysList(response.data.data);
                    // setOzysList
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOzies(); 
    }, []);

    return (
        <>
            {/* {console.log(ozysList)} */}
            <OzysHeader />
            <section className="private-events-details border-top">
                <div className="container-fluid">
                    {ozysList?.map((item, index) => {
                        const { id, title, image, description } = item;
                        return (
                            <div className="row border-of-section" key={index}>
                                <OzysList
                                    id={id}
                                    img={image}
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
    );
};

export default Ozys;

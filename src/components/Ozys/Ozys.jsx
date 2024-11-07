import { useEffect, useState } from 'react';
import OzysHeader from './OzysHeader';
import OzysList from './OzysList';
import imgPaul from '../../assets/images/image 11.png';
import imgPapa from '../../assets/images/image 18.png';
import imgCity from '../../assets/images/image 19.png';
import { ozy } from '../../apis/config';

const Ozys = () => {
    // Hard-coded initial list as fallback or default items
    // const defaultList = [
    //     {
    //         id: '1',
    //         img: imgPaul,
    //         title: 'Paul',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod '
    //     },
    //     {
    //         id: '2',
    //         img: imgPapa,
    //         title: 'Papa\' Jones',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod '
    //     },
    //     {
    //         id: '3',
    //         img: imgCity,
    //         title: 'City Drink',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod '
    //     }
    // ];

    const [ozysLists, setOzysLists] = useState([]);
    const [ozysList, setOzysList] = useState([]);
    useEffect(()=>{
        const ozyList = async () =>{
            try{
                const response = await ozy();
                setOzysList(response)
                
            }catch(error){
                console.log(error);
                
            }
        }
        ozyList()
    },[])
  


  

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

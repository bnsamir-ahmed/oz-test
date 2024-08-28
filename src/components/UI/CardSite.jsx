import React from 'react'
import { Link } from 'react-router-dom';
import Paragraph from './Paragraph';

const  CardSite = (props )=> {
   const linkElements = props.links.map((link, index) => {
     if(props.to){
        const stringWithoutSpaces = link.name.replace(/\s/g, "");
      return ( <Link key={index} className='pb-3 links' to={props.to+stringWithoutSpaces}>{link.name}</Link>) 
     }else{
        return ( <Link key={index} className='pb-3 links' to={link.to}>{link.name}</Link>)

     }
   }
 );
  return (
    <>
       <div className='site_card mb-4'>
                <Paragraph className='title_link'>{props.title}</Paragraph>
                <ul className='p-0 d-flex flex-column'> 
                {linkElements }
                </ul>
            </div>
    </>
  )
}

export default CardSite

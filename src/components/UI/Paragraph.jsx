import React from 'react';
import './Paragraph.css';
function Paragraph(props) {
  return (
    <>
     <p className= {`${props.className}`} 
        style={props.style} 
        data-aos={props.data_aos} 
        data-aos-delay={props.data_aos_delay}
        data-aos-duration={props.data_aos_duration}
        data-aos-once={props.data_aos_once}
        >{props.children}</p> 
    </>
  )    
}

export default React.memo(Paragraph) ;

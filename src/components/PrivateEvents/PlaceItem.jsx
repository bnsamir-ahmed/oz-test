import React, {useState} from 'react';

import './PrivateEventsDetails.css'

const PlaceItem = ({place, img, isActive, setActiveImg}) => {

    const [active, setActive] = useState(false);

    const handlePlaceClick = (event) => {
        setActive(true);
        setActiveImg(place.images);
        // Change the color of the li element to black when it is clicked.
        // Change the color of the li element to black when it is clicked.
        const liName = event.currentTarget;
        liName.classList.add('active');

        // Get all of the active li elements.
        const activeLiElements = document.querySelectorAll('.private-events-details .places li.active');

        // Remove the active class from all of the active li elements.
        for (const activeLiElement of activeLiElements) {
            activeLiElement.classList.remove('active');
        }
    };

    return (
        <li
            onClick={handlePlaceClick}
            className={`list-unstyled list-places ${active ? 'active' : 'nonactive'}`}
            data-active={active}
        >
            {place.name}
        </li>
    );
};


export default PlaceItem;

import React, { useState, useEffect } from 'react';

const DisableContext = React.createContext();

const DisableProvider = ({children}) => {

    const [stateDisable, setStateDisable] = useState(false);
    const [image, setImage] = useState()
    
    const restState = (incomingState) => {
        setStateDisable(incomingState)
    };

    const imageValue = (image) => {
        setImage(image);
    };

    return (
        <DisableContext.Provider value={{stateDisable, restState, image, imageValue}}>
            {children}
        </DisableContext.Provider>
    );
};

export {DisableContext, DisableProvider};
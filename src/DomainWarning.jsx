import React, {useState} from 'react';

const DomainWarning = () => {
    const [showErrorMessage, setShowErrorMessage] = useState(true);

    const handleClickTrustDomain = () => {
        setShowErrorMessage(false);
    };

    return (
        <div>
            {showErrorMessage && (
                <div className="error-message">
                    The domain is a technical domain only. Please proceed with caution.
                    <button onClick={handleClickTrustDomain}>Trust Domain</button>
                </div>
            )}
            {/* Rest of your component's code */}
        </div>
    );
};

export default DomainWarning;

import React from 'react'
import Paragraph from '../UI/Paragraph';
import Button from '../UI/Button';

const FooterAuth = () => {

    return (
        <>
            <footer className='py_2 auth_footer'>
                <div className='container'>
                    <div className='d-flex justify-content-between align-items-center text-center'>
                        <Paragraph className='mb-0 authFooter_copyright'>© 2023, Made with passion by Macber EG</Paragraph>
                        <div>
                            <Button
                                tagType='link'
                                className='authFooter_link'>Privacy Policy</Button>
                            <Button
                                tagType='link'
                                className='authFooter_link'>Term&conditions</Button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default React.memo(FooterAuth) ;

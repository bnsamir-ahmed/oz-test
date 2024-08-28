import Paragraph from "../../UI/Paragraph";
import Button from "../../UI/Button";

const ProfileActions = ({details, canceled}) => {

    const handelInvoice = (eventData) => {
        const data = {
            invoice_info: eventData?.invoice_info,
            title: 'booking',
            venue: eventData?.venueData,
            price: eventData?.booking_price,
            servicesPrice: eventData?.service_price,
            totalPrice: eventData?.total_price,
            numberOfPeople: eventData?.guests || 1,
            checkIn: eventData?.check_in_formmated,
            checkOut: eventData?.check_out_formmated
        }
        localStorage.setItem('OZInvoice', JSON.stringify(data));
    }

    return (
        <>
            <div className="space-description mb-5">
                <Paragraph className="h2-description color-grey">
                    Action
                </Paragraph>
                <div className='my-5'>
                    <Button className='d-flex justify-content-between align-items-center p-0' tagType='link' to={'/profile/issueReport'}>
                    <div className='d-flex align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <ellipse cx="22.5632" cy="12.4812" rx="7.68038" ry="7.68038" stroke="black" stroke-width="2"/>
                        <path d="M28.3203 26.5499C26.5414 26.1449 24.597 25.9219 22.56 25.9219C14.0765 25.9219 7.19922 29.7903 7.19922 34.5623C7.19922 39.3343 7.19922 43.2027 22.56 43.2027C33.4804 43.2027 36.6372 41.2475 37.5497 38.4025" stroke="#BDBDBD" stroke-width="2"/>
                        <path d="M28.6479 37.1112C30.0378 38.5011 31.9579 39.3608 34.0788 39.3608C38.3206 39.3608 41.7592 35.9221 41.7592 31.6804C41.7592 29.5595 40.8995 27.6393 39.5096 26.2495M28.6479 37.1112C27.2581 35.7213 26.3984 33.8012 26.3984 31.6804C26.3984 27.4386 29.8371 24 34.0788 24C36.1997 24 38.1197 24.8596 39.5096 26.2495M28.6479 37.1112L39.5096 26.2495" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                        </svg>
                        <Paragraph className='ms-3 service_catering mb-0'>Issue reporting</Paragraph>
                    </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.374916 0.368713C0.595783 0.132613 0.895177 -3.91295e-08 1.20734 -5.27744e-08C1.51949 -6.64192e-08 1.81889 0.132613 2.03976 0.368713L8.32217 7.09278C8.54276 7.32918 8.66667 7.64962 8.66667 7.98372C8.66667 8.31782 8.54276 8.63827 8.32217 8.87466L2.03976 15.5987C1.93192 15.7226 1.80187 15.8219 1.65737 15.8909C1.51288 15.9598 1.3569 15.9968 1.19873 15.9998C1.04057 16.0028 0.883463 15.9717 0.736787 15.9082C0.590111 15.8448 0.456872 15.7505 0.345016 15.6307C0.233159 15.511 0.144977 15.3684 0.0857327 15.2114C0.0264879 15.0544 -0.00260735 14.8863 0.000183264 14.717C0.00297388 14.5477 0.0375931 14.3808 0.101975 14.2261C0.166357 14.0715 0.259184 13.9323 0.374917 13.8169L5.82491 7.98372L0.374916 2.15059C0.154324 1.9142 0.0304197 1.59376 0.0304197 1.25965C0.0304196 0.92555 0.154324 0.605106 0.374916 0.368713Z" fill="#BDBDBD"/>
                        </svg>
                    </Button>
                </div>
                {canceled === '0' && <div className='my-5'>
                    <Button className='d-flex justify-content-between align-items-center p-0' tagType='link' onClick={handelInvoice(details)} to={'/invoice'}>
                        <div className='d-flex align-items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M32.8202 39.2741C33.909 38.3063 35.5498 38.3063 36.6387 39.2741C37.3785 39.9317 38.5479 39.4065 38.5479 38.4167V9.58327C38.5479 8.59347 37.3785 8.06831 36.6387 8.72589C35.5498 9.69375 33.909 9.69375 32.8202 8.72589C31.7313 7.75804 30.0905 7.75804 29.0017 8.72589C27.9129 9.69375 26.272 9.69375 25.1832 8.72589C24.0944 7.75804 22.4536 7.75804 21.3647 8.72589C20.2759 9.69375 18.6351 9.69375 17.5462 8.72589C16.4574 7.75804 14.8166 7.75804 13.7277 8.72589C12.6389 9.69375 10.9981 9.69375 9.90925 8.72589C9.16946 8.06831 8 8.59347 8 9.58327V38.4167C8 39.4065 9.16946 39.9317 9.90925 39.2741C10.9981 38.3063 12.6389 38.3063 13.7277 39.2741C14.8166 40.242 16.4574 40.242 17.5462 39.2741C18.6351 38.3063 20.2759 38.3063 21.3647 39.2741C22.4536 40.242 24.0944 40.242 25.1832 39.2741C26.272 38.3063 27.9129 38.3063 29.0017 39.2741C30.0905 40.242 31.7313 40.242 32.8202 39.2741Z" stroke="black" stroke-width="2"/>
                            <path d="M15.6367 29.9414H30.9107" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                            <path d="M15.6367 24H30.9107" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                            <path d="M15.6367 18.0586H30.9107" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <Paragraph className='ms-3 service_catering mb-0'>view invoice</Paragraph>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.374916 0.368713C0.595783 0.132613 0.895177 -3.91295e-08 1.20734 -5.27744e-08C1.51949 -6.64192e-08 1.81889 0.132613 2.03976 0.368713L8.32217 7.09278C8.54276 7.32918 8.66667 7.64962 8.66667 7.98372C8.66667 8.31782 8.54276 8.63827 8.32217 8.87466L2.03976 15.5987C1.93192 15.7226 1.80187 15.8219 1.65737 15.8909C1.51288 15.9598 1.3569 15.9968 1.19873 15.9998C1.04057 16.0028 0.883463 15.9717 0.736787 15.9082C0.590111 15.8448 0.456872 15.7505 0.345016 15.6307C0.233159 15.511 0.144977 15.3684 0.0857327 15.2114C0.0264879 15.0544 -0.00260735 14.8863 0.000183264 14.717C0.00297388 14.5477 0.0375931 14.3808 0.101975 14.2261C0.166357 14.0715 0.259184 13.9323 0.374917 13.8169L5.82491 7.98372L0.374916 2.15059C0.154324 1.9142 0.0304197 1.59376 0.0304197 1.25965C0.0304196 0.92555 0.154324 0.605106 0.374916 0.368713Z" fill="#BDBDBD"/>
                        </svg>
                    </Button>
                </div>}
            </div>
           
        </>
    )
};
export default ProfileActions;
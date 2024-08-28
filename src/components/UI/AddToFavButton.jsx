import { useEffect, useState, useContext } from 'react';
import Button from './Button';
import LoginAlert from '../Auth/LoginAlertModal';
import { AuthContext } from '../../apis/context/AuthTokenContext';
import { likeVenues } from '../../apis/Booking';
import { likeEvent } from '../../apis/Events';
import { likeProduct } from '../../apis/Market';
import { likeGym } from '../../apis/ZeeStudio';
import { Modal } from 'antd';
import { likeClass } from '../../apis/OzKnowledge';

const AddToFavButton = ({ is_favorite, id, type, border, add_fav, reload }) => {

    const [like, setLike] = useState(is_favorite);
    const [show, setShow] = useState(false);
    const { token, userId } = useContext(AuthContext);

    const handelHide = () => setShow(false);

    const likeVenue = async (id) => {
        try {
            const controller = new AbortController();
            const signal = controller.signal;

            if (token) {
                let result;
                switch (type) {
                    case 'booking':
                        result = await likeVenues(token, userId, id, signal);
                        if (result) {
                            setLike(!like);
                            if (reload) {
                                reload(true, 'booking');
                            }
                        }
                        break;

                    case 'event':
                        result = await likeEvent(token, userId, id, signal);
                        if (result) {
                            setLike(!like);
                            if (reload) {
                                reload(true, 'event');
                            }
                        }
                        break;

                    case 'market':
                        result = await likeProduct(token, userId, id, signal);
                        if (result) {
                            setLike(!like);
                            if (reload) {
                                reload(true, 'market');
                            }
                        }
                        break;
                    case 'zee_studio':
                        result = await likeGym(token, userId, id, signal);
                        if (result) {
                            setLike(!like);
                            if (reload) {
                                reload(true, 'zee_studio');
                            }
                        }
                        break;
                    case 'zee_knowladge':
                        result = await likeClass(token, userId, id, signal);
                        if (result) {
                            setLike(!like);
                            if (reload) {
                                reload(true, 'zee_knowladge');
                            }
                        }
                        break;
                    default:
                        break;
                }
            } else {
                setShow(true);
            }
        } catch (error) {
            Modal.error({
                title: error.response.data.status || "Error",
                content: error.response.data.message || "An error occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            });
        }
    };

    useEffect(() => {
        setLike(is_favorite)
    }, [is_favorite, id, type, border, add_fav, reload]);

    return (
        <>
            <Button
                tagType='link'
                className={`p-0 ${add_fav ? 'add_fav' : ''}`}
                onClick={() => { likeVenue(id) }}>
                {border ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <g filter="url(#filter0_b_3789_18299)">
                            <rect x="0.5" y="0.5" width="47" height="47" stroke="black" />
                        </g>
                        <path d="M36.099 15.7153L36.0993 15.7159C37.4978 18.58 36.9847 21.8798 34.2459 25.6467L34.2446 25.6486C32.0756 28.6511 28.945 31.6687 24.3568 35.2318L24.3555 35.2328C24.3412 35.2439 24.3236 35.25 24.3054 35.25C24.2873 35.25 24.2696 35.2439 24.2553 35.2328L24.2542 35.2319C19.6602 31.6625 16.5351 28.6186 14.364 25.6454C11.6176 21.879 11.1049 18.5796 12.5033 15.7159L12.5035 15.7153C13.4542 13.7643 16.2788 12.0651 19.6788 13.0394C21.2994 13.5077 22.7133 14.5117 23.6897 15.8874L24.3013 16.7492L24.9129 15.8874C25.8894 14.5115 27.3036 13.5074 28.9245 13.0392L28.9264 13.0387C32.3135 12.0505 35.147 13.7615 36.099 15.7153Z" stroke={like ? 'red' : 'black'} stroke-width="1.5" />
                        <defs>
                            <filter id="filter0_b_3789_18299" x="-6" y="-6" width="60" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="3" />
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3789_18299" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3789_18299" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                )
                    :
                    (
                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M33.3901 11.2123L33.3904 11.2128C34.9886 14.4857 34.3927 18.2453 31.2918 22.5101L31.2905 22.512C28.8369 25.9084 25.2986 29.3178 20.1211 33.3385L20.1199 33.3395C20.0869 33.3652 20.0463 33.3791 20.0045 33.3791C19.9627 33.3791 19.922 33.3652 19.8891 33.3395L19.888 33.3386C14.7036 29.3105 11.1719 25.8716 8.71624 22.5088C5.60676 18.2445 5.01118 14.4853 6.60917 11.2128L6.60944 11.2123C7.70239 8.96926 10.9357 7.03332 14.8135 8.1446C16.6619 8.67868 18.2746 9.82376 19.3882 11.3928L19.9998 12.2546L20.6114 11.3928C21.7251 9.82356 23.3381 8.67839 25.1868 8.14439L25.1887 8.14383C29.0525 7.01654 32.2958 8.96645 33.3901 11.2123Z" fill={like ? '#CB0A05' : '#585858'} fill-opacity="0.7" stroke={like ? '#A50805' : '#BDBDBD'} stroke-width="1.5" />
                        </svg>
                    )}
            </Button>
            <LoginAlert
                show={show}
                onHide={handelHide}
            />
        </>
    )
}
export default AddToFavButton;
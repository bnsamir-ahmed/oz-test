import { useState, useRef } from 'react';
import { 
    FacebookShareButton,
    FacebookMessengerShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    LinkedinShareButton } from 'react-share'; 
import {
    FacebookIcon,
    FacebookMessengerIcon,
    XIcon,
    LinkedinIcon,
    TelegramIcon,
    WhatsappIcon,
  } from "react-share";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from './Button';

const ShareButton = ({border, button, shareUrl, fav_dark, title, description}) => {

    const [message, setmessage] = useState('copy link!');

    const handleCopyLink = () => {
        setmessage('copied');
    };

    return (
        <div class={`dropdown position-relative dropstart`}>
           {!button && <a  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                {border ? (
                    <>
                    {fav_dark ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <g filter="url(#filter0_b_3980_11088)">
                          <rect x="0.5" y="0.5" width="47" height="47" stroke="white"/>
                        </g>
                        <path d="M27.7697 30.4059L20.6738 25.7227" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M27.8907 17.1309L20.7949 21.8141" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M20.6682 23.3419C20.6682 25.1833 19.1755 26.676 17.3341 26.676C15.4927 26.676 14 25.1833 14 23.3419C14 21.5005 15.4927 20.0078 17.3341 20.0078C19.1755 20.0078 20.6682 21.5005 20.6682 23.3419Z" stroke="white" stroke-width="1.5"/>
                        <path d="M34.0061 32.6661C34.0061 34.5075 32.5134 36.0002 30.672 36.0002C28.8306 36.0002 27.3379 34.5075 27.3379 32.6661C27.3379 30.8248 28.8306 29.332 30.672 29.332C32.5134 29.332 34.0061 30.8248 34.0061 32.6661Z" stroke="white" stroke-width="1.5"/>
                        <path d="M34.0061 15.3341C34.0061 17.1755 32.5134 18.6682 30.672 18.6682C28.8306 18.6682 27.3379 17.1755 27.3379 15.3341C27.3379 13.4927 28.8306 12 30.672 12C32.5134 12 34.0061 13.4927 34.0061 15.3341Z" stroke="white" stroke-width="1.5"/>
                        <defs>
                          <filter id="filter0_b_3980_11088" x="-6" y="-6" width="60" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="3"/>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3980_11088"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3980_11088" result="shape"/>
                          </filter>
                        </defs>
                      </svg>
                    ) :
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <g filter="url(#filter0_b_3738_15824)">
                            <rect x="0.5" y="0.5" width="47" height="47" stroke="black"/>
                        </g>        
                        <path d="M27.7697 30.4059L20.6738 25.7227" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M27.8907 17.1309L20.7949 21.8141" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M20.6682 23.3419C20.6682 25.1833 19.1755 26.676 17.3341 26.676C15.4927 26.676 14 25.1833 14 23.3419C14 21.5005 15.4927 20.0078 17.3341 20.0078C19.1755 20.0078 20.6682 21.5005 20.6682 23.3419Z" stroke="black" stroke-width="1.5"/>
                        <path d="M34.0061 32.6661C34.0061 34.5075 32.5134 36.0002 30.672 36.0002C28.8306 36.0002 27.3379 34.5075 27.3379 32.6661C27.3379 30.8248 28.8306 29.332 30.672 29.332C32.5134 29.332 34.0061 30.8248 34.0061 32.6661Z" stroke="black" stroke-width="1.5"/>
                        <path d="M34.0061 15.3341C34.0061 17.1755 32.5134 18.6682 30.672 18.6682C28.8306 18.6682 27.3379 17.1755 27.3379 15.3341C27.3379 13.4927 28.8306 12 30.672 12C32.5134 12 34.0061 13.4927 34.0061 15.3341Z" stroke="black" stroke-width="1.5"/>
                        <defs>
                            <filter id="filter0_b_3738_15824" x="-6" y="-6" width="60" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="3"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3738_15824"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3738_15824" result="shape"/>
                            </filter>
                        </defs>
                       </svg>  
                    )}
                    </>
                  
                )
                :
                (
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M27.4685 29.3354L21.5566 25.4336" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M27.5778 18.2656L21.666 22.1674" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M21.5556 23.4457C21.5556 24.9799 20.3119 26.2235 18.7778 26.2235C17.2437 26.2235 16 24.9799 16 23.4457C16 21.9116 17.2437 20.668 18.7778 20.668C20.3119 20.668 21.5556 21.9116 21.5556 23.4457Z" stroke="black" stroke-width="1.5"/>
                        <path d="M32.6669 31.2231C32.6669 32.7572 31.4232 34.0009 29.8891 34.0009C28.355 34.0009 27.1113 32.7572 27.1113 31.2231C27.1113 29.689 28.355 28.4453 29.8891 28.4453C31.4232 28.4453 32.6669 29.689 32.6669 31.2231Z" stroke="black" stroke-width="1.5"/>
                        <path d="M32.6669 16.7778C32.6669 18.3119 31.4232 19.5556 29.8891 19.5556C28.355 19.5556 27.1113 18.3119 27.1113 16.7778C27.1113 15.2437 28.355 14 29.8891 14C31.4232 14 32.6669 15.2437 32.6669 16.7778Z" stroke="black" stroke-width="1.5"/>
                    </svg>
                )
                }
            </a>}
            {button && <a role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" className="btn button-outLine btn-bg-white ">Share</a> }
            <ul className="dropdown-menu share_menu" aria-labelledby="dropdownMenuLink">
                <div className='row g-3 d-flex align-items-center justify-content-evenly position-relative'>
                        <FacebookShareButton
                            url={shareUrl || 'https://ozcoworkingpark.com/'}
                            className="Demo__some-network__share-button"
                            title={title}
                            description={description}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>

                        <FacebookMessengerShareButton
                            url={shareUrl || 'https://ozcoworkingpark.com/'}
                            appId="521270401588372"
                            className="Demo__some-network__share-button"
                            title={title}
                            description={description}>
                            <FacebookMessengerIcon size={32} round />
                        </FacebookMessengerShareButton>
                    
                        <TwitterShareButton
                            url={shareUrl || 'https://ozcoworkingpark.com/'}
                            className="Demo__some-network__share-button"
                            title={title}
                            description={description}>
                            <XIcon size={32} round />
                        </TwitterShareButton>

                        <TelegramShareButton
                            url={shareUrl || 'https://ozcoworkingpark.com/'}
                            className="Demo__some-network__share-button"
                            title={title}
                            description={description}>
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>

                        <WhatsappShareButton
                            url={shareUrl || 'https://ozcoworkingpark.com/'}
                            separator=":: "
                            className="Demo__some-network__share-button"
                            title={title}
                            description={description}>
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>

                        <LinkedinShareButton
                            url={shareUrl || 'https://ozcoworkingpark.com/'}
                            className="Demo__some-network__share-button"
                            title={title}
                            summary={description}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>

                        <div className='copy_link'>
                            <CopyToClipboard 
                                text={shareUrl}
                                onCopy={handleCopyLink}>
                                    <Button tagType='link'
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title={'copy '}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-files" viewBox="0 0 16 16">
                                            <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>
                                        </svg>
                                    </Button>
                            </CopyToClipboard>
                        </div>

                </div>
            </ul>
        </div>
    )
}
export default ShareButton;
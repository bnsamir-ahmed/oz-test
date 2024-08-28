import { useEffect, useState, useContext } from "react";
import EmojiPicker from 'emoji-picker-react';
import { useParams } from "react-router-dom";
import Paragraph from "../UI/Paragraph";
import Button from "../UI/Button";
import Img6 from "../../assets/images/icons/user-smile-line.svg";
import Img9 from "../../assets/images/icons/icon-park-outline_more.svg";
import Img8 from "../../assets/images/icons/fa_send-o.svg";
import MyMassage from "../UI/MyMessage";
import YourMassage from "../UI/YourMessage";
import { getClientMessages, sendMessage, reportUser, blockUser } from '../../apis/Market';
import { AuthContext } from "../../apis/context/AuthTokenContext";
import './TalentMarket.css';
import { Modal } from "antd";

const DMChat = () => {

    const [OpenChat , SetOpenChat] = useState(false)
    const [OpenBlock, SetOpenBlock] = useState(false);
    const [messages, setMessages] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [inputStr, setInputStr] = useState('');
    const [reload, setReload] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [msgSend, setMsgSend] = useState(false);
    const [action, setAction] = useState('block');
    const [recipentData, setrecipentData] = useState({});
    const { project, user } = useParams();
    const { token, userId } = useContext(AuthContext);

    const HandleBlock = async (e) => {
        e.stopPropagation();
        try {
            const result = await blockUser(token, action, user);
            Modal.success({
                title: result.message,
                content: result.message,
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
            setReload(!reload);
        }catch(error){
            Modal.error({
                title: error.response.data.status || "Error",
                content: error.response.data.message || "An Unknown Error Occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
        }
    };

    const HandelSendIssue = async (e) => {
        e.stopPropagation();
        try {
            const result = await reportUser(token, user);
            Modal.success({
                title: result.message,
                content: result.message,
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
        }catch(error){
            Modal.error({
                title: error.response.data.status || "Error",
                content: error.response.data.message || "An Unknown Error Occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
        }

    };

    const HandleCaht = ()=>{
        SetOpenChat(!OpenChat)
    };

    const onEmojiClick = (emojiObject) => {
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(!showPicker)
    };

    useEffect(()=>{
        const getClientChat = async () => {
            try{
              const result = await getClientMessages(token, project, user);
              setMessages(result.messages.reverse());
              setIsBlocked(result.is_blocked);
              setAction(result.is_blocked ? 'un-block' : 'block')
            }catch(err){
              console.log(err);
            }
        }
        getClientChat();
        // const interval = setInterval(getClientChat, 10000);
        
        // return () => clearInterval(interval);
    },[project, user, msgSend, reload]);

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('recipentOZData'))
        setrecipentData(data);
    },[]);

    const generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        
        const randomString = Array.from({ length: 10 }, () =>
          characters.charAt(Math.floor(Math.random() * characters.length))
        ).join('');
      
        return randomString;
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const messageHash = generateRandomString();
        try{
            const result = await sendMessage(token, project, user, inputStr, messageHash);
            setInputStr('');
            if(result){
                setMsgSend(!msgSend);
            }

        }catch (error){}
    };
    
    return (
        <>
            <div className="container-fluid p-5 position-relative">
                <div className={'col-xl-8 col-md-8 col-sm-12 p-2 chat_mobile mx-auto'}>
                    <div className="card-chat" style={{
                        boxShadow: 'none'
                    }}>
                        <div className="d-flex flex-column justify-content-between">
                            <div className="border-bottom d-flex justify-content-between align-items-center me-2">
                                <div className="d-flex align-items-center px-3">
                                    <img src={recipentData.avatar} alt={recipentData.name} width={'40px'} height={'40px'}/>
                                        <Paragraph className="p-4 directory mb-0">
                                            {recipentData.name}
                                        </Paragraph>
                                </div>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" 
                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            padding: '0'
                                        }}>
                                        <img
                                            className="pointer"
                                            src={Img9}
                                            alt="img"
                                        />
                                    </button>
                                    <ul className="dropdown-menu list_block" aria-labelledby="dropdownMenuButton1">
                                        <li className="d-flex align-items-center border-bottom pointer p-3">
                                            <Button className='d-flex align-items-center p-0' tagType='link' 
                                                onClick={HandelSendIssue}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                    >
                                                    <ellipse
                                                        cx="14.817"
                                                        cy="8.74087"
                                                        rx="4.74087"
                                                        ry="4.74087"
                                                        stroke="black"
                                                    />
                                                    <path
                                                        d="M18.3714 17.4268C17.2734 17.1767 16.0731 17.0391 14.8157 17.0391C9.5791 17.0391 5.33398 19.4269 5.33398 22.3725C5.33398 25.3181 5.33398 27.706 14.8157 27.706C21.5566 27.706 23.5052 26.4991 24.0684 24.743"
                                                        stroke="#BDBDBD"
                                                    />
                                                    <path
                                                        d="M18.5741 23.9447C19.432 24.8026 20.6172 25.3333 21.9264 25.3333C24.5447 25.3333 26.6673 23.2107 26.6673 20.5924C26.6673 19.2833 26.1366 18.098 25.2787 17.2401M18.5741 23.9447C17.7162 23.0868 17.1855 21.9016 17.1855 20.5924C17.1855 17.9741 19.3081 15.8516 21.9264 15.8516C23.2356 15.8516 24.4208 16.3822 25.2787 17.2401M18.5741 23.9447L25.2787 17.2401"
                                                        stroke="black"
                                                        stroke-linejoin="round"
                                                    />
                                                    </svg>
                                                    <Paragraph className='mb-0 ps-1'>Issue reporting</Paragraph>
                                            </Button>
                                        </li>
                                        <li className="pointer p-3">
                                            <Button className='d-flex align-items-center p-0' tagType='link' 
                                                onClick={HandleBlock}>
                                                        <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        >
                                                        <path
                                                            d="M8.45808 23.545C10.3884 25.4753 13.0551 26.6693 16.0007 26.6693C21.8917 26.6693 26.6673 21.8936 26.6673 16.0026C26.6673 13.057 25.4734 10.3903 23.543 8.46003M8.45808 23.545C6.52785 21.6147 5.33398 18.9481 5.33398 16.0026C5.33398 10.1116 10.1096 5.33594 16.0007 5.33594C18.9461 5.33594 21.6127 6.5298 23.543 8.46003M8.45808 23.545L16.0006 16.0025L23.543 8.46003"
                                                            stroke="#BDBDBD"
                                                            stroke-width="1.5"
                                                            stroke-linejoin="round"
                                                        />
                                                        <circle
                                                            cx="16.0007"
                                                            cy="16.0026"
                                                            r="10.6667"
                                                            stroke="black"
                                                            stroke-width="1.5"
                                                        />
                                                        </svg>
                                                    <Paragraph className='mb-0 ps-1'>{action}</Paragraph>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                                <span className="x_mobile" onClick={HandleCaht}>
                                    x
                                </span>
                            </div>
                            <div className="chat_container">
                                {messages && messages.map((message,index)=>{ 
                                    return(
                                        <>
                                            {message.position === 'left' ?  
                                                (
                                                    <MyMassage src={message.user_data?.avatar} message={message.text} key={index}/>
                                                )
                                                :
                                                (
                                                    <YourMassage src={message.user_data?.avatar} message={message.text} key={index}/>
                                                )
                                            }
                                        </>
                                    )
                                })}
                                {(messages && messages.length === 0) && <Paragraph className='grey-span2 text-center my-5'>start new conversation</Paragraph>}
                            </div>
                                <div>
                                    <form  className="d-flex justify-content-around" onSubmit={handleSendMessage}>
                                        <div className="input-group flex-nowrap">
                                            <input
                                                className="p-3 input_border_chat m-3 form-control"
                                                placeholder="Type a massage"
                                                type="text"
                                                value={inputStr}
                                                onChange={e=>{setInputStr(e.target.value)}}
                                                disabled={isBlocked}
                                                aria-label="Username" 
                                                aria-describedby="addon-wrapping"
                                                required
                                            />
                                            <span className="input-group-text" id="addon-wrapping">
                                                <img className="me-2" src={Img6} alt="img" onClick={()=>{setShowPicker(!showPicker)}}/>
                                                {showPicker && <EmojiPicker 
                                                    onEmojiClick={onEmojiClick}/>}
                                            </span>
                                        </div>
                                            <Button tagType='button' type='submit' className='p-0 btn'>
                                                <img className="me-2" src={Img8} alt="img" />
                                            </Button>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default DMChat;
import { useEffect, useState, useContext } from "react";
import { Tab, Nav } from 'react-bootstrap';
import EmojiPicker from 'emoji-picker-react';
import Paragraph from "../UI/Paragraph";
import Img6 from "../../assets/images/icons/user-smile-line.svg";
import Img8 from "../../assets/images/icons/fa_send-o.svg";
import Img9 from "../../assets/images/icons/icon-park-outline_more.svg";
import UsersList from "../UI/UsersList";
import MyMassage from "../UI/MyMessage";
import YourMassage from "../UI/YourMessage";
import { getClientMessages, getChatList, sendMessage, reportUser, blockUser } from '../../apis/Market';
import { AuthContext } from "../../apis/context/AuthTokenContext";
import './TalentMarket.css';
import Button from "../UI/Button";
import { useParams } from "react-router-dom";
import { Modal } from "antd";

const DMChatProvider = () => {

  const [OpenChat, SetOpenChat] = useState(false)
  const [OpenBlock, SetOpenBlock] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [inputStr, setInputStr] = useState('');
  const [showBlock, setShowBlock] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [action, setAction] = useState('block');
  const [chatList, setChatList] = useState([]);
  const [activeTab, setActiveTab] = useState('0');
  const [senderName, setSenderName] = useState(null);
  const [senderAvatar, setSenderAvatar] = useState(null);
  const [recipent, setrecipent] = useState(null);
  const [msgSend, setMsgSend] = useState(false);
  const [reload, setReload] = useState(false);

  const { token, userId } = useContext(AuthContext);
  const { project } = useParams();

  const handelClose = () => setShowBlock(false);

  const HandleCaht = () => {
    SetOpenChat(!OpenChat)
  };

  const HandleBlock = async (e) => {
    e.stopPropagation();
    try {
      const result = await blockUser(token, action, recipent);
      Modal.success({
        title: result.message,
        content: result.message,
        footer: false,
        centered: true,
        closable: true,
        maskClosable: true,
    });
      setReload(!reload);
    } catch (error) {
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
      const result = await reportUser(token, recipent);
      Modal.success({
        title: result.message,
        content: result.message,
        footer: false,
        centered: true,
        closable: true,
        maskClosable: true,
    });
    } catch (error) {
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

  const handleTabClick = (key, recipentId, recipentName, recipentAvatar) => {
    setActiveTab(key);
    setrecipent(recipentId);
    setSenderName(recipentName);
    setSenderAvatar(recipentAvatar);
  };

  const onEmojiClick = (emojiObject) => {
    setInputStr(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(!showPicker)
  };

  useEffect(() => {
    const getClientChat = async () => {
      try {
        const result = await getClientMessages(token, project, recipent);
        setMessages(result.messages.reverse());
        setIsBlocked(result.is_blocked);
        setAction(result.is_blocked ? 'un-block' : 'block')
      } catch (err) {
        console.log(err);
      }
    }
    getClientChat();

    const interval = setInterval(getClientChat, 10000);

    return () => clearInterval(interval);

  }, [token, project, recipent, reload])

  useEffect(() => {
    const getClientList = async () => {
      try {
        const result = await getChatList(token, project);
        setChatList(result);
        setActiveTab(0);
        const recipentIdFirst = (userId === result[0]?.last_message?.from_id) ? result[0]?.last_message?.to_id : result[0]?.last_message?.from_id;
        handleTabClick(0, recipentIdFirst, result[0].username, result[0].avatar);

      } catch (err) {
        console.log(err);
      }
    }
    getClientList();
  }, [token, msgSend]);

  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const randomString = Array.from({ length: 10 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');

    return randomString;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageHash = generateRandomString();
    try {
      const result = await sendMessage(token, project, recipent, inputStr, messageHash);
      setInputStr('');
      if (result) {
        setMsgSend(!msgSend);
      }

    } catch (error) { }
  };

  return (
    <>
      <div className="navigator border_bottom">
        <div className="container-fluid">
          <div className="d-flex">
            <h1 className="title-name mb-0">DM - (Chat)</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="127"
              viewBox="0 0 2 127"
              fill="none"
            >
              <path
                d="M1 0L1.00001 127"
                stroke="#BDBDBD"
                stroke-width="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey={activeTab}
        className='py-4 px-5'>
        <div className="container-fluid p-5 position-relative">
          <div className="card-chat">
            <div className="row">
              <div className="col-xl-4 col-md-4 col-sm-12 p-2 ">
                <div className="border-bottom ms-2 ">
                  <Paragraph className="p-4 directory mb-0">Directory</Paragraph>
                </div>
                <div className="p-4">
                  <div className="requests d-flex">
                    <Paragraph className="m-0">Requests</Paragraph>
                    {/* <span className="req_number ms-2">3</span> */}
                  </div>
                  <Nav variant="pills" className="list_container flex-column mx-auto my-3">
                    {(chatList && chatList?.length !== 0) && chatList?.map((item, index) => {
                      return (
                        <Nav.Item key={index}>
                          <Nav.Link
                            eventKey={index}
                            onClick={() => {
                              handleTabClick(
                                index,
                                userId === item?.last_message?.from_id ? item?.last_message?.to_id : item?.last_message?.from_id,
                                item?.username,
                                item?.avatar
                              )
                            }}>
                            <UsersList
                              onClick={HandleCaht}
                              src={item?.avatar}
                              name={item?.username}
                              massage={item?.last_message?.text}
                            />
                          </Nav.Link>
                        </Nav.Item>
                      )
                    })
                    }
                  </Nav>
                </div>
              </div>
              <div
                className={
                  OpenChat
                    ? "col-xl-8 col-md-8 col-sm-12 p-2 border-left chat_mobile seen"
                    : "col-xl-8 col-md-8 col-sm-12 p-2 border-left chat_mobile "
                }>
                <Tab.Content animation className=''>
                  <Tab.Pane eventKey={activeTab} className="d-flex flex-column justify-content-between">
                    <div className="border-bottom d-flex justify-content-between align-items-center me-2">
                      <div className="d-flex align-items-center">
                        <img src={senderAvatar} alt={senderName} width={'40px'} height={'40px'} />
                        <Paragraph className="p-4 directory mb-0">
                          {senderName}
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
                      {messages && messages?.map((message, index) => {
                        return (
                          <>
                            {message?.position === 'left' ?
                              (
                                <MyMassage src={message.user_data?.avatar} message={message.text} key={index} />
                              )
                              :
                              (
                                <YourMassage src={message.user_data?.avatar} message={message.text} key={index} />
                              )
                            }
                          </>
                        )

                      })}
                      {(messages && messages?.length === 0) && <Paragraph className='grey-span2 text-center my-5'>start new conversation</Paragraph>}
                    </div>
                    <div>
                      <form className="d-flex justify-content-around" onSubmit={handleSendMessage}>
                        <div className="input-group flex-nowrap">
                          <input
                            className="p-3 input_border_chat m-3 form-control"
                            placeholder="Type a massage"
                            type="text"
                            value={inputStr}
                            onChange={e => { setInputStr(e.target.value) }}
                            disabled={isBlocked}
                            aria-label="Username"
                            aria-describedby="addon-wrapping"
                            required
                          />
                          <span className="input-group-text" id="addon-wrapping">
                            <img className="me-2" src={Img6} alt="img" onClick={() => { setShowPicker(!showPicker) }} />
                            {showPicker && <EmojiPicker
                              onEmojiClick={onEmojiClick} />}
                          </span>
                        </div>

                        <Button tagType='button' type='submit' className='p-0 btn'>
                          <img className="me-2" src={Img8} alt="img" />
                        </Button>
                      </form>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </div>
          </div>
        </div>
      </Tab.Container>
    </>
  );
};
export default DMChatProvider;
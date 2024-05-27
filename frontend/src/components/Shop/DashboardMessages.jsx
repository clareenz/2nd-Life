import { Input, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import Paragraph from "antd/es/typography/Paragraph";
import { BsThreeDots } from "react-icons/bs";
const ENDPOINT = "https://twondlife-socket-server.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const { seller, loading } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  
  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-seller/${seller?._id}`,
          {
            withCredentials: true,
          }
        );
        setConversations(response.data.conversations);
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [seller, messages]);

  useEffect(() => {
    if (seller) {
      const userId = seller?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };
  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);
  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== seller._id
    );
    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImages(file);
    imageSendingHandler(file);
  };

  const imageSendingHandler = async (e) => {
    const formData = new FormData();

    formData.append("images", e);
    formData.append("sender", seller._id);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat._id);

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(`${server}/message/create-new-message`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: seller._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    //inbox na walang open na chat
    <div className="w-full 300px:w-[90%] bg-white m-5 shadow rounded-2xl h-[85vh]">
      {!open && (
        <div>
          {" "}
          <div className="flex flex-row items-center justify-between border-b">
            <h1 className="w-1/2 px-10 py-6 text-3xl font-Poppins">
              All Messages
            </h1>

            <div className="flex justify-center w-1/2">
              <div className="w-full px-6">
                <Input
                  placeholder="Search..."
                  className="h-[30px] w-full border-gray-300 border-[1px] rounded-3xl text-sm custom-input"
                />
              </div>
            </div>
          </div>
          <div
            className="h-[73vh]"
            style={{ scrollbarWidth: "xs", overflowY: "auto" }}
          >
            {/* All messages list */}
            <div>
              {conversations &&
                conversations.map((item, index) => (
                  <MessageList
                    data={item}
                    key={index}
                    index={index}
                    setOpen={setOpen}
                    setCurrentChat={setCurrentChat}
                    me={seller._id}
                    setUserData={setUserData}
                    userData={userData}
                    online={onlineCheck(item)}
                    setActiveStatus={setActiveStatus}
                    loading={loading}
                    setActiveKey={setActiveKey}
                    activeKey={activeKey}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
      {open && ( //message sidebar
        <div className="flex flex-row">
          <div className="hidden lg:flex flex-col w-[50%] pt-4 h-[85vh]">
            <div className="flex flex-col rounded-2xl">
              {" "}
              <div>
                <h1 className="text-center text-[30px] pt-4 font-Poppins">
                  All Messages
                </h1>
              </div>
              <div className="p-2 text-black rounded-2xl">
                <Input
                  placeholder="Search..."
                  className="h-[30px] rounded-2xl text-sm custom-input"
                />
              </div>
            </div>
            <div className="bg-white h-[85vh] overflow-y-scroll ">
              {/* All messages list */}
              {conversations &&
                conversations.map((item, index) => (
                  <MessageList
                    data={item}
                    key={index}
                    index={index}
                    setOpen={setOpen}
                    setCurrentChat={setCurrentChat}
                    me={seller._id}
                    setUserData={setUserData}
                    userData={userData}
                    online={onlineCheck(item)}
                    setActiveStatus={setActiveStatus}
                    loading={loading}
                    setActiveKey={setActiveKey}
                    activeKey={activeKey}
                  />
                ))}
            </div>
          </div>
          <div className="w-[100%]">
            <SellerInbox
              setOpen={setOpen}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessageHandler={sendMessageHandler}
              messages={messages}
              sellerId={seller._id}
              userData={userData}
              activeStatus={activeStatus}
              scrollRef={scrollRef}
              setMessages={setMessages}
              handleImageUpload={handleImageUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};
const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  loading,
  userData,
  handleDelete,
  setActiveKey,
  activeKey,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();


  const handleDotsClick = (event) => {
    event.stopPropagation();
    setShowModal(!showModal);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setShowConfirm(true);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    console.log(data._id)
    axios
      .delete(`${server}/conversation/delete-conversation/${data._id}`)
      .then((res) => {
        message.success(res.data.message);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.res.data.message);
      });
    setShowConfirm(false);
  };

  
  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };

  useEffect(() => {
    const userId = data.members.find((user) => user != me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  return (
    <div
    className={`relative flex p-6 cursor-pointer rounded-2xl ${
      activeKey === index ? "bg-[#FFEAE8] before:inset-0 " : "bg-white"
    } hover:bg-[#F0F0F0]  before:absolute before:border-4 before:border-white before:rounded-2xl before:hover:inset-0 items-center justify-between`}
      onClick={(e) =>
        setActiveKey(index)||
        setCurrentChat(data) ||
        setUserData(user) || //name ng user
        setActiveStatus(online) ||
        setOpen(true)||
        handleClick(data._id)
      }
    >
      <div className="flex">
        <div className="relative ">
          <img
            src={`${backend_url}${user?.avatar}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          {online ? (
            <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
          ) : (
            <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
          )}
        </div>

        <div clasdive="pl-3">
          <h1 className="text-[18px] px-2">{user?.name}</h1>
          <p className="text-[16px] px-2 text-[#000c] ">
            {!loading && data?.lastMessageId !== userData?._id
              ? "You:"
              : userData?.name.split(" ")[0] + ": "}
            {data?.lastMessage &&
              data?.lastMessage.split(/\s+/).slice(0, 4).join(" ")}
          </p>
        </div>
      </div>
      <div className="relative flex-shrink-0">
        <BsThreeDots onClick={handleDotsClick} className="cursor-pointer" />
        {showModal && (
          <div className="absolute right-0 z-10 w-48 mt-2 bg-white border rounded-lg shadow-lg">
            <button
              onClick={handleDeleteClick}
              className="w-full px-4 py-2 text-center text-black hover:bg-slate-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {showConfirm && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="mb-4">
              Are you sure you want to delete this message?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 mr-2 border rounded-full custom-cancel-button-class "
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-[#006665] rounded-full text-white hover:bg-[#077773]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SellerInbox = ({
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  handleImageUpload,
}) => {
  return (
    <div className="justify-center">
      <div className="bg-white rounded-2xl ">
        <div className=" bg-white w-[100%] h-[85vh] flex flex-col p-2 z-30 rounded-2xl">
          {/* message header */}
          <div className="flex items-center justify-between p-2 bg-white border-b ">
            <div className="flex">
              <img
                src={`${backend_url}${userData?.avatar}`}
                alt=""
                className="w-[55px] h-[55px] rounded-full"
              />
              <div className="pl-3">
                <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
                <h1>{activeStatus ? "Active Now" : "Offline"}</h1>
              </div>
            </div>
            <AiOutlineArrowRight
              size={20}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          {/* messages */}
          <div className="px-3 h-[85vh] py-3 overflow-y-scroll">
            {messages &&
              messages.map((item, index) => {
                return (
                  <div
                    className={`flex w-full my-2  ${
                      item.sender === sellerId ? "justify-end" : "justify-start"
                    }`}
                    ref={scrollRef}
                  >
                    {item.sender !== sellerId && (
                      <img
                        src={`${backend_url}${userData?.avatar}`}
                        className="w-[40px] h-[40px] rounded-full mr-3"
                        alt=""
                      />
                    )}
                    {item.images && (
                      <div>
                        {" "}
                        <img
                          src={`${backend_url}${item.images}`}
                          className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                        />
                        <p className="text-[12px] text-[#000000d3] pt-1">
                          {format(item.createdAt)}
                        </p>
                      </div>
                    )}
                    {item.text !== "" && (
                      <div>
                        <div
                          className={`p-2 rounded-xl ${
                            item.sender === sellerId
                              ? "bg-[#006665]"
                              : "bg-[#DFDFDF]"
                          } h-min w-auto items-center`}
                        >
                          <Paragraph
                            className={`${
                              item.sender === sellerId
                                ? "text-white"
                                : "text-black"
                            }`}
                          >
                            {item.text}
                          </Paragraph>
                        </div>

                        <p className="text-[12px] text-[#000000d3] pt-1">
                          {format(item.createdAt)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* send message input */}
          <form
            aria-required={true}
            className="relative flex items-center justify-between w-full chat-form"
            onSubmit={sendMessageHandler}
          >
            <div className="file-upload-container w-[30px] relative">
              <input
                type="file"
                name="image"
                id="image"
                className="hidden"
                onChange={handleImageUpload}
                aria-label="Upload Image"
              />
              <label htmlFor="image">
                <TfiGallery className="cursor-pointer" size={20} />
              </label>
            </div>
            <div className="relative flex items-center w-full px-1 input-container">
              <input
                type="text"
                required
                placeholder="Enter your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className={`chat-input px-3 ${styles.input}`}
                aria-label="Message input"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="absolute transform -translate-y-1/2 send-button right-4 top-1/2"
              >
                <AiOutlineSend size={20} className="cursor-pointer" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default DashboardMessages;

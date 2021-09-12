import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "./messenger.module.css";

import TopBar from "../../components/topBar/tobbar";
 
import Message from "../../components/Conversation/messege";
import ActiveUser from "../../components/rightbar/activUser";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Conv from "./conv";
import { io } from "socket.io-client";

export default function Messenger() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [currentChat, setcurrentChat] = useState(null);
  const [Messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [Arrivalmessage, setArrivalmessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef(io("ws://localhost:8900"));

  

  useEffect(() => {
   
    socket.current.on(
      "getMessage",
      (data) => {
        setArrivalmessage({
          senderId: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      },

    ); 
  },[]);

  useEffect(() => {
    Arrivalmessage &&
      currentChat?.members.includes(Arrivalmessage.senderId) &&
      setMessages((preval) => [...preval, Arrivalmessage]);
  }, [Arrivalmessage, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) =>  {
      setOnlineUsers( user.following.filter((f) => users.some((u) => u.userId === f)))
      
    });
  }, [user]);

  useEffect(() => {
    const findconv = async () => {
      try {
        const res = await axios.get("/conversation/" + user?._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    findconv();
  }, [user]);

  useEffect(() => {
    const getmessage = async () => {
      try {
        const res = await axios.get("message/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getmessage();
  }, [currentChat]);

  const handleSubmit = async (m) => {
    m.preventDefault();
    const Nmessage = {
      conversationId: currentChat._id,
      senderId: user._id,
      text: newMessage,
    };

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: currentChat.members.find((m) => m !== user._id),
      text: newMessage,
    });
    try {
      const res = await axios.post("/message", Nmessage);

      setMessages([...Messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);

  // const [conversations, setConversations] = useState([]);
  // const [currentChat, setcurrentChat] = useState(null);
  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState("");
  // const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  // const socket = useRef();
  // const { user } = useContext(AuthContext);
  // const scrollRef = useRef();
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // useEffect(() => {
  //   socket.current = io("ws://localhost:8900");
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       senderId: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit("addUser", user._id);
  //   socket.current.on("getUsers", (users) => {
  //     console.log(users) ;
  //     setOnlineUsers(
  //       user.following.filter((f) => users.some((u) => u.userId === f))
  //     );
  //   });
  // }, [user]);

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await axios.get("/conversation/" + user._id);
  //       setConversations(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getConversations();
  // }, [user._id]);

  // useEffect(() => {
  //   const getMessages = async () => {
  //     try {
  //       const res = await axios.get("/message/" + currentChat?._id);
  //       setMessages(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getMessages();
  // }, [currentChat]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const message = {
  //     senderId: user._id,
  //     text: newMessage,
  //     conversationId: currentChat._id,
  //   };

  //   const receiverId = currentChat.members.find(
  //     (member) => member !== user._id
  //   );

  //   socket.current.emit("sendMessage", {
  //     senderId: user._id,
  //     receiverId,
  //     text: newMessage,
  //   });

  //   try {
  //     const res = await axios.post("/message", message);
  //     setMessages([...messages, res.data]);
  //     setNewMessage("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);
  // console.log(messages) ; 
 
  return (
    <>
      <TopBar></TopBar>
      <div className={Style.messenger}>
        <div className={Style.chatList}>
          <div className={Style.chatlistwrapper}>
            <input placeholder="Search for friends" className={Style.searchf} />

            {conversations.map((c) => {
              return (
                <div onClick={() => setcurrentChat(c)}>
                  <Conv
                    currentuser={user}
                    isformessenger={true}
                    conversation={c}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={Style.chatBox}>
          <div className={Style.chatboxwrapper}>
            <div className={Style.chatboxtop}>
              {currentChat ? (
                <>
                  {Messages.map((m) => {
                    return (
                      <div ref={scrollRef}>
                        <Message messages={m} own={m.senderId===user?._id} />
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <h1 className={Style.greeting}>
                    Open A Conversation to Start Chatting
                  </h1>
                </>
              )}
            </div>
            <div className={Style.chatboxbottom}>
              <textarea
                className={Style.messagetext}
                placeholder="Write message"
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
                value={newMessage}
              ></textarea>

              {/* <button className={Style.sendbtn}>Send</button> */}
              {/* amazing button  */}

              <button onClick={handleSubmit} className={Style.a}>
                <span>SEND</span>
              </button>
            </div>
          </div>
        </div>
        <div className={Style.chatOnline}>
          <div className={Style.chatonlinewrapper}>
            <ActiveUser
               onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setcurrentChat}
            ></ActiveUser>
             
         
          </div>
        </div>
      </div>
    </>
  );
}

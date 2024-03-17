import { useState, useEffect, useRef } from "react";
import "./ChatPage.css";
import io from "socket.io-client";
import "./ChatC";
import Chat from "./ChatC";



const ChatPage = () => {
  const socketRef = useRef();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const socket = io.connect("https://localhost:443");
    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      // socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="Chat">
      <div className="glass-container-chat">
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>Join A Chat</h3>
            <input
              type="text"
              placeholder="Enter Username..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button className="btn-join-chat" onClick={joinRoom}>Join A Room</button>
          </div>
        )
          :
          (
            <Chat socket={socketRef.current} username={username} room={room} />
          )}</div>
    </div>
  );
};

export default ChatPage;

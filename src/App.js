import io from "socket.io-client";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import ReactJson from "@textea/json-viewer";
function App() {
  const [accessToken, setAccessToken] = useState("");
  const [ctsMessage, setctsMessage] = useState("");
  const [stcMessage, setstcMessage] = useState("");
  const [result, setResult] = useState({});
  const socket = useRef();
  console.log(accessToken);
  useEffect(() => {
    socket.current = io.connect("http://localhost:3001", {
      extraHeaders: {
        Authorization: "Bearer " + accessToken,
      },
    });
    socket.current.on(stcMessage, (data) => {
      setResult(data);
    });
  }, [stcMessage, accessToken]);
  const handdleSendMessage = () => {
    socket.current.emit(ctsMessage, {
      group_id: "60dbe1e03e29c619a09e00e8",
      key_message_error: 12,
      message: "text",
      message_type: 1,
    });
  };
  return (
    <div className="App">
      <input
        placeholder="token"
        value={accessToken}
        onChange={(e) => {
          setAccessToken(e.target.value);
        }}
      ></input>
      <input
        placeholder="name message send"
        value={ctsMessage}
        onChange={(e) => {
          setctsMessage(e.target.value);
        }}
      ></input>

      <button onClick={handdleSendMessage}>send</button>
      <input
        style={{
          width: "80%",
        }}
        placeholder="name messsage receive"
        value={stcMessage}
        onChange={(e) => {
          setstcMessage(e.target.value);
        }}
      ></input>
      <div className="result">
        <ReactJson src={result} />
      </div>
    </div>
  );
}

export default App;

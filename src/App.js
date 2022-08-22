import io from "socket.io-client";
import "./App.scss";
import { useState, useEffect, useRef } from "react";
import ReactJson from "@textea/json-viewer";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Paper, TextField, Tab, Box } from "@mui/material";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Appbar from "./components/Appbar";
import JsonViewer from "@textea/json-viewer";
function App() {
  const [accessToken, setAccessToken] = useState("");
  const [ctsMessage, setctsMessage] = useState("");
  const [stcMessage, setstcMessage] = useState("");
  const [payload, setPayload] = useState("{}");
  const [tabValue, setTabValue] = useState(1);
  const [result, setResult] = useState({});
  const socket = useRef();
  useEffect(() => {
    socket.current?.on(stcMessage, (data) => {
      setResult(data);
    });
    return () => socket?.current?.close();
  }, [stcMessage]);
  const handdleSendMessage = () => {
    socket.current.emit(ctsMessage, JSON.parse(payload));
  };

  const handleConnect = () => {
    socket.current = io.connect(process.env.REACT_APP_API_URL, {
      extraHeaders: {
        Authorization: "Bearer " + accessToken,
      },
    });
  };
  const OnEdit = (e) => {
    setPayload(e.target.value);
  };
  const handleChangeTab = (e, newValue) => {
    setTabValue(newValue);
  };
  const handleListen = () => {
    console.log("listening");
    socket.current.on(stcMessage, (data) => {
      setResult(data);
    });
  };
  function tryParseJSONObject(jsonString) {
    try {
      var o = JSON.parse(jsonString);
      if (o && typeof o === "object") {
        return o;
      }
    } catch (e) {
      return {};
    }
  }
  return (
    <>
      <div className="App">
        <div className="socket-connect">
          <div>
            <input
              placeholder="token"
              value={accessToken}
              onChange={(e) => {
                setAccessToken(e.target.value);
              }}
            />
            <button onClick={handleConnect}>Connect</button>
          </div>
          <div>
            <input
              className="message-receive"
              placeholder="name messsage receive"
              value={stcMessage}
              onChange={(e) => {
                setstcMessage(e.target.value);
              }}
            />
            <button onClick={handleListen}>listen</button>
          </div>
          <div>
            <input
              placeholder="name message send"
              value={ctsMessage}
              onChange={(e) => {
                setctsMessage(e.target.value);
              }}
            />
            <button onClick={handdleSendMessage}>send</button>
          </div>
        </div>

        <div className="json-viewer">
          <div className="emit">
            <h3>Emit</h3>
            <input value={payload} onChange={OnEdit}></input>
            <ReactJson src={tryParseJSONObject(payload)} />
          </div>
          <div className="result">
            <h3>Receive</h3>
            <ReactJson src={result} />
          </div>
        </div>
      </div>

      {/* <Appbar />
      <Paper sx={{ mx: 8, py: 2, px: 4, mt: 4 }} elevation={2}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={11}>
            <TextField label='URL' variant='outlined' fullWidth></TextField>
          </Grid2>
          <Grid2 item xs={1}>
            <Button
              variant='contained'
              sx={{ height: "100%" }}
              onClick={handleConnect}
            >
              Connect
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
      <Paper sx={{ mx: 8, py: 2, px: 4, mt: 2 }} elevation={2}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={4}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChangeTab}
                    centered
                    aria-label='lab API tabs example'
                  >
                    <Tab label='Events' value='1' />
                    <Tab label='Item Two' value='2' />
                    <Tab label='Item Three' value='3' />
                  </TabList>
                </Box>
                <TabPanel value='1'>Item One</TabPanel>
                <TabPanel value='2'>Item Two</TabPanel>
                <TabPanel value='3'>Item Three</TabPanel>
              </TabContext>
            </Box>
          </Grid2>
          <Grid2 item xs={8}></Grid2>
        </Grid2>
      </Paper> */}
    </>
  );
}

export default App;

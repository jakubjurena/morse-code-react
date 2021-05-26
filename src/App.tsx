import React, { ChangeEventHandler, CSSProperties, useState } from 'react';
import logo from './morse-code.svg';
import './App.css';
import { encode, Encoded, Original } from "./utils";
import {Button, Typography} from "antd";
import TextArea from "antd/lib/input/TextArea";
import 'antd/dist/antd.css'
import { playSound } from "./audio";

const inputCard: CSSProperties = {
  flexGrow: 1,
  height: "200px",
  padding: "10px",
}

const controlButtons: CSSProperties = {
  padding: "10px",
  display: "flex",
  flexFlow: "column",
  gap: "10px",
}

const defaultText = "a a";
function App() {
  const [decoded, setDecoded] = useState<Original>(defaultText);
  const [encoded, setEncoded] = useState<Encoded>(encode(defaultText));
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [previousInterval, setPreviousInterval] = useState<any>(undefined);

  const onDecodedChange: ChangeEventHandler<HTMLTextAreaElement> = (target) => {
    setDecoded(target.currentTarget.value);
    // setEncoded(encode(newValue));
  };

  const onEncode = () => {
    try {
      setEncoded(encode(decoded));
      setErrorMessage(undefined);
    } catch(e) {
      setErrorMessage(e.message);
      setEncoded([]);
    }
  }

  const onPlay = () => {
    // setStopPrevious(playSound(encoded.join(" ")));
    const duration = playSound(encoded.join(" "));
    console.log(duration);
    console.log((duration + 0.2) * 1000);
    setIsPlaying(true);
    if (previousInterval) {
      clearTimeout(previousInterval);
    }
    setPreviousInterval(setTimeout(() => {
      setIsPlaying(false)
    }, (duration + 0.2) * 1000 ));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="cards">
          <div style={inputCard}>
            <TextArea value={decoded} autoSize={{ minRows: 3, maxRows: 5 }} onChange={onDecodedChange} />
          </div>
          <div style={controlButtons}>
            <Button onClick={onEncode}>Encode {">"}</Button>
            <Button disabled={true}>{"<"} Decode</Button>
            <Button disabled={encoded.length === 0 || isPlaying} onClick={onPlay}>🔊 Play</Button>
          </div>
          <div style={inputCard}>
            <TextArea value={encoded.join(" ")} autoSize={{ minRows: 3, maxRows: 5 }} disabled={true} />
          </div>
        </div>
        <div>
          <Typography>{errorMessage}</Typography>
        </div>
        {/* <div className="Settings">
          <div className="Card-setting">
            <h4>tone</h4>
            <Slider defaultValue={400} min={300} max={800} />
            <h4>time</h4>
            <Slider defaultValue={400} min={300} max={800} />
          </div>
        </div> */}
      </header>
    </div>
  );
}

export default App;

// TODO: <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
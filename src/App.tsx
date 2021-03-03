import React from "react";
import { css, Global } from "@emotion/react";
import globalStyle from "./globalStyle";
import "./App.css";

function App() {
  return (
    <>
      <div
        className="App"
        css={css`
          color: red;
        `}
      >
        테스트
      </div>
      <Global styles={globalStyle} />
    </>
  );
}

export default App;

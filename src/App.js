import React from "react";
import styled from "styled-components";
import {BrowserRouter as Router} from "react-router-dom";
import {StateProvider} from "./store/store";
import Routes from "./routes/routes"
import ErrorBoundaries from "./components/ErrorBoundaries";

const Outer = styled.div`
  background-color: #137532;
  min-height: 100vh;
  height: 100%;
  font-family: 'Concert One', "sans-serif";
`;

function App() {
  return (
    <Outer>
      <StateProvider>
        <Router>
          <ErrorBoundaries>
            <Routes />
          </ErrorBoundaries>
        </Router>
      </StateProvider>
    </Outer>

  );
}

export default App;

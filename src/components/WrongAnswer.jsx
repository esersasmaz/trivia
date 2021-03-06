import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import { useHistory} from "react-router";

const animationData = require('../assets/wrong-animation');

const Outer = styled.div`
.wrapper {
position: absolute;
left: 50%;
transform: translateX(-50%);
top: 50%;
text-align: center;
color: #f7f1e3;
}
button {
width: 200px;
padding: 5px 0;
border-radius: 5px;
background-color: #ecf0f1;
border-color: #ecf0f1;
}
`;

const WrongAnswer = (props) => {
  const { value } = props;
  const history = useHistory();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const backHome = () => {
    history.push("/");
  };

  return (
    <Outer>
      <Lottie options={defaultOptions}
              width={300}
              height={300}
              isStopped={false}
              isPaused={false}
      />
      <div className="wrapper">
        <p style={{color: "darkred"}}>Wrong Answer!</p>
        <button onClick={backHome}>Play Again</button>
      </div>
    </Outer>
  )
};

export default WrongAnswer;
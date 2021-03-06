import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import { store } from "../store/store"

const animationData = require('../assets/correct-animation.json');

const Outer = styled.div`
.circle-wrapper {
position: absolute;
left: 50%;
transform: translateX(-50%);
top: 50%;
text-align: center;
color: #f7f1e3;
}
.invisible {
position: absolute;
transform: translateX(200vw);
width: 0;
height: 0;
}
button {
width: 200px;
padding: 5px 0;
border-radius: 5px;
background-color: #ecf0f1;
border-color: #ecf0f1;
}
`;

const CorrectAnswer = (props) => {
  const { value } = props;
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [point, setPoint] = useState();
  const [totalPoint, setTotalPoint] = useState();

  const nextQuestion = () => {
    dispatch({type: "incrementQuestion"});
    dispatch({type: "countDown", countDown: true});
    value.value = "unanswered";
  };

  useEffect(() => {
    setPoint(value.points)
    setTotalPoint(value.totalPoints)
  }, [value]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <Outer>
      <Lottie options={defaultOptions}
              width={300}
              height={300}
              isStopped={false}
              isPaused={false}
      />
      <div className="circle-wrapper">
        <p style={{color: "#27ae60"}}>Correct!</p>
        <p>You have earned {point} points</p>
        <p>Total: {totalPoint} points</p>
        <button onClick={nextQuestion}>Next Question</button>
      </div>
    </Outer>
  )
};

export default CorrectAnswer;